import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";
import QRCode from "qrcode";
export const createDonation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount, specialMessage, socialURLOrBuyMeACoffee, recipientId } =
    req.body;
  const userId = req.user?.userId;
  console.log(req.body, "assddddwdd");
  // const url = `http://localhost:3000/DonationComplete/${userId}`;
  // const qr = await QRCode.toDataURL(url);

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (userId === recipientId) {
    res.status(400).json({ error: "You cannot donate to yourself." });
    return;
  }

  const recipient = await prisma.user.findUnique({
    where: { id: recipientId },
  });

  if (!recipient) {
    res.status(404).json({ error: "Recipient not found" });
    return;
  }

  const donation = await prisma.donation.create({
    data: {
      amount,
      specialMessage,
      socialURLOrBuyMeACoffee,
      donor: { connect: { id: userId } },
      recipient: { connect: { id: recipientId } },
    },
  });

  res.status(201).json(donation);
};
