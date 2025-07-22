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
exports.updateProfile = void 0;
const prisma_1 = require("../../utlis/prisma");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, about, socialMediaURL, avatarImage } = req.body;
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }
        const profile = yield prisma_1.prisma.profile.update({
            where: { userId },
            data: {
                about,
                socialMediaURL,
                avatarImage,
            },
        });
        const user = yield prisma_1.prisma.user.update({
            where: { id: userId },
            data: { username },
        });
        const updatedProfile = yield prisma_1.prisma.profile.findUnique({
            where: { userId },
            include: { user: true },
        });
        res.status(200).json(updatedProfile);
    }
    catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});
exports.updateProfile = updateProfile;
