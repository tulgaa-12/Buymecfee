"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { email } from "zod/v4-mini";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Next = {
  nextStep: () => void;
  usersname: string;
};

export const Username = ({ nextStep, usersname }: Next) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    email: z
      .string()
      .min(10, "username is required")
      .max(40)
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().min(8, "password is required").max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const HandleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const dataToSend = {
        email: values.email,
        password: values.password,
        username: usersname,
      };

      const response = await axios.post(
        "https://buymecfee-e06t.onrender.com/user/sign-up",
        dataToSend
      );

      if (response.data?.user?.id) {
        const userId = response.data.user.id;
        localStorage.setItem("userId", String(userId));
        localStorage.setItem("token", response.data.token);
        router.push("/Profile");
      } else {
        console.error("Signup failed:", response.data);
        alert("Signup failed");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Signup error");
      } else {
        alert("Network error");
      }
    }
  };

  return (
    <div className=" w-1/2 h-screen flex flex-col justify-center items-center gap-5">
      <div className="pr-[140px]">
        <h3 className="font-semibold  text-[24px]">Welcome</h3>
        <p className="text-[14px]  text-[#71717A] font-normal">
          Connect email and set a password
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Form {...form}>
          <form
            className="space-y-8  "
            onSubmit={form.handleSubmit(HandleSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email here"
                      className="w-[359px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password here"
                      className="w-[359px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-8 text-gray-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-[359px] h-[40px]">
              Continue
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-3"></div>
    </div>
  );
};
