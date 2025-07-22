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
exports.updateCoverImage = void 0;
const prisma_1 = require("../../utlis/prisma");
const updateCoverImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, coverImageUrl } = req.body;
    try {
        const updated = yield prisma_1.prisma.profile.update({
            where: { userId: parseInt(userId) },
            data: { backgroundImage: coverImageUrl },
        });
        res.json(updated);
    }
    catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Failed to update cover image" });
    }
});
exports.updateCoverImage = updateCoverImage;
