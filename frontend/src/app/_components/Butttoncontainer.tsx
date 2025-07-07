"use client";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Buttoncontainer = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  return (
    <div className="w-[251px] flex flex-col">
      <Link href={"/"}>
        <Button variant="outline" className="border-none w-[251px]">
          <p className="pr-[170px]"> Home</p>
        </Button>
      </Link>
      <Link href={"Explore"}>
        <Button variant="outline" className="border-none w-[251px]">
          <p className="pr-[160px]">Explore</p>
        </Button>
      </Link>
      {userId && (
        <Link href={`/editdashboard/${userId}`}>
          <Button variant="outline" className="border-none  w-[251px]">
            <p className="pr-[119px]">View page</p>
            <ExternalLink />
          </Button>
        </Link>
      )}
      <Link href={"/settings"}>
        <Button variant="outline" className="border-none w-[251px] ">
          <p className="pr-[100px]"> Account settings </p>
        </Button>
      </Link>
    </div>
  );
};
