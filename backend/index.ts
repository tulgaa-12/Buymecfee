import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import { prisma } from "./utlis/prisma";
import { prisma } from "./utlis/prisma";
import cors from "cors";
import { UserRouter } from "./route/user";
import { ProfileRouter } from "./route/profile";
import { DonationRouter } from "./route/dontations";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
dotenv.config();

app.use("/user", UserRouter);
app.use("/", ProfileRouter);
app.use("/don", DonationRouter);
app.listen(8000, () => {
  console.log(`✅ Server is running on port 8000`);
});
