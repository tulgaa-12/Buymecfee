"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
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

export const Earnings = () => {
  const [pro, setPro] = useState<Donation[]>([]);
  const [filterAmount, setFilterAmount] = useState<string>("all");
  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const userId = localStorage.getItem("userId");
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
  const filteredDonations =
    filterAmount === "all"
      ? pro
      : pro.filter((el) => el.amount === parseInt(filterAmount));

  console.log(pro, "qwqwrwqr");
  return (
    <div className="flex flex-col gap-5">
      <div className="w-[907px] flex flex-row justify-between h-[36px]">
        <p className="text-[16px] font-semibold">Recent transactions</p>
        <Select onValueChange={(val) => setFilterAmount(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Amounts</SelectItem>
              <SelectItem value="1">$1</SelectItem>
              <SelectItem value="2">$2</SelectItem>
              <SelectItem value="5">$5</SelectItem>
              <SelectItem value="10">$10</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-[907px] h-full shadow-lg rounded-lg border border-[#E4E4E7] p-3">
        <div className="w-[859px] h-full flex justify-center items-center">
          {filteredDonations.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-5">
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
            <div className="flex items-center flex-col pl-[50px] gap-5 ">
              {filteredDonations.map((el) => (
                <div
                  key={el.id}
                  className=" w-200 2xl:w-[835px] h-full flex flex-col justify-center  gap-5 p-5 ">
                  <div className="h-[40px] flex justify-between items-center">
                    <div className="flex flex-row gap-3 ">
                      <img
                        src={el.donor.profile.avatarImage}
                        className="h-[40px] w-[40px] rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="text-[14px] font-medium">
                          {el.donor.username}
                        </p>
                        <p className="text-xs">{el.donor.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[16px] font-bold">+ ${el.amount}</p>
                      <p className="text-[12px]">
                        {new Date(el.createdAt).toLocaleString("mn-MN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </p>
                    </div>
                  </div>
                  <p>{el.specialMessage}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
