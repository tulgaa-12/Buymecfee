import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const Paymentupdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, cardNumber, country, expiryDate } = req.body;

  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const profile = await prisma.bankCard.update({
      where: { userId },
      data: {
        firstName,
        lastName,
        cardNumber,
        country,
        expiryDate: new Date(expiryDate),
      },
    });

    const updatedProfile = await prisma.bankCard.findUnique({
      where: { userId },
      include: { user: true },
    });

    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update Bankcard" });
  }
};
