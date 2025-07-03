import { Router } from "express";
import { login } from "../controller/user/login";
import { protect } from "../middleware/verify";
import { Hello, signup } from "../controller/user/signup";

export const UserRouter = Router();
UserRouter.get("/", Hello);
UserRouter.post("/sign-up", signup);

UserRouter.get("/profile", protect, (req, res) => {
  res.json({ user: req.user });
});
