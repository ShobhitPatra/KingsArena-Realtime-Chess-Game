import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@repo/db";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../schemas/schema";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        msg: "wrong inputs",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "user already exists",
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(user, "secret");
    return res.status(200).json({
      msg: "user signed in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("ERROR IN SIGNUP ROUTE...", error);
    return res.status(500).json({
      msg: "INTERNAL SERVER ERROR",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        msg: "wrong inputs",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.status(400).json({
        msg: "user does not exist",
      });
    }
    const token = jwt.sign(existingUser, "secret");

    return res.status(200).json({
      msg: "user created",
      existingUser,
      token,
    });
  } catch (error) {
    console.error("ERROR IN SIGNUP ROUTE...", error);
    return res.status(500).json({
      msg: "INTERNAL SERVER ERROR",
    });
  }
};

export const signout = () => {};
