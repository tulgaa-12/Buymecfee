import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../utlis/prisma";
dotenv.config();

export const Hello = async (_req: Request, res: Response) => {
  console.log(process.env.DATABASE_URL);

  res.json("hello");
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  console.log(`${req.method} ${req.path}`);
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res
        .status(400)
        .json({ error: "Email, password and username are required" });
      return;
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error", details: err });
  }
};
