"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

import { useEffect, useState } from "react";

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
  };
};

export const DefaultHeader = () => {
  const [pro, setPro] = useState<Profile | null>(null);
  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:8000/getCompleteProfile/${userId}`
        );
        console.log("res.data", res.data);
        setPro(res.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    fetch();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };
  return (
    <div className="w-screen h-[56px] flex flex-row items-center justify-between pl-[100px] pr-[100px]">
      <div className="text-[16]px">
        <img src="Logo.jpg" className="" />
      </div>
      {pro && (
        <div className="flex items-center gap-2">
          {pro.avatarImage && (
            <img
              src={pro.avatarImage}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <p>{pro.name}</p>
        </div>
      )}

      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-[83px] h-[40px] bg-[#F4F4F5] rounded-md">
        Log out
      </Button>
    </div>
  );
};
