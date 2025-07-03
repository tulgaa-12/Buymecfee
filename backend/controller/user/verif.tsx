import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const verif = async (req: Request, res: Response) => {
  const { token } = req.body;

  const TokenPassword = "Buymecfee";

  try {
    const isValid = jwt.verify(token, TokenPassword);

    if (isValid) {
      const destruck = jwt.decode(token);
      res.send({ destruck });
      return;
    } else {
      res.status(401).send({ message: "token is not valid " });
      return;
    }
  } catch (error) {
    res.status(401).send({ message: "token is not valid " });
    return;
  }
};
