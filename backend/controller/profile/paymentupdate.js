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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paymentupdate = void 0;
const prisma_1 = require("../../utlis/prisma");
const Paymentupdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, cardNumber, country, expiryDate } = req.body;
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }
        const profile = yield prisma_1.prisma.bankCard.update({
            where: { userId },
            data: {
                firstName,
                lastName,
                cardNumber,
                country,
                expiryDate: new Date(expiryDate),
            },
        });
        const updatedProfile = yield prisma_1.prisma.bankCard.findUnique({
            where: { userId },
            include: { user: true },
        });
        res.status(200).json(updatedProfile);
    }
    catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Failed to update Bankcard" });
    }
});
exports.Paymentupdate = Paymentupdate;
