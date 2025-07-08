import { Router } from "express";
import { createDonation } from "../controller/donation/donaton";
import {
  getReceivedDonations,
  getSentDonations,
} from "../controller/donation/get-donation";
import { protect } from "../middleware/verify";

export const DonationRouter = Router();

DonationRouter.post("/donation/:userId", protect, createDonation);
DonationRouter.get("/donation/donor/:userId", protect, getSentDonations);
DonationRouter.get("/donation/rec/:userId", getReceivedDonations);
