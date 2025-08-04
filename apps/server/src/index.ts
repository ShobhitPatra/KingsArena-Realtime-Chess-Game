import express from "express";
import authRoutes from "./routes/authRoute";
import userRoutes from "./routes/userRoute";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
