"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
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

export const DefaultHeader = () => {
  const [pro, setPro] = useState<Profile | null>(null);

  const router = useRouter();

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

  // const arr = ["/", "/editdashboard"];
  // const path = usePathname();

  // if (arr.includes(path)) {
  //   return null;
  // }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="w-screen h-[56px] flex flex-row items-center justify-between pl-[100px] pr-[100px]">
      <div className="text-[16]px">
        <img src="Logo.jpg" className="" />
      </div>
      <div className="flex flex-row gap-10 items-center justify-center">
        {pro && (
          <Link href={"/editdashboard"}>
            <div className="flex items-center gap-2">
              {pro.avatarImage && (
                <img
                  src={pro.avatarImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <p>{pro.user.username}</p>
            </div>
          </Link>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link">
              <ChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onClick={handleLogout}
            className="w-[187px] h-[40px] flex items-center">
            <p className=" text-[14px] rounded-md">Logout</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
