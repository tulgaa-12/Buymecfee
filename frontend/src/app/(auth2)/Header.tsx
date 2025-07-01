import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <div className="w-screen h-[56px] flex flex-row items-center justify-between pl-[100px] pr-[100px]">
      <div className="text-[16]px">
        <img src="Logo.jpg" className="" />
      </div>
      <Button
        variant="outline"
        className="w-[83px] h-[40px] bg-[#F4F4F5] rounded-md"
      >
        Log out
      </Button>
    </div>
  );
};
