import { Server, Socket } from "socket.io";

class SocketManager {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initHandlers() {
    this._io.on("connect", (socket) => {
      console.log(`new socket connnected ${socket.id}`);

      //INIT_GAME
      socket.on("event:init_game", () => {
        console.log("game initailized");
      });

      //MOVE
      socket.on("event:move", () => {
        console.log("move made");
      });
    });
  }
  get io() {
    return this._io;
  }
}
