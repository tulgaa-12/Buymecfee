"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
export const Default = () => {
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
          <Button>
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
            <h1 className="text-[36px] font-bold">${8 + 8}</h1>
          </div>
          <Select>
            <SelectTrigger className="w-[175px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                <SelectItem value="All time">All time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-[907px] flex flex-col gap-5">
        <div className="w-[907px] flex flex-row justify-between h-[36px]">
          <p className="text-[16px] font-semibold">Recent transactions</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">
                <Checkbox />
                $1
              </SelectItem>

              <SelectItem value="banana">
                <Checkbox />
                $2
              </SelectItem>
              <SelectItem value="blueberry">
                <Checkbox />
                $5
              </SelectItem>
              <SelectItem value="grapes">
                <Checkbox />
                $10
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Earnings />
      </div>
    </div>
  );
};
