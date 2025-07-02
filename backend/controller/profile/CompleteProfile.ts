import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      successMessage,
      userId,
    } = req.body;

    if (
      !name ||
      !about ||
      !avatarImage ||
      !socialMediaURL ||
      !backgroundImage ||
      !successMessage ||
      !userId
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const profile = await prisma.profile.create({
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
  } catch (error) {
    console.error("Create profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// export const createProfile = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const {
//       name,
//       about,
//       socialMediaURL,
//       backgroundImage,
//       successMessage,
//       userId,
//     } = req.body;

//     if (
//       !name ||
//       !about ||
//       !socialMediaURL ||
//       !backgroundImage ||
//       !successMessage ||
//       !userId
//     ) {
//       res.status(400).json({ error: "Missing required fields" });
//       return;
//     }

//     // multer-аас авсан файл
//     const avatarImage = req.file?.filename;
//     if (!avatarImage) {
//       res.status(400).json({ error: "Avatar image file is required" });
//       return;
//     }

//     const profile = await prisma.profile.create({
//       data: {
//         name,
//         about,
//         avatarImage, // req.file.filename-аас авсан файл нэр
//         socialMediaURL,
//         backgroundImage,
//         successMessage,
//         user: { connect: { id: Number(userId) } }, // userId-гаа тоон утгаар хөрвүүлнэ
//       },
//     });

//     res.status(201).json(profile);
//   } catch (error) {
//     console.error("Create profile error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
