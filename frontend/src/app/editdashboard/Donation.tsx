"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coffee, QrCode } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

type DonationState = {
  amount: string;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  recipientId: Number;
};

type ProfilePutProps = {
  userId: string | undefined;
};

export const Donation = ({ userId }: ProfilePutProps) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<DonationState>({
    amount: "",
    specialMessage: "",
    socialURLOrBuyMeACoffee: "",
    recipientId: Number(userId),
  });

  const [startRedirect, setStartRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qr, setQr] = useState("");
  const handleAmountClick = (value: string) => {
    setFormData((prev) => ({ ...prev, amount: value }));
  };

  const router = useRouter();
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
      const storedId = localStorage.getItem("userId");

      if (!storedId) {
        alert("no user");
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/don/donation/${storedId}`,
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

      const { data } = await axios.get(`http://localhost:8000/qradonation`);
      setQr(data.qr);

      // setSuccess("Donation sent successfully!");
      setFormData({
        amount: "",
        specialMessage: "",
        socialURLOrBuyMeACoffee: "",
        recipientId: 10,
      });
      setTimeout(() => {
        router.push("/DonationComplete");
      }, 9000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  // const handleQr = async () => {
  //   const { data } = await axios.get(``);
  //   setQr(data.qr);
  // };

  return (
    <div className="w-[450px] h-full lg:w-[628px] lg:h-[470px] shadow-lg border border-[#E4E4E7] bg-white rounded-lg p-5 flex flex-col gap-5 absolute left-170 top-4">
      <h3 className="text-[24px] font-semibold">Buy Jake a Coffee</h3>
      <div className="w-[337px] h-[40px] flex flex-row gap-3">
        {["1", "2", "5", "10"].map((el) => (
          <Button
            key={el}
            variant="outline"
            className={`w-[72px] bg-[#F4F4F5] ${
              formData.amount === el ? "border  border-[#18181B]" : ""
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

      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogTrigger asChild>
            <Button
              onClick={handleDonate}
              className="w-[580px]"
              disabled={
                loading ||
                !formData.amount ||
                !formData.socialURLOrBuyMeACoffee ||
                !formData.specialMessage
              }>
              {loading ? "Uploading..." : "Save changes"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="pl-23 text-[30px]">
                Scan QR code
              </DialogTitle>
              <DialogDescription className="pl-10 ">
                Scan the QR code to complete your donation
              </DialogDescription>
            </DialogHeader>
            <div className="pl-28">{qr && <img src={qr} />}</div>
            <DialogFooter>
              <DialogClose asChild></DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
