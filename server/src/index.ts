import dotenv from "dotenv";
import { createServer } from "http";

dotenv.config();
const httpServer = createServer();

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
