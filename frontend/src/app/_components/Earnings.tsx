"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  createdAt: string;
  donor: {
    username: string;
    email: string;
  };
};
export const Earnings = () => {
  const [pro, setPro] = useState<Donation[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/don/donation/rec/${userId}`
        );
        setPro(res.data);
      } catch (error) {
        console.error("Error fetching donations", error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="w-[907px] h-full shadow-lg rounded-lg border border-[#E4E4E7]">
      <div className="w-[859px] h-full flex justify-center items-center">
        {pro.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 p-10">
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
              <div key={el.id}>
                <div></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
