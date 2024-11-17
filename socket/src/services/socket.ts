import { Server, Socket } from "socket.io";
import { GameManager } from "./gameManager";
import { getAuthenticatedUser } from "../utils/getAuthenticatedUser";

export class SocketManager {
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
      const authUser = getAuthenticatedUser();
      const gameManager = new GameManager();
      gameManager.addUser(socket, authUser.id);
    });
  }
  get io() {
    return this._io;
  }
}
