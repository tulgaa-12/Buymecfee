import { Router } from "express";
import { login } from "../controller/user/login";
import { protect } from "../middleware/verify";
import { Hello, signup } from "../controller/user/signup";

import { verif } from "../controller/user/verif";

import { verify } from "crypto";
import { Forgetpassword } from "../controller/user/forget";

export const UserRouter = Router();
UserRouter.get("/", Hello);
UserRouter.post("/login", login);

UserRouter.post("/sign-up", signup);
UserRouter.post("/verif", verif);
UserRouter.put("/forget", Forgetpassword);
UserRouter.post("verify", protect);

UserRouter.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});
