import express from "express";
import apiRoutes from "./routes/route";

const app = express();
app.use(express.json());

app.use("/api", apiRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
