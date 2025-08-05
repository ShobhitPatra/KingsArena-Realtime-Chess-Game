import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string; name: string; email: string };
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
      const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      name: string;
      email: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    console.error("TOKEN VERIFICATION FAILED:", error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
