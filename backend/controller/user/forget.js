"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forgetpassword = void 0;
const prisma_1 = require("../../utlis/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Forgetpassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, password } = req.body;
        if (!userId || !password) {
            res.status(400).json({ message: "userId and password are required" });
            return;
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: Number(userId) },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma_1.prisma.user.update({
            where: { id: Number(userId) },
            data: { password: hashedPassword },
        });
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (err) {
        console.error("Forgetpassword error:", err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.Forgetpassword = Forgetpassword;
