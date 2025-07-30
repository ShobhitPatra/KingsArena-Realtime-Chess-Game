import { WebSocketServer, WebSocket } from "ws";
import { GAME_INIT, GAME_OVER, MOVE, User } from "./types";
import { gameManager } from "./store/GameManager";
import { createServer } from "http";

const httpServer = createServer();
const ws = new WebSocketServer({ server: httpServer });

export const userSocketMap = new Map<string, WebSocket>();

ws.on("connection", function connection(socket) {
  console.log("Websocket connection established...");

  socket.on("message", async function message(data: Buffer) {
    console.log(`message recieved ${data}`);
    try {
      const payload = await JSON.parse(data.toString());
      const { type, user } = payload as { type: string; user: User };

      if (user.id) {
        userSocketMap.set(user.id, socket);
      }
      //start game
      if (payload.type === GAME_INIT) {
        
        await gameManager.addUser(user);
      }
      //move
      if (payload.type === MOVE) {
        const { move, gameId } = payload;
        const existingGame = gameManager.games.find(
          (game) => game.gameId === gameId
        );
        if (!existingGame) {
          console.error(`game does not exists`);
          socket.send(
            JSON.stringify({
              type: "ERROR",
              message: "Game not found",
            })
          );
          return;
        }
        existingGame?.makemove(move, user.id);
      }
      //player reisgns
      if (payload.type === GAME_OVER) {
        const { gameId, reason } = payload;
        const existingGame = gameManager.games.find(
          (game) => game.gameId === gameId
        );
        if (!existingGame) return;
        existingGame.endGame(user.id, reason);
      }
    } catch (error) {
      console.error(`error passing message on webSocket ${error}`);
      socket.send(
        JSON.stringify({
          type: "ERROR",
          message: "Message not passed successfully o nwebSocket",
        })
      );
    }
  });

  socket.on("close", function close() {
    for (const [userId, ws] of userSocketMap.entries()) {
      if (ws === socket) {
        userSocketMap.delete(userId);
        gameManager.removeUser({ id: userId } as any);
        break;
      }
    }
  });

  socket.on("error", function error(err) {
    console.error(`WEBSOCKER ERROR : ${err}`);
  });
});
const PORT = 8000;
httpServer.listen(PORT, function server() {
  console.log(`server runnig on PORT ${PORT}`);
});
