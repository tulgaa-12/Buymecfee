import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const createBankCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { select, firstname, lastname, card, expires, year, cvc, userId } =
      req.body;

    if (
      !select ||
      !firstname ||
      !lastname ||
      !card ||
      !expires ||
      !year ||
      !cvc ||
      !userId
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const expiryDateString = `${year}-${expires.padStart(2, "0")}-01`;
    const expiryDate = new Date(expiryDateString);

    const newCard = await prisma.bankCard.create({
      data: {
        country: select,
        firstName: firstname,
        lastName: lastname,
        cardNumber: card,
        expiryDate,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error("Create bank card error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
