import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const getSentDonations = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const donations = await prisma.donation.findMany({
      where: { donorId: userId },
      include: {
        recipient: true,
      },
    });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching sent donations:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getsentDonations = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId: userId },
      include: {
        donor: true,
      },
    });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching received donations:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getReceivedDonations = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId: userId },
      include: {
        donor: true,
      },
    });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching received donations:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
