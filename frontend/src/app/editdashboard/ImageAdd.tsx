"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";

import { useEffect, useState } from "react";
import axios from "axios";

export const CoverImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const savedUrl = localStorage.getItem("coverImageUrl");
  //   if (savedUrl) {
  //     setUploadedUrl(savedUrl);
  //   }
  // }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
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

  // const handleUploadClick = async () => {
  //   if (!selectedImage) {
  //     alert("Please select a file");
  //     return;
  //   }
  //   setLoading(true);
  //   const url = await uploadImage(selectedImage);
  //   setLoading(false);
  //   if (url) {
  //     setUploadedUrl(url);
  //     localStorage.setItem("coverImageUrl", url);
  //   } else {
  //     alert("Upload failed");
  //   }
  // };
  const handleUploadClick = async () => {
    if (!selectedImage) {
      alert("Please select a file");
      return;
    }

    setLoading(true);
    const url = await uploadImage(selectedImage);
    setLoading(false);

    if (url) {
      setUploadedUrl(url);

      const userId = localStorage.getItem("userId");

      try {
        await axios.post("https://buymecfee-e06t.onrender.com/updatecover", {
          userId,
          coverImageUrl: url,
        });
        alert("Cover image saved to profile successfully!");
      } catch (err) {
        console.error("Failed to save to backend:", err);
        alert("Upload succeeded, but saving to profile failed");
      }
    } else {
      alert("Upload failed");
    }
  };

  const handleChangeImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchCover = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `https://buymecfee-e06t.onrender.com/getCompleteProfile/${userId}`
        );
        const url = res.data.backgroundImage;
        if (url) setUploadedUrl(url);
      } catch (err) {
        console.error("Failed to load profile image", err);
      }
    };

    fetchCover();
  }, []);

  return (
    <div className="w-screen h-[319px] 2xl:h-[500px] flex flex-col justify-center items-center">
      {uploadedUrl ? (
        <img
          src={uploadedUrl}
          alt="Uploaded Cover"
          className="w-full h-[319px] 2xl:h-[500px] object-cover relative "
        />
      ) : (
        <Button className="w-[181px] h-[40px]" onClick={handleUploadClick}>
          <Camera />
          Add a cover image
        </Button>
      )}

      {selectedImage ? (
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-4">
            <Button
              onClick={handleUploadClick}
              disabled={loading}
              className=" text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition absolute right-35 top-[72px]">
              {loading ? "Uploading..." : "Save changes"}
            </Button>
            <Button
              onClick={handleChangeImage}
              disabled={loading}
              className=" bg-[#F4F4F5] text-black w-[79px] px-4 py-2 rounded-md hover:bg-[#F4F4F5] disabled:opacity-50 disabled:cursor-not-allowed transition absolute top-[72px] right-10">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Input
            type="file"
            accept="image/*"
            id="upload"
            className="w-[149px] h-[40px]
             hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedImage(file);
              }
            }}
          />
          <Label
            htmlFor="upload"
            className=" w-[149px] h-[40px] bg-[#F4F4F5] text-[14px] text-black rounded-md flex flex-row gap-1 justify-center absolute right-10 top-[72px]">
            <Camera />
            Change cover
          </Label>
        </div>
      )}
    </div>
  );
};
