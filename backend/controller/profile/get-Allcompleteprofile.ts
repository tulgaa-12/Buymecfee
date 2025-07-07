import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const getAllProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error getting all profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
