// import { Request, Response } from "express";
// import { prisma } from "../../utlis/prisma";

// export const createBankCard = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { country, firstName, lastName, cardNumber, expiryDate } = req.body;

//     const userId = req.user?.userId;

//     if (!userId) {
//       res.status(401).json({ error: "Unauthorized: No user ID in token" });
//       return;
//     }

//     const newCard = await prisma.bankCard.create({
//       data: {
//         country,
//         firstName,
//         lastName,
//         cardNumber,
//         expiryDate: new Date(expiryDate),
//         user: {
//           connect: { id: parseInt(userId) },
//         },
//       },
//     });

//     res.status(201).json(newCard);
//   } catch (error) {
//     console.error("Error creating bank card:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const createBankCard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { country, firstName, lastName, cardNumber, expiryDate } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized: No user ID in token" });
      return;
    }

    const newCard = await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        cardNumber,
        expiryDate: new Date(expiryDate),
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error creating bank card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
