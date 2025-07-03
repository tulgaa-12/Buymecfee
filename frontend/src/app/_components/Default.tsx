import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Default = () => {
  return (
    <div className="w-[955px] h-full flex flex-col justify-center items-center">
      <div className="w-[907px] h-[257px] shadow-lg rounded-lg border border-[#E4E4E7]"></div>
      <div className="w-[907px] flex flex-col gap-5">
        <div className="w-[907px] flex flex-row justify-between h-[36px]">
          <p className="text-[16px] font-semibold">Recent transactions</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[907px] h-full shadow-lg rounded-lg border border-[#E4E4E7]"></div>
      </div>
    </div>
  );
};
