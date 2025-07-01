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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Signup } from "./_components/Signup";
import { Username } from "./_components/Username";
import { useState } from "react";

const SignUpPage = () => {
  const components = [Signup, Username];
  const [step, setStep] = useState(0);

  const Stepper = components[step];
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return <Stepper nextStep={nextStep} />;
};

export default SignUpPage;
