import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";
import QRCode from "qrcode";
export const getSentDonations = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.userId);

  if (!userId) {
    res.status(400).json({ error: "UserId parameter missing or invalid" });
    return;
  }

  try {
    const donations = await prisma.donation.findMany({
      where: { donorId: userId },
      include: {
        recipient: {
          select: {
            id: true,
            email: true,
            username: true,
            profile: true,
          },
        },
      },
    });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching sent donations:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getReceivedDonations = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const donations = await prisma.donation.findMany({
      where: { recipientId: userId },
      include: {
        donor: {
          select: {
            id: true,
            email: true,
            username: true,
            profile: true,
          },
        },
      },
    });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching received donations:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getDonationQr = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.userId);

  if (!userId) {
    res.status(400).json({ error: "Invalid userId" });
    return;
  }

  const url = `http://localhost:3000/DonationComplete/${userId}`;

  try {
    const qr = await QRCode.toDataURL(url);
    res.json({ qr });
    return;
  } catch (error) {
    console.error("QR generation error:", error);
    res.status(500).json({ error: "Failed to generate QR" });
    return;
  }
};
