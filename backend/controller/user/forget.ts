import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";
import bcrypt from "bcrypt";

export const Forgetpassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      res.status(400).json({ message: "userId and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: Number(userId) },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Forgetpassword error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
