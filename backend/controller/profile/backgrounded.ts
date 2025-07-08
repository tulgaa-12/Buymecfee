import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";
import { get } from "http";

export const CompleteImg = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { backgroundImage } = req.body;
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid userId" });
      return;
    }

    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        backgroundImage,
      },
    });

    const updatedProfile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
  } catch (err) {
    res.status(500).send({ message: "aldaagaa ooroo ol" });
  }
};

export const getImage = async (req: Request, res: Response): Promise<void> => {
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
};
