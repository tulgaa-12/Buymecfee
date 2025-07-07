import { Buttoncontainer } from "../_components/Butttoncontainer";
import { DefaultHeader } from "../_components/DefaultHeader";
import { Explorecreators } from "./Explorecreators";

const ExploreHome = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-20">
      <DefaultHeader />
      <div className="w-screen  flex flex-row justify-around">
        <Buttoncontainer />
        <Explorecreators />
      </div>
    </div>
  );
};

export default ExploreHome;
