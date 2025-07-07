"use client";
import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

type DonationState = {
  amount: string;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  recipientId: string;
};

export const Donation = () => {
  const [formData, setFormData] = useState<DonationState>({
    amount: "",
    specialMessage: "",
    socialURLOrBuyMeACoffee: "",
    recipientId: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAmountClick = (value: string) => {
    setFormData((prev) => ({ ...prev, amount: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDonate = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/donations",
        {
          amount: Number(formData.amount),
          specialMessage: formData.specialMessage,
          socialURLOrBuyMeACoffee: formData.socialURLOrBuyMeACoffee,
          recipientId: Number(formData.recipientId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Donation sent successfully!");
      setFormData({
        amount: "",
        specialMessage: "",
        socialURLOrBuyMeACoffee: "",
        recipientId: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[450px] h-full lg:w-[628px] lg:h-[470px] shadow-lg border border-[#E4E4E7] bg-white rounded-lg p-5 flex flex-col gap-5">
      <h3 className="text-[24px] font-semibold">Buy Jake a Coffee</h3>
      <div className="w-[337px] h-[40px] flex flex-row gap-3">
        {["1", "2", "5", "10"].map((el) => (
          <Button
            key={el}
            variant="outline"
            className={`w-[72px] bg-[#F4F4F5] ${
              formData.amount === el ? "" : ""
            }`}
            onClick={() => handleAmountClick(el)}>
            <Coffee />${el}
          </Button>
        ))}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="socialURLOrBuyMeACoffee" className="font-medium">
          Enter BuyMeCoffee or social account URL:
        </Label>
        <Input
          id="socialURLOrBuyMeACoffee"
          name="socialURLOrBuyMeACoffee"
          placeholder="buymeacoffee.com/"
          value={formData.socialURLOrBuyMeACoffee}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="specialMessage" className="font-medium">
          Special message:
        </Label>
        <Textarea
          id="specialMessage"
          name="specialMessage"
          className="h-[131px]"
          placeholder="Please write your message here"
          value={formData.specialMessage}
          onChange={handleChange}
        />
      </div>

      <Button onClick={handleDonate} disabled={loading}>
        {loading ? "Sending..." : "Donate"}
      </Button>
    </div>
  );
};
