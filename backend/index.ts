import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { prisma } from "./utilis/prisma";
const app = express();
app.use(express.json());

dotenv.config();

app.get("/", async (_req: Request, res: Response) => {
  console.log(process.env.DATABASE_URL);

  res.json("hello");
});

app.post("/user", async (req: Request, res: Response) => {
  await prisma.user.create({
    data: {
      username: "asd",
      email: "e7016307@gmail.com",
      password: "asd",
    },
  });
});
app.listen(8000, () => {
  console.log("Server is running on port 3000");
});
