import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const getCompleteProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(
      "GET /getCompleteProfile/:userId called with",
      req.params.userId
    );
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid userId" });
      return;
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
