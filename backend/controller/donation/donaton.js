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
exports.createDonation = void 0;
const prisma_1 = require("../../utlis/prisma");
const createDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { amount, specialMessage, socialURLOrBuyMeACoffee, recipientId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    console.log(req.body, "assddddwdd");
    // const url = `http://localhost:3000/DonationComplete/${userId}`;
    // const qr = await QRCode.toDataURL(url);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (userId === recipientId) {
        res.status(400).json({ error: "You cannot donate to yourself." });
        return;
    }
    const recipient = yield prisma_1.prisma.user.findUnique({
        where: { id: recipientId },
    });
    if (!recipient) {
        res.status(404).json({ error: "Recipient not found" });
        return;
    }
    const donation = yield prisma_1.prisma.donation.create({
        data: {
            amount,
            specialMessage,
            socialURLOrBuyMeACoffee,
            donor: { connect: { id: userId } },
            recipient: { connect: { id: recipientId } },
        },
    });
    res.status(201).json(donation);
});
exports.createDonation = createDonation;
