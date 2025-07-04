"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { Camera } from "lucide-react";

import next from "next";

import Link from "next/link";
import { format } from "path";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { any, file } from "zod/v4-mini";

import { useAuth } from "@/app/_components/UserProvider";
type all = {
  Next: () => void;
};

export const CompleteProfile = ({ Next }: all) => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const formSchema = z.object({
    file: z.any(),
    //   .refine(
    //     (file) =>
    //       file instanceof File && /\.(jpe?g|png|gif|webp)$/i.test(file.name),
    //     {
    //       message: "Зураг файл (.jpg, .png, .webp...) оруулна уу",
    //     }
    //   ),
    name: z.string().min(4).max(20),
    //   .regex(/^[a-zA-Zа-яА-ЯӨөҮүЁёЇїІіЄє'’ -]{2,50}$/),
    about: z.string(),
    url: z.string().min(10),
    //   .regex(
    //     /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube|tiktok|pinterest)\.com\/[a-zA-Z0-9_.-]+\/?$/
    //   ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      url: "",
    },
  });

  const uploadImage = async () => {
    if (!selectedImage) {
      alert("Please select a file");
      return null;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "food-delivery");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dip9rajob/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Failed to upload image:", error);
      return null;
    }
  };

  const HandleSubmit = async (values: z.infer<typeof formSchema>) => {
    const userId = localStorage.getItem("userId");

    const imageUrl = await uploadImage();
    if (!imageUrl) return;
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/profile",
        {
          name: values.name,
          about: values.about,
          avatarImage: imageUrl,
          socialMediaURL: values.url,
          backgroundImage: "https://example.com/default-bg.jpg",
          successMessage: "Profile completed successfully!",
          userId: parseInt(userId!),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.user?.id) {
        const userId = res.data.user.id;
        localStorage.setItem("userId", String(userId));
      } else {
        console.error("Signup failed:", res.data);
        alert("Signup failed");
      }
    } catch (err) {
      console.log(err, "errorr");
    }
    Next();
    console.log(values);
  };

  const HandleRemove = () => {
    setSelectedImage(null);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5 ">
      <h3 className="font-semibold text-[24px] pr-[230px]">
        Complete your profile page
      </h3>
      <div>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(HandleSubmit)}>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add photo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        className="w-[160px] h-[160px] rounded-full opacity-0 absolute z-index bottom-0"
                        {...field}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedImage(file);
                          }
                        }}
                      />
                      {selectedImage ? (
                        <div className="relative h-[160px] w-[160px] rounded-full">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            className="h-[160px] w-[160px]  object-cover rounded-full"
                            onClick={HandleRemove}
                          />
                        </div>
                      ) : (
                        <Label
                          htmlFor="image"
                          className="flex flex-col items-center justify-center h-[160px] w-[160px] rounded-full border-1 border-dashed  ">
                          <span className="w-[32px] h-[32px] rounded-full bg-white flex justify-center items-center">
                            <Camera className="text-[#E4E4E7]" />
                          </span>
                        </Label>
                      )}
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name here"
                      className="w-[510px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write about yourself here"
                      className="w-[510px] h-[131px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social media URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://"
                      className="w-[510px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[264px] h-[40px]">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
