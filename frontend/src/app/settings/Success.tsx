import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

export const Success = () => {
  return (
    <div className="w-[650px] shadow-lg  rounded-lg border border-[#E4E4E7] p-5 flex flex-col gap-5">
      <p className="text-[16px] font-bold ">Success page</p>
      <div className="flex flex-col gap-3">
        <Label htmlFor="lastname" className="font-medium">
          Confirmation message
        </Label>
        <Textarea id="password" className="h-[131px]" />
      </div>
      <Button>Save changes</Button>
    </div>
  );
};
