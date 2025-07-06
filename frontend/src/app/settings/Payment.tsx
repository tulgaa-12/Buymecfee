"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

type PaymentForm = {
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expires: string;
  year: string;
  cvc: string;
};

export const Payment = () => {
  const [pro, setPro] = useState<PaymentForm | null>(null);
  const { register, handleSubmit, setValue, watch } = useForm<PaymentForm>({
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expires: "",
      year: "",
      cvc: "",
    },
  });

  const country = watch("country");
  const firstName = watch("firstName");
  const lastName = watch("lastName");

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost:8000/getbankcard/${userId}`
        );
        const data = res.data;
        setPro(res.data);
        setValue("country", data.country || "");
        setValue("firstName", data.firstName || "");
        setValue("lastName", data.lastName || "");
        setValue("cardNumber", data.cardNumber || "");

        if (data.expiryDate) {
          const d = new Date(data.expiryDate);
          setValue("expires", ("0" + (d.getMonth() + 1)).slice(-2));
          setValue("year", d.getFullYear().toString());
        }
        setValue("cvc", data.cvc || "");
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data: PaymentForm) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const expiryDate = `${data.year}-${data.expires}-01`;

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      cardNumber: data.cardNumber,
      country: data.country,
      expiryDate,
    };

    try {
      const res = await axios.put(
        `http://localhost:8000/paymentupdate/${userId}`,
        payload
      );
      setPro(res.data);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="w-[650px] shadow-lg rounded-lg border border-[#E4E4E7] p-5 flex flex-col gap-5">
      <p className="font-bold text-[16px]">Payment details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Label className="flex flex-col gap-1">
          Select country
          <Select
            onValueChange={(value) => setValue("country", value)}
            value={country}>
            <SelectTrigger className="w-[602px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Mongolia">Mongolia</SelectItem>
                <SelectItem value="New Zealand">New Zealand</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Label>

        <div className="flex gap-3">
          <Label className="flex flex-col w-[295px] gap-1">
            Firstname
            <Input
              value={firstName}
              onChange={(e) => setValue("firstName", e.target.value)}
            />
          </Label>
          <Label className="flex flex-col w-[295px] gap-1">
            Lastname
            <Input
              value={lastName}
              onChange={(e) => setValue("lastName", e.target.value)}
            />
          </Label>
        </div>

        <Label className="flex flex-col gap-1">
          Card Number
          <Input
            {...register("cardNumber")}
            className="w-[602px]"
            placeholder="Card Number"
          />
        </Label>

        <div className="flex gap-5">
          <Label className="flex flex-col gap-1">
            Expire
            <Input {...register("expires")} placeholder="MM" />
          </Label>
          <Label className="flex flex-col gap-1">
            Year
            <Input {...register("year")} placeholder="YYYY" />
          </Label>
          <Label className="flex flex-col gap-1">
            CVC
            <Input {...register("cvc")} placeholder="CVC" />
          </Label>
        </div>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
};
