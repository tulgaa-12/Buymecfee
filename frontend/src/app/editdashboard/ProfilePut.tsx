"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { EditProfile } from "./EditProfile";
import { useParams } from "next/navigation";
import { ParamValue } from "next/dist/server/request/params";

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

export const ProfilePut = () => {
  // const params = useParams();
  // const id = params.id as string;
  const [pro, setPro] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    socialMediaURL: "",
    avatarImage: "",
  });

  // console.log("dqwofwhqoifw", id);

  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:8000/getAllProfiles`);
        console.log("res.data", res.data);
        setPro(res.data);
      } catch (err) {
        console.log(err, "err");
      }
    };
    fetch();
  }, []);

  return (
    <section className="w-[632px] mx-auto p-4 space-y-5">
      <div className="border border-[#E4E4E7] rounded-lg bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src={pro?.avatarImage}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <h2 className="text-xl font-bold">{pro?.user.username}</h2>
          </div>
          <EditProfile />
        </div>
        <div className="h-[33px]">
          <div className="bg-[#F4F4F5] border-[1px]"></div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">About {pro?.user.username}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {pro?.about || "No description added yet."}
          </p>
        </div>
      </div>

      <div className="border border-[#E4E4E7] rounded-lg bg-white p-5">
        <h3 className="font-semibold mb-2">Social media URL</h3>
        <a
          href={pro?.socialMediaURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 underline break-words"
        >
          {pro?.socialMediaURL || "Not provided"}
        </a>
      </div>

      <div className="border border-[#E4E4E7] rounded-lg bg-white p-5">
        <h3 className="font-semibold mb-2"> Recent Supporters</h3>
        <div className="border border-gray-100 rounded-lg py-6 flex flex-col items-center ">
          <span className="text-2xl">🖤</span>
          <p className="mt-2 text-sm font-semibold text-center">
            Be the first one to support Jake {pro?.user.username}
          </p>
        </div>
      </div>
    </section>
  );
};
