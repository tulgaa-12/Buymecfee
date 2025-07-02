import { Router } from "express";
import { createProfile } from "../controller/profile/CompleteProfile";
import { protect } from "../middleware/verify";

export const ProfileRouter = Router();

ProfileRouter.post("/profile", createProfile);
