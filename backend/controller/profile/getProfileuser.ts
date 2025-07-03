import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const getProfileByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const profile = await prisma.profile.findUnique({
      where: { userId: parseInt(userId) },
    });

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
