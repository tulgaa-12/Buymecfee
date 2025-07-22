"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const login_1 = require("../controller/user/login");
const verify_1 = require("../middleware/verify");
const signup_1 = require("../controller/user/signup");
const verif_1 = require("../controller/user/verif");
const forget_1 = require("../controller/user/forget");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.get("/", signup_1.Hello);
exports.UserRouter.post("/login", login_1.login);
exports.UserRouter.post("/sign-up", signup_1.signup);
exports.UserRouter.post("/verif", verif_1.verif);
exports.UserRouter.put("/forget", forget_1.Forgetpassword);
exports.UserRouter.post("verify", verify_1.protect);
exports.UserRouter.get("/profile", verify_1.protect, (req, res) => {
    res.json({ user: req.user });
});
