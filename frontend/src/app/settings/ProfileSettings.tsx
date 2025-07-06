"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  about: z.string().min(10, "About must be at least 10 characters"),
  socialMediaURL: z.string().url("Please enter a valid URL"),
});

type FormData = z.infer<typeof formSchema>;

type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
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

export const ProfileSettings = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [pro, setPro] = useState<Profile | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
        setValue("username", res.data.user.username);
        setValue("about", res.data.about);
        setValue("socialMediaURL", res.data.socialMediaURL);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    let imageUrl = pro?.avatarImage || "";
    if (selectedImage) {
      const uploaded = await uploadImage();
      if (uploaded) imageUrl = uploaded;
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/updateProfile/${userId}`,
        {
          ...data,
          avatarImage: imageUrl,
        }
      );
      setPro(res.data);
    } catch (err) {
      console.error("Profile update error:", err);
    }
  };

  return (
    <div className="shadow-lg rounded-lg w-[650px] border border-[#E4E4E7] p-5 flex flex-col gap-5">
      <p className="text-[16px] font-bold">Personal Info</p>

      <div className="flex gap-3 flex-col w-[160px] h-[186px]">
        <Label htmlFor="avatar" className="font-medium">
          Add Photo
        </Label>
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
              {pro?.avatarImage ? (
                <img
                  src={pro.avatarImage}
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 mt-6 w-full max-w-[600px]">
        <div className="grid gap-2">
          <Label htmlFor="username">Name</Label>
          <Input id="username" {...register("username")} />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="about">About</Label>
          <Textarea id="about" {...register("about")} className="h-[131px]" />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="social">Social Media URL</Label>
          <Input id="social" {...register("socialMediaURL")} />
          {errors.socialMediaURL && (
            <p className="text-red-500 text-sm">
              {errors.socialMediaURL.message}
            </p>
          )}
        </div>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
};
