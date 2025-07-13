import { Button } from "@/components/ui/button";
import { DefaultHeader } from "../_components/DefaultHeader";
import { useEffect } from "react";
import Link from "next/link";

const DonHome = () => {
  return (
    <div>
      <DefaultHeader />
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-[696px] h-[311px] flex flex-col justify-center items-center gap-5 p-5">
          <img src="heart.jpg" alt="123" className="w-[64px] h-[64px]" />
          <p className="text-[14px] font-semibold">Donation Complete !</p>
          <Link href={"/"}>
            <Button className="w-[148px]">Return to explore</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonHome;
