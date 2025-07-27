import { Chess, Square } from "chess.js";
import { GameResult, Move } from "../types";

export class Game {
  public gameId: string;
  public playerAsWhite: string;
  public playerAsBlack: string;
  public board: Chess;
  private moveCount: number = 0;

  constructor(gameId: string, playerASWhite: string, playerAsBlack: string) {
    this.gameId = gameId;
    this.board = new Chess();
    this.playerAsBlack = playerAsBlack;
    this.playerAsWhite = playerASWhite;
  }
  //makemove
  makemove(move: Move, playerId: string) {
    const playerColor = playerId === this.playerAsWhite ? "w" : "b";
    if (this.board.turn() !== playerColor) return;

    try {
      if (this.isPromoting(move)) {
        this.board.move({
          from: move.from,
          to: move.to,
          promotion: "q",
        });
        this.moveCount = this.board.history().length;
      } else {
        this.board.move(move);
      }
      this.moveCount = this.board.history().length;
      if (this.board.isGameOver()) {
        const winner = this.board.turn();
        const result = this.getResult(this.board);
        this.broadcastResult(result, winner);
      }
      const opponentId =
        playerId === this.playerAsBlack
          ? this.playerAsWhite
          : this.playerAsBlack;
      this.sendMoveToOpponent(move, opponentId);
      this.broadcastMove(move, playerId);
    } catch (error) {
      console.log(`error while making move ${error}`);
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

  private sendMoveToOpponent(move: Move, playerId: string) {
    console.log({
      move,
    });
  }

  private broadcastMove(move: Move, playerId: string) {
    console.log({
      move,
      message: `move made by ${playerId}`,
    });
  }

  private broadcastResult(result: GameResult | undefined, winner: string) {
    console.log({
      winner,
      result,
    });
  }

  private getResult(board: Chess): GameResult | undefined {
    if (board.isStalemate()) return GameResult.STALEMATE;
    if (board.isCheckmate()) return GameResult.CHECKMATE;
    if (board.isDraw()) return GameResult.DRAW;
    if (board.isThreefoldRepetition()) return GameResult.THREEFOLDREPITITION;
    return undefined;
  }
}
