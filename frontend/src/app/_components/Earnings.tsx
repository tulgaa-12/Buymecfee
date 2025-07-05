"use client";

import axios from "axios";
import { Heart } from "lucide-react";
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
    username: string;
  };
};
export const Earnings = () => {
  const [pro, setPro] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getAllProfiles");
        console.log("res.data", res.data);
        setPro(res.data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };
    fetchProfiles();
  }, []);
  return (
    <div className="w-[907px] h-full shadow-lg rounded-lg border border-[#E4E4E7]">
      <div className="w-[859px] h-full flex justify-center items-center">
        {pro.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="h-[64px] w-[64px] bg-[#F4F4F5] rounded-full flex justify-center items-center">
              <Heart />
            </div>
            <p className="text-[16px] font-semibold ">
              You don’t have any supporters yet
            </p>
            <p className="text-[16px] font-normal ">
              Share your page with your audience to get started.
            </p>
          </div>
        ) : (
          <div>
            {pro.map((el) => (
              <div key={el.id} className="flex justify-between">
                <div>
                  <div className="font-bold text-lg">{el.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
