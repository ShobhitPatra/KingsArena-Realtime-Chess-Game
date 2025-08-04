import { Request, Response } from "express";
import { signupSchema, signinSchema } from "@repo/schemas";
export const signup = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
};
export const signin = () => {};
export const signout = () => {};
