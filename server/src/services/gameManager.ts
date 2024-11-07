import { Socket } from "socket.io";
import { Game } from "./game";
import { INIT_GAME, MOVE } from "./payloadMessages";

export class GameManager {
  private pendingUser: Socket | null;
  private pendingUserId: string;
  private users: Socket[] | null;
  private games: Game[];

  constructor() {
    this.pendingUser = null;
    this.pendingUserId = "";
    this.users = [];
    this.games = [];
  }

  addUser(player: Socket, playerId: string) {
    this.users?.push(player);
    this.addHandler(player, playerId);
  }

  addHandler(player: Socket, playerId: string) {
    //handles game initialization
    player.on(INIT_GAME, async (data) => {
      try {
        const message = await JSON.parse(data);
        if (message.type === INIT_GAME) {
          if (this.pendingUser) {
            //create game in db
            const game = new Game(this.pendingUser, player);
            game.initializeNewGame(this.pendingUserId, playerId);
            // this.games.push(newGame)
            this.pendingUser = null;
          }
        } else {
          this.pendingUser = player;
          this.pendingUserId = playerId;
        }
      } catch (error: any) {
        console.log("error while initializing game : ", error.message);
      }
    });

    player.on(MOVE, async (data) => {
      const message = await JSON.parse(data);
      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === player || game.player2 === player
        );
        if (game) {
          game.makeMove(player, message.move);
        }
      }
    });
  }
}
