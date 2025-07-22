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
exports.getUpdate = void 0;
const prisma_1 = require("../../utlis/prisma");
const getUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid userId" });
            return;
        }
        const payment = yield prisma_1.prisma.bankCard.findUnique({
            where: { userId },
            include: {
                user: true,
            },
        });
        if (!payment) {
            res.status(404).json({ error: "Bankcard not found" });
            return;
        }
        res.status(200).json(payment);
    }
    catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getUpdate = getUpdate;
