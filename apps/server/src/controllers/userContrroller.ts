import { prisma } from "@repo/db";
import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        msg: "user not verified",
      });
    }
    return res.status(200).json({
      msg: "get-user-profile",
      user: req.user,
    });
  } catch (error) {
    console.error("ERROR IN GETUSER ROUTE", error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        msg: "user not verified",
      });
    }
    const games = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        gamesAsBlack: true,
        gamesAsWhite: true,
      },
    });
    return res.status(200).json({
      msg: "get-user-history",
      userWithGames: games,
    });
  } catch (error) {
    console.error("ERROR IN GETUSER ROUTE", error);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};
