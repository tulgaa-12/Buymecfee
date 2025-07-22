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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const qrcode_1 = __importDefault(require("qrcode"));
const user_1 = require("./route/user");
const profile_1 = require("./route/profile");
const dontations_1 = require("./route/dontations");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.get("/qradonation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://www.instagram.com/chelseafc/";
    try {
        const qr = yield qrcode_1.default.toDataURL(url);
        res.json({ qr });
    }
    catch (err) {
        res.status(500).send("Failed to generate QR code");
    }
}));
app.use("/user", user_1.UserRouter);
app.use("/", profile_1.ProfileRouter);
app.use("/don", dontations_1.DonationRouter);
app.listen(8000, () => {
    console.log(`✅ Server is running on port 8000`);
});
