// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export const verif = async (req: Request, res: Response): Promise<void> => {
//   const { token } = req.body;

//   const TokenPassword = process.env.JWT_SECRET as string;

//   try {
//     const isValid = jwt.verify(token, TokenPassword);

//     if (isValid) {
//       const destruck = jwt.decode(token);
//       res.send({ destruck });
//       return;
//     } else {
//       res.status(401).send({ message: "token is not valid " });
//       return;
//     }
//   } catch (error) {
//     res.status(401).send({ message: "token is not valid " });
//     return;
//   }
// };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verif = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  const TokenPassword = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, TokenPassword);
    res.send({ user: decoded });
  } catch (error) {
    res.status(401).send({ message: "Token is not valid" });
  }
};
