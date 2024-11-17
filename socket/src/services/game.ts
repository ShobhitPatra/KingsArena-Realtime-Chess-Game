import { Socket } from "socket.io";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./payloadMessages";
import prisma from "./db";

export class Game {
  public player1: Socket | null;
  public player2: Socket | null;
  private gameId: string;
  public board: Chess;
  private movecount = 0;

  constructor(player1: Socket, player2: Socket | null) {
    this.player1 = null;
    this.player2 = null;
    this.gameId = "";
    this.board = new Chess();
  }

  async createGameInDb(player1Id: string, player2Id: string) {
    try {
      const game = await prisma.game.create({
        data: {
          blackPlayerId: player2Id,
          whitePlayerId: player1Id,
        },
      });
      if (game) {
        this.gameId = game.id;
      }
    } catch (error) {
      throw new Error("error white initializing new game in db");
    }
  }

  async addMoveToDb(move: { from: string; to: string }) {
    await prisma.move.create({
      data: {
        from: move.from,
        to: move.to,
        moveNumber: this.movecount + 1,
        gameId: this.gameId,
      },
    });
  }

  async initializeNewGame(player1Id: string, player2Id: string) {
    try {
      await this.createGameInDb(player1Id, player2Id);
    } catch (e) {
      console.error(e);
      return;
    }

    if (this.player1) {
      this.player1.emit(
        JSON.stringify({
          type: INIT_GAME,
          color: "white",
        })
      );
    }
    if (this.player2) {
      this.player2.emit(
        JSON.stringify({
          type: INIT_GAME,
          color: "black",
        })
      );
    }
  }

  async makeMove(
    player: Socket,
    move: {
      from: string;
      to: string;
    }
  ) {
    if (this.movecount % 2 == 0 && player !== this.player1) {
      return;
    }
    if (this.movecount % 2 == 1 && player !== this.player2) {
      return;
    }
    try {
      this.board.move(move);
      //makeMove in db

      await this.addMoveToDb(move);
    } catch (error) {
      return;
    }

    //check : isGameOver
    if (this.board.isGameOver()) {
      // Send the game over message to both players
      if (this.player1) {
        this.player1.emit(
          JSON.stringify({
            type: GAME_OVER,
            winner: this.board.turn() === "w" ? "black" : "white",
          })
        );
      }
      if (this.player2) {
        this.player2.emit(
          JSON.stringify({
            type: GAME_OVER,
            winner: this.board.turn() === "w" ? "black" : "white",
          })
        );
      }
      return;
    }

    //send move to both players
    if (this.movecount % 2 === 0) {
      if (this.player2)
        this.player2.emit(
          JSON.stringify({
            type: MOVE,
            move,
          })
        );
    } else {
      if (this.player1)
        this.player1.emit(
          JSON.stringify({
            type: MOVE,
            payload: move,
          })
        );
    }
    this.movecount++;
  }
}
