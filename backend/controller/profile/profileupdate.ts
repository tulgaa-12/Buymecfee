// import { Request, Response } from "express";
// import { prisma } from "../../utlis/prisma";

// export const updateProfile = async (req: Request, res: Response) => {
//   //   const { userId } = req.params;
//   const { username, about, socialMediaURL, avatarImage } = req.body;

//   try {
//     const userId = parseInt(req.params.userId);
//     await prisma.profile.update({
//       where: { userId },
//       data: {
//         about,
//         socialMediaURL,
//         avatarImage,
//       },
//     });
//     await prisma.user.update({
//       where: { id: userId },
//       data: { username },
//     });

//     const updatedProfile = await prisma.profile.findUnique({
//       where: { userId },
//       include: {
//         user: true,
//       },
//     });
//     res.status(200).json(updatedProfile);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update profile" });
//   }
// };

import { Request, Response } from "express";
import { prisma } from "../../utlis/prisma";

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, about, socialMediaURL, avatarImage } = req.body;

  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    // Update profile data
    const profile = await prisma.profile.update({
      where: { userId },
      data: {
        about,
        socialMediaURL,
        avatarImage,
      },
    });

    // Update username in user table
    const user = await prisma.user.update({
      where: { id: userId },
      data: { username },
    });

    // Return updated profile + user
    const updatedProfile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
