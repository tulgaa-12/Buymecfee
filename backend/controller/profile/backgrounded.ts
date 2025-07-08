import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const updateCoverImage = async (req: Request, res: Response) => {
  const { userId, coverImageUrl } = req.body;

  try {
    const updated = await prisma.profile.update({
      where: { userId: parseInt(userId) },
      data: { backgroundImage: coverImageUrl },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update cover image" });
  }
};
