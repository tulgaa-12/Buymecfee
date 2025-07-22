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
exports.createProfile = void 0;
const prisma_1 = require("../../utlis/prisma");
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, about, avatarImage, socialMediaURL, backgroundImage, successMessage, userId, } = req.body;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        const userExists = yield prisma_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!userExists) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const profile = yield prisma_1.prisma.profile.create({
            data: {
                name,
                about,
                avatarImage,
                socialMediaURL,
                backgroundImage,
                successMessage,
                user: {
                    connect: { id: userId },
                },
            },
        });
        res.status(201).json(profile);
    }
    catch (error) {
        console.error("Create profile error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createProfile = createProfile;
