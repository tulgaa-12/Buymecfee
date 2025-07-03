import Image from "next/image";
import SignUp from "./(auth)/signup/page";
import { Header } from "./(auth2)/Header";
import { Buttoncontainer } from "./_components/Butttoncontainer";
import { DefaultHeader } from "./_components/DefaultHeader";
import { Default } from "./_components/Default";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col gap-20">
      <DefaultHeader />
      <div className="w-screen  flex flex-row justify-around">
        <Buttoncontainer />
        <Default />
      </div>
    </div>
  );
}
