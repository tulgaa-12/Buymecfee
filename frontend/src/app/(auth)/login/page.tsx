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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Username } from "../signup/_components/Username";
import { email } from "zod/v4-mini";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
const LoginHome = () => {
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
  // const HandleSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/user/login",
  //       values
  //     );
  //     if (response.status === 200) {
  //       router.push("/");
  //       console.log("Login successful", response.data);
  //     } else {
  //       alert("Login failed");
  //     }
  //   } catch (error) {
  //     console.log("aldaa garlaa", error);
  //   }
  // };
  const HandleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        values
      );

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", String(response.data.user.id));
        router.push("/");
      } else {
        alert("Login failed");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Login failed");
      } else {
        alert("Network error");
      }
      console.error("Login error:", error);
    }
  };
  return (
    <div className=" w-1/2 h-screen flex flex-col justify-center items-center gap-5">
      <div className="pr-[205px]">
        <h3 className="font-semibold  text-[24px]">Welcome back</h3>
      </div>
      <div className="flex flex-col ">
        <Form {...form}>
          <form
            className="space-y-8  "
            onSubmit={form.handleSubmit(HandleSubmit)}>
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
