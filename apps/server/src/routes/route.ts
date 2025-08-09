import { Router } from "express";
import authRoutes from "./authRoute";
import userRoutes from "./userRoute";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
