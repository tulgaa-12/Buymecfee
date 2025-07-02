import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import { prisma } from "./utlis/prisma";
import { prisma } from "./utlis/prisma";
import cors from "cors";
import { UserRouter } from "./route/user";
import { ProfileRouter } from "./route/profile";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// app.post("/user", async (_req: Request, res: Response) => {
//   await prisma.user.create({
//     data: {
//       username: "asd",
//       email: "e7016307@gmail.com",
//       password: "asd",
//     },
//   });

//   res.send({ message: "Success" });
// });

app.use("/user", UserRouter);
app.use("/", ProfileRouter);
app.listen(8000, () => {
  console.log(`✅ Server is running on port 8000`);
});
