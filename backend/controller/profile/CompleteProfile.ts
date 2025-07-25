import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      successMessage,
      userId,
    } = req.body;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
