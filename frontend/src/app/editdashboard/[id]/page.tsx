"use client";

import { useParams } from "next/navigation";
import { DefaultHeader } from "../../_components/DefaultHeader";
import { Donation } from "../Donation";

import { CoverImageUploader } from "../ImageAdd";
import { ProfilePut } from "../ProfilePut";

const ProfileHome = () => {
  const params = useParams();
  const userIds = params.id;

  const userId = Array.isArray(userIds) ? userIds[0] : userIds;
  return (
    <div className="h-screen  ">
      <DefaultHeader />
      <CoverImageUploader />
      <main className="h-full flex flex-row  gap-8  absolute top-[300px] 2xl:top-[500px] left-[50px] xl:left-[100px] 2xl:left-110 ">
        <ProfilePut userId={userId} />
        <Donation userId={userId} />
      </main>
    </div>
  );
};

export default ProfileHome;
