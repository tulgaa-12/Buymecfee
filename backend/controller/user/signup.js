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
exports.signup = exports.Hello = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../utlis/prisma");
dotenv_1.default.config();
const Hello = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.DATABASE_URL);
    res.json("hello");
});
exports.Hello = Hello;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${req.method} ${req.path}`);
    try {
        const { email, password, username } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .json({ error: "Email, password and username are required" });
            return;
        }
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.prisma.user.create({
            data: { email, password: hashedPassword, username },
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
            token,
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error", details: err });
    }
});
exports.signup = signup;
