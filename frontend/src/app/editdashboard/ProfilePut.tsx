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

type ProfilePutProps = {
  userId: string | undefined;
};

type Donation = {
  id: number;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donorId: number;
  recipientId: number;
  createdAt: string;
  updatedAt: string;
  donor: {
    id: number;
    email: string;
    username: string;
    profile: {
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
    };
  };
};

export const ProfilePut = ({ userId }: ProfilePutProps) => {
  const [pro, setPro] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showMore, setShowMore] = useState<Donation[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    socialMediaURL: "",
    avatarImage: "",
  });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setCurrentUserId(storedId);

    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:8000/profiles/${userId}`);
        setPro(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [userId]);

  useEffect(() => {
    const fetch = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/don/donation/rec/${userId}`
        );
        setShowMore(res.data);
      } catch (error) {
        console.error("Error fetching donations", error);
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
          {currentUserId === String(pro?.userId) && <EditProfile />}
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
          className="text-sm text-blue-600 underline break-words">
          {pro?.socialMediaURL || "Not provided"}
        </a>
      </div>

      <div className="border border-[#E4E4E7] rounded-lg bg-white p-5">
        {showMore.length === 0 ? (
          <div>
            <h3 className="font-semibold mb-2"> Recent Supporters</h3>
            <div className="border border-gray-100 rounded-lg py-6 flex flex-col items-center ">
              <span className="text-2xl">🖤</span>
              <p className="mt-2 text-sm font-semibold text-center">
                Be the first one to support {pro?.user.username}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[16px] font-semibold">Recent Supporters</p>
            {showMore.map((el) => (
              <div
                key={el.id}
                className="flex flex-col justify-center gap-5 p-5">
                <div className="flex flex-row gap-3">
                  <img
                    src={el.donor.profile.avatarImage}
                    className="w-[40px] h-[40px] rounded-full object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-medium">
                      {el.donor.username} bought ${el.amount} coffee
                    </p>
                    <p className="text-[14px] font-medium">
                      {el.specialMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
