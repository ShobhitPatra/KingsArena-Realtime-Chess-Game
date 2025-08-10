import express from "express";
import apiRoutes from "./routes/route";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api", apiRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
