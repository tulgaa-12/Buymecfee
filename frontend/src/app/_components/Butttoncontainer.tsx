import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const Buttoncontainer = () => {
  return (
    <div className="w-[251px] flex flex-col">
      <Link href={"/"}>
        <Button variant="outline" className="border-none w-[251px]">
          <p className="pr-[170px]"> Home</p>
        </Button>
      </Link>
      <Button variant="outline" className="border-none">
        <p className="pr-[160px]">Explore</p>
      </Button>
      <Button variant="outline" className="border-none ">
        <p className="pr-[115px] ">View page</p>
        <ExternalLink />
      </Button>
      <Link href={"/settings"}>
        <Button variant="outline" className="border-none w-[251px] ">
          <p className="pr-[100px]"> Account settings </p>
        </Button>
      </Link>
    </div>
  );
};
