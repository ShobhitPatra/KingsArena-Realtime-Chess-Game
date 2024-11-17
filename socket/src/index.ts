import dotenv from "dotenv";
import http from "http";
import { SocketManager } from "./services/socket";

dotenv.config();
const httpServer = http.createServer();
const socketSevice = new SocketManager();

const PORT = process.env.PORT || 8000;
socketSevice.io.attach(httpServer);
httpServer.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
  socketSevice.initHandlers();
});
