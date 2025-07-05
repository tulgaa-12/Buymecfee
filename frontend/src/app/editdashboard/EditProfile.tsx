"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
};

export const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [pro, setPro] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    about: "",
    socialMediaURL: "",
    avatarImage: "",
  });

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage) return null;
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "food-delivery");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dip9rajob/image/upload`,
        { method: "POST", body: formData }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:8000/getCompleteProfile/${userId}`
        );
        setPro(res.data);
        setFormData({
          username: res.data.user.username,
          about: res.data.about,
          socialMediaURL: res.data.socialMediaURL,
          avatarImage: res.data.avatarImage,
        });
        setSelectedImage(null);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    let imageUrl = formData.avatarImage;
    if (selectedImage) {
      const uploaded = await uploadImage();
      if (uploaded) imageUrl = uploaded;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/updateProfile/${userId}`,
        {
          ...formData,
          avatarImage: imageUrl,
        }
      );

      setPro(res.data);
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit page</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[425px]  lg:w-[400px]   xl:w-[458px]  2xl:w-[558px]   xl:h-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className=" flex gap-3 flex-col">
          <Label htmlFor="avatar">Add Photo</Label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setSelectedImage(file);
            }}
          />
          <Label
            htmlFor="avatar"
            className="flex items-center justify-center h-[160px] w-[160px] rounded-full border border-dashed cursor-pointer overflow-hidden">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <>
                {formData.avatarImage ? (
                  <img
                    src={formData.avatarImage}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Camera className="text-gray-400" />
                )}
              </>
            )}
          </Label>
        </div>

        <div className="grid gap-4 mt-6">
          <div className="grid gap-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="about">About</Label>
            <Input
              id="about"
              value={formData.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="social">Social Media URL</Label>
            <Input
              id="social"
              value={formData.socialMediaURL}
              onChange={(e) =>
                setFormData({ ...formData, socialMediaURL: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => handleSave()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
