import { Frame } from "./Frame";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <Frame />
      <div className="w-1/2 h-screen flex items-center justify-center ">
        {children}
      </div>
    </div>
  );
}
