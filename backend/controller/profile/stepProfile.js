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
exports.createBankCard = void 0;
const prisma_1 = require("../../utlis/prisma");
const createBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { country, firstName, lastName, cardNumber, expiryDate } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized: No user ID in token" });
            return;
        }
        const newCard = yield prisma_1.prisma.bankCard.create({
            data: {
                country,
                firstName,
                lastName,
                cardNumber,
                expiryDate: new Date(expiryDate),
                user: {
                    connect: { id: userId },
                },
            },
        });
        res.status(201).json(newCard);
    }
    catch (error) {
        console.error("Error creating bank card:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createBankCard = createBankCard;
