import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const createDonation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      amount,
      specialMessage,
      socialURLOrBuyMeACoffee,
      donorId,
      recipientId,
    } = req.body;

    const donation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donorId,
        recipientId,
      },
    });

    const donor = await prisma.user.findUnique({ where: { id: donorId } });
    const recipient = await prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!donor || !recipient) {
      res.status(404).json({ error: "Invalid donor or recipient" });
      return;
    }

    res.status(201).json(donation);
  } catch (error) {
    console.error("Donation creation error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
