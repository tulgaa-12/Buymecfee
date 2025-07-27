import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import { prisma } from "./utlis/prisma";
import { prisma } from "./utlis/prisma";
import cors from "cors";
import QRCode from "qrcode";
import { UserRouter } from "./route/user";
import { ProfileRouter } from "./route/profile";
import { DonationRouter } from "./route/dontations";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/qradonation", async (req, res) => {
  const url = "https://www.instagram.com/chelseafc/";

  try {
    const qr = await QRCode.toDataURL(url);

    res.json({ qr });
  } catch (err) {
    res.status(500).send("Failed to generate QR code");
  }
});

app.use("/user", UserRouter);
app.use("/", ProfileRouter);
app.use("/don", DonationRouter);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
