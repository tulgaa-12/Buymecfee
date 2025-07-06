import { Buttoncontainer } from "../_components/Butttoncontainer";
import { DefaultHeader } from "../_components/DefaultHeader";
import { ForgetPassword } from "./ForgetPassword";
import { Payment } from "./Payment";
import { ProfileSettings } from "./ProfileSettings";
import { Success } from "./Success";

const SettingsHome = () => {
  return (
    <div className="w-screen h-screen flex flex-col  ">
      <DefaultHeader />
      <div className=" flex flex-row  gap-10 lg:gap-20 xl:gap-50">
        <div className="pl-[80px] pt-[30px]">
          <Buttoncontainer />
        </div>
        <div className="w-[650px] h-full flex flex-col justify-center items-center  gap-10 pt-[35px]">
          <h3 className="text-[24px] font-semibold pr-130">My account</h3>
          <ProfileSettings />
          <ForgetPassword />
          <Payment />
          <Success />
        </div>
      </div>
    </div>
  );
};

export default SettingsHome;
