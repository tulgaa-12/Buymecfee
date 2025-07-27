"use client";
import { Button } from "@/components/ui/button";

import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Earnings } from "./Earnings";
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

type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientId: number;
  createdAt: string;
  updatedAt: string;
  donor: {
    id: number;
    email: string;
    username: string;
    profile: {
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
    };
  };
};

export const Default = () => {
  const [pro, setPro] = useState<Profile | null>(null);
  const [don, setDon] = useState<Donation[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `https://buymecfee-e06t.onrender.com/getCompleteProfile/${userId}`
        );
        console.log("res.data", res.data);
        setPro(res.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `https://buymecfee-e06t.onrender.com/don/donation/rec/${userId}`
        );
        console.log("res.data", res.data);
        setDon(res.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    fetch();
  }, []);

  const totalAmount = Array.isArray(don)
    ? don.reduce((sum, don) => sum + don.amount, 0)
    : 0;

  const handleCopy = () => {
    const pageUrl = `${window.location.origin}/${pro?.user.username}`;
    navigator.clipboard.writeText(pageUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="w-[955px] h-full flex flex-col justify-center items-center gap-10">
      <div className="w-[907px] h-[257px] shadow-lg rounded-lg border border-[#E4E4E7] flex flex-col justify-center items-center gap-1">
        <div className=" w-[859px] flex flex-row justify-between">
          {pro && (
            <div className="w-[300px] flex flex-row gap-5">
              {pro.avatarImage && (
                <img
                  src={pro.avatarImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-[16px] font-bold">{pro.user.username}</p>
                <p className="text-[14px] font-normal">
                  {pro.user.email}/{pro.name}
                </p>
              </div>
            </div>
          )}
          <Button onClick={handleCopy}>
            <Copy />
            Share page link
          </Button>
        </div>
        <div className="w-[859px] h-[33px] flex items-center justify-center">
          <div className="h-[1px] w-[859px] border border-1-[#E4E4E7] "></div>
        </div>
        <div className="w-[859px] flex flex-row gap-10">
          <div className="flex flex-col gap-10">
            <h4 className="text-[20px] font-bold">Earnings</h4>
            <h1 className="text-[36px] font-bold">$ {totalAmount}</h1>
          </div>
        </div>
      </div>
      <div className="w-[907px] flex flex-col gap-5">
        <Earnings />
      </div>
    </div>
  );
};
