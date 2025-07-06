import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const getUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid userId" });
      return;
    }

    const payment = await prisma.bankCard.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    if (!payment) {
      res.status(404).json({ error: "Bankcard not found" });
      return;
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
