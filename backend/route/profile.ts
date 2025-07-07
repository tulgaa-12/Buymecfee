import { Router } from "express";
import { createProfile } from "../controller/profile/CompleteProfile";
import { protect } from "../middleware/verify";
import { createBankCard } from "../controller/profile/stepProfile";
import { getCompleteProfile } from "../controller/profile/get-completeProfile";
import { getAllProfiles } from "../controller/profile/get-Allcompleteprofile";
import { updateProfile } from "../controller/profile/profileupdate";
import { Paymentupdate } from "../controller/profile/paymentupdate";
import { getUpdate } from "../controller/profile/get-Payment";
import { getProfileById } from "../controller/profile/getProfileById";
export const ProfileRouter = Router();

ProfileRouter.post("/profile", createProfile);
ProfileRouter.get("/getCompleteProfile/:userId", getCompleteProfile);
ProfileRouter.post("/createBankCard", protect, createBankCard);
ProfileRouter.get("/getAllProfiles", getAllProfiles);
ProfileRouter.put("/updateProfile/:userId", updateProfile);
ProfileRouter.put("/paymentupdate/:userId", Paymentupdate);
ProfileRouter.get("/getbankcard/:userId", getUpdate);

ProfileRouter.get("/profiles/:id", getProfileById);
