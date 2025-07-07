"use client";

import { useParams } from "next/navigation";
import { DefaultHeader } from "../../_components/DefaultHeader";
import { Donation } from "../Donation";

import { CoverImageUploader } from "../ImageAdd";
import { ProfilePut } from "../ProfilePut";

const ProfileHome = () => {
  return (
    <div className="h-screen  ">
      <DefaultHeader />
      <CoverImageUploader />
      <main className="h-full flex flex-row  gap-8  absolute top-[300px] 2xl:top-[500px] left-[100px] xl:left-[200px] 2xl:left-110 ">
        <ProfilePut />
        <Donation />
      </main>
    </div>
  );
};

export default ProfileHome;
