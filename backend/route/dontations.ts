import { Router } from "express";
import { createDonation } from "../controller/donation/donaton";
import {
  getReceivedDonations,
  getSentDonations,
} from "../controller/donation/get-donation";
import { protect } from "../middleware/verify";

export const DonationRouter = Router();

DonationRouter.post("/donation", createDonation);
DonationRouter.get("/donation/sent/:userId", getSentDonations);
DonationRouter.get("/donation/received/:userId", getReceivedDonations);
