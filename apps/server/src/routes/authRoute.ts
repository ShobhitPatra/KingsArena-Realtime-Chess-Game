import { Router } from "express";
import { getUser } from "../controllers/userContrroller";

const router = Router();

router.get("/me", getUser);

export default router;
