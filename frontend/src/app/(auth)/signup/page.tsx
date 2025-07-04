"use client";
import { Signup } from "./_components/Signup";
import { Username } from "./_components/Username";
import { useState } from "react";

const SignUpPage = () => {
  const components = [Signup, Username];
  const [step, setStep] = useState(0);
  const [usersname, setUsername] = useState("");
  const Stepper = components[step];
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <Stepper
      nextStep={nextStep}
      setUsername={setUsername}
      usersname={usersname}
    />
  );
};

export default SignUpPage;
