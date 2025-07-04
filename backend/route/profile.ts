import { Router } from "express";
import { createProfile } from "../controller/profile/CompleteProfile";
import { protect } from "../middleware/verify";
import { createBankCard } from "../controller/profile/stepProfile";
import { getCompleteProfile } from "../controller/profile/get-completeProfile";

export const ProfileRouter = Router();

ProfileRouter.post("/profile", protect, createProfile);
ProfileRouter.get("/getCompleteProfile/:userId", getCompleteProfile);
ProfileRouter.post("/createBankCard", protect, createBankCard);
