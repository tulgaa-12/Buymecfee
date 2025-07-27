"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Camera, PhoneOutgoing, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { file } from "zod/v4-mini";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import axios from "axios";

export const StepProfile = () => {
  const formSchema = z.object({
    select: z.string().min(1),
    firstname: z.string().min(3).max(20),
    lastname: z.string().min(3).max(20),
    card: z.string().min(10).max(20),
    expires: z.string().refine(
      (val) => {
        const num = Number(val);
        return Number.isInteger(num) && num >= 1 && num <= 12;
      },
      {
        message: "Expires must be a number between 1 and 12",
      }
    ),
    year: z.string().min(4),
    cvc: z.string().min(4),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      card: "",
      expires: "",
      year: "",
      cvc: "",
    },
  });

  const router = useRouter();

  const HandleSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      const month = values.expires.padStart(2, "0");
      const expiryDate = new Date(`${values.year}-${month}-01`);

      const res = await axios.post(
        "https://buymecfee-e06t.onrender.com/createBankCard",
        {
          country: values.select,
          firstName: values.firstname,
          lastName: values.lastname,
          cardNumber: values.card,
          expiryDate: expiryDate.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(res.data);
      router.push("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col gap-3 pr-[180px]">
        <h1 className="text-[24px] font-semibold">
          How would you like to be paid?
        </h1>
        <p className="text-[14px] font-normal text-[#71717A]">
          Enter location and payment details
        </p>
      </div>
      <Form {...form}>
        <form
          className="space-y-8  "
          onSubmit={form.handleSubmit(HandleSubmit)}>
          <FormField
            control={form.control}
            name="select"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-10">
                <FormLabel>Select country</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[510px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select</SelectLabel>
                        <SelectItem value="United States">
                          United States
                        </SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Mongolia">Mongolia</SelectItem>
                        <SelectItem value="New Zealand">New Zealand</SelectItem>
                        <SelectItem value="other">other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex flex-row gap-3">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name here"
                            className="w-[249px] h-[40px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name here"
                            className="w-[249px] h-[40px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="card"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter card number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          className="w-[510px] h-[40px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-5">
            <FormField
              control={form.control}
              name="expires"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Month"
                      className="w-[159px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Year"
                      className="w-[159px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="CVC"
                      className="w-[159px] h-[40px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-[359px] h-[40px]">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
