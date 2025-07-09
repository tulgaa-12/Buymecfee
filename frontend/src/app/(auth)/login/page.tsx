"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const LoginHome = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    email: z.string().min(8).max(50),
    password: z.string().min(8).max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const HandleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        values
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        router.push("/");
      } else {
        alert("Login failed");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Login failed");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-1/2 h-screen flex flex-col justify-center items-center gap-5">
      <div className="pr-[205px]">
        <h3 className="font-semibold text-[24px]">Welcome back</h3>
      </div>
      <div className="flex flex-col">
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(HandleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
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
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password here"
                        className="w-[359px] h-[40px] pr-10"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
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
    </div>
  );
};

export default LoginHome;
