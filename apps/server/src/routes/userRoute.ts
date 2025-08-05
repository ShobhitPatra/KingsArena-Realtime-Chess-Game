import { Router } from "express";
import { getUser, getHistory } from "../controllers/userContrroller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/me", verifyToken, getUser);
router.get("/history", verifyToken, getHistory);

export default router;
