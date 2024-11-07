import { Socket } from "socket.io";
import { Chess } from "chess.js";
import { INIT_GAME } from "./payloadMessages";

export class Game {
  public player1: Socket | null;
  public player2: Socket | null;
  public board: Chess;
  private movecount = 0;

  constructor(player1: Socket, player2: Socket | null) {
    this.player1 = null;
    this.player2 = null;
    this.board = new Chess();
  }

  initializeNewGame() {
    //createGameInDb

    // try {
    //   await this.createGameInDb();
    // } catch (e) {
    //   console.error(e);
    //   return;
    // }

    if (this.player1) {
      this.player1.emit(INIT_GAME, {
        type: INIT_GAME,
        color: "white",
      });
    }
    if (this.player2) {
      this.player2.emit(INIT_GAME, {
        type: INIT_GAME,
        color: "black",
      });
    }
  }

  makeMove(
    player: Socket,
    move: {
      from: string;
      to: string;
    }
  ) {}
}
