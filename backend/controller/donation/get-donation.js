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
exports.getDonationQr = exports.getReceivedDonations = exports.getSentDonations = void 0;
const prisma_1 = require("../../utlis/prisma");
const qrcode_1 = __importDefault(require("qrcode"));
const getSentDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    if (!userId) {
        res.status(400).json({ error: "UserId parameter missing or invalid" });
        return;
    }
    try {
        const donations = yield prisma_1.prisma.donation.findMany({
            where: { donorId: userId },
            include: {
                recipient: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        profile: true,
                    },
                },
            },
        });
        res.json(donations);
    }
    catch (error) {
        console.error("Error fetching sent donations:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getSentDonations = getSentDonations;
const getReceivedDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const donations = yield prisma_1.prisma.donation.findMany({
            where: { recipientId: userId },
            include: {
                donor: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        profile: true,
                    },
                },
            },
        });
        res.json(donations);
    }
    catch (error) {
        console.error("Error fetching received donations:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.getReceivedDonations = getReceivedDonations;
const getDonationQr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    if (!userId) {
        res.status(400).json({ error: "Invalid userId" });
        return;
    }
    const url = `http://localhost:3000/DonationComplete/${userId}`;
    try {
        const qr = yield qrcode_1.default.toDataURL(url);
        res.json({ qr });
        return;
    }
    catch (error) {
        console.error("QR generation error:", error);
        res.status(500).json({ error: "Failed to generate QR" });
        return;
    }
});
exports.getDonationQr = getDonationQr;
