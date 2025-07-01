"use client";

import { useState } from "react";
import { Header } from "../Header";
import { CompleteProfile } from "./_components/CompleteProfile";
import { StepProfile } from "./_components/StepProfile";

const Profilepage = () => {
  const [step, setStep] = useState(0);
  const components = [CompleteProfile, StepProfile];

  const ComponentSteper = components[step];

  const Next = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <div>
      <Header />
      <ComponentSteper Next={Next} />
    </div>
  );
};

export default Profilepage;
