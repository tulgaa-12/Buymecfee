import { DefaultHeader } from "../_components/DefaultHeader";
import { BuyCoffee } from "./BuyCoffee";
import { CoverImageUploader } from "./ImageAdd";
import { ProfilePut } from "./ProfilePut";

const ProfileHome = () => {
  return (
    <div className="h-screen  bg-gray-50 ">
      <DefaultHeader />
      <CoverImageUploader />
      <main className=" max-w-5xl h-full flex flex-row justify-center  gap-8  absolute top-[270px] left-[100px] xl:left-[200px] ">
        <ProfilePut />
        <BuyCoffee />
      </main>
    </div>
  );
};

export default ProfileHome;
