"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ExternalLink, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Profile = {
  id: number;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
};

export const Explorecreators = () => {
  const [pro, setPro] = useState<Profile | null>(null);
  const [search, setSearch] = useState("");
  const [button, setButton] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:8000/getAllProfiles`);
        console.log("res.data", res.data);

        setUsers(res.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    fetch();
  }, []);

  const filteredCreators = users.filter((el) => {
    const name = el.name || "";
    const username = el.user.username || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      username.toLowerCase().includes(search.toLowerCase())
    );
  });

  console.log(users, "users");

  return (
    <div className="w-[957px] h-full flex flex-col justify-center gap-10 p-5 ">
      <h4 className="text-[20px] font-semibold ">Explore creators</h4>
      <Input
        placeholder="Search name "
        className="w-[243px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCreators.length === 0 ? (
        <div className="w-[500px] xl:w-[900px] flex flex-col justify-center items-center gap-5">
          <div className="w-[64px] h-[64px] flex justify-center items-center rounded-full bg-[#F4F4F5]">
            <User />
          </div>
          <p className="text-[16px] font-semibold">
            No creators have signed up yet
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {filteredCreators.map((el) => (
            <div
              key={el.id}
              className="shadow-md rounded-lg  border border-[#E4E4E7] p-8 flex flex-row gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-3">
                  <img
                    src={el.avatarImage}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <h4 className="text-[20px] font-semibold">
                    {el.user.username}
                  </h4>
                </div>
                <h4 className="text-[16px] font-semibold">
                  About {el.user.username}
                </h4>
                <div className="h-[80px] lg:w-[420px]">
                  <p className="text-[14px] font-normal">{el.about}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 pt-15">
                <h4 className="text-[20px] font-semibold">Social media URL</h4>
                <p className="text-[14px] w-[300px] font-normal">
                  {el.socialMediaURL}
                </p>
              </div>

              <Link href={`/editdashboard/${el.userId}`}>
                <Button
                  variant="outline"
                  className="bg-[#F4F4F5] absolute right-40 2xl:right-65">
                  View profile <ExternalLink />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
