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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Next = {
  nextStep: () => void;
};

export const Signup = ({ nextStep }: Next) => {
  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const HandleSubmit = (values: z.infer<typeof formSchema>) => {
    nextStep();
    console.log(values);
  };

  return (
    <div className=" w-1/2 h-screen flex flex-col justify-center items-center gap-5">
      <div className=" pr-[140px] flex flex-col  ">
        <h3 className="font-semibold  text-[24px]">Create Your Account</h3>
        <p className="text-[14px]  text-[#71717A] font-normal">
          Choose a username for your page
        </p>
      </div>
      <Form {...form}>
        <form
          className="space-y-8  "
          onSubmit={form.handleSubmit(HandleSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username here"
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
  );
};
