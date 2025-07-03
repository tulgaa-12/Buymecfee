import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Buttoncontainer = () => {
  return (
    <div className="w-[251px] flex flex-col">
      <Button variant="outline" className="border-none">
        Home
      </Button>
      <Button variant="outline" className="border-none">
        Explore
      </Button>
      <Button variant="outline" className="border-none ">
        View page
        <ExternalLink />
      </Button>
      <Button variant="outline" className="border-none ">
        Account settings
      </Button>
    </div>
  );
};
