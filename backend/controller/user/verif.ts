import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verif = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  const TokenPassword = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, TokenPassword);
    res.send({ user: decoded });
  } catch (error) {
    res.status(401).send({ message: "Token is not valid" });
  }
};
