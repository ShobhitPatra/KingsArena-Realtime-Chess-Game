import { Chess, Square } from "chess.js";
import { GAME_OVER, GameResult, MOVE, Move, MOVE_MADE } from "../types";
import { pubSubManager } from "./PubSubManager";
import { userSocketMap } from "..";
import { gameManager } from "./GameManager";

export class Game {
  public gameId: string;
  public playerAsWhite: string;
  public playerAsBlack: string;
  public board: Chess;
  private moveCount: number = 0;

  constructor(gameId: string, player1: string, player2: string) {
    this.gameId = gameId;
    this.board = new Chess();
    this.playerAsWhite = player1;
    this.playerAsBlack = player2;
    pubSubManager.subscribe(gameId, JSON.stringify(this.playerAsWhite));
    pubSubManager.subscribe(gameId, JSON.stringify(this.playerAsBlack));
  }

  public notifyPlayer(playerId: string, message: any) {
    const userSocket = userSocketMap.get(playerId);
    if (userSocket && userSocket.readyState === userSocket.OPEN) {
      userSocket.send(JSON.stringify(message));
    }
  }
  //makemove
  makemove(move: Move, playerId: string) {
    try {
      let moveResult;
      if (this.isPromoting(move)) {
        moveResult = this.board.move({
          from: move.from,
          to: move.to,
          promotion: "q",
        });
      } else {
        moveResult = this.board.move(move);
      }
      if (!moveResult) {
        console.log("5");
        this.notifyPlayer(playerId, {
          type: "ERROR",
          message: "invalid move",
        });
        return;
      }

      this.moveCount = this.board.history().length;
      this.broadcastMove(move, playerId);

      if (this.board.isGameOver()) {
        const result = this.getResult(this.board);
        const winner = this.determineWinner(result);
        this.broadcastResult(result, winner);
        this.cleanup();
      }
    } catch (error) {
      console.error(`error while making move ${error}`);
      this.notifyPlayer(playerId, {
        type: "ERROR",
        message: "error while making move",
      });
    }
  }

  private isPromoting(move: Move) {
    if (this.board.get(move.from as Square)?.type !== "p") return false;
    if (this.board.get(move.from as Square)?.color !== this.board.turn())
      return false;

    if (move.to.endsWith("1") || move.to.endsWith("8")) {
      if (
        this.board
          .moves({
            verbose: true,
            square: move.from as Square,
          })
          .map((x) => x.to)
          .includes(move.to as Square)
      )
        return true;
    }
    return false;
  }

  public async endGame(playerId: string, reason: any) {
    console.log("inside be endgame");
    const message = {
      type: GAME_OVER,
      gameId: this.gameId,
      reason: reason ?? "resignation",
      resignedBy: playerId,
      winner: playerId === this.playerAsBlack ? "w" : "b",
      finalFen: this.board.fen(),
      movecount: this.moveCount,
    };
    await pubSubManager.publish(this.gameId, JSON.stringify(message));
    this.notifyPlayer(this.playerAsBlack, message);
    this.notifyPlayer(this.playerAsWhite, message);
    this.cleanup();
  }

  private async broadcastMove(move: Move, playerId: string) {
    const message = {
      type: MOVE_MADE,
      gameId: this.gameId,
      playerId,
      color: playerId === this.playerAsBlack ? "b" : "w",
      move,
      fen: this.board.fen(),
      turn: this.board.turn(),
      moveCount: this.moveCount,
      check: this.board.inCheck(),
      checkmate: this.board.isCheckmate(),
      stalemate: this.board.isStalemate(),
    };
    await pubSubManager.publish(this.gameId, JSON.stringify(message));
    const opponent =
      playerId === this.playerAsBlack ? this.playerAsWhite : this.playerAsBlack;
    this.notifyPlayer(opponent, message);
    this.notifyPlayer(playerId, message);
  }

  private broadcastResult(
    result: GameResult | undefined,
    winner: string | null
  ) {
    pubSubManager.publish(
      this.gameId,
      JSON.stringify({
        type: GAME_OVER,
        gameId: this.gameId,
        winner,
        result,
        finalFen: this.board.fen(),
        movecount: this.moveCount,
      })
    );
  }

  private determineWinner(result: GameResult | undefined) {
    if (result === GameResult.CHECKMATE) {
      return this.board.turn() === "w"
        ? this.playerAsBlack
        : this.playerAsWhite;
    }
    return null;
  }

  private getResult(board: Chess): GameResult | undefined {
    if (board.isStalemate()) return GameResult.STALEMATE;
    if (board.isCheckmate()) return GameResult.CHECKMATE;
    if (board.isDraw()) return GameResult.DRAW;
    if (board.isThreefoldRepetition()) return GameResult.THREEFOLDREPITITION;
    return undefined;
  }

  private cleanup() {
    pubSubManager.unsubscribe(this.gameId, { id: this.playerAsBlack } as any);
    pubSubManager.unsubscribe(this.gameId, { id: this.playerAsWhite } as any);
    gameManager.removeGame(this.gameId);
  }
}
