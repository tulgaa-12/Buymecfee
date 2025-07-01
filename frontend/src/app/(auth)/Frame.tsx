export const Frame = () => {
  return (
    <div className="w-1/2 h-screen bg-amber-400 flex items-center justify-center  ">
      <img src="Logo.jpg" className="absolute top-10 left-15" />
      <div className=" text-center flex flex-col items-center gap-5 justify-center">
        <img src="illustration.jpg" alt="" />
        <div className="min-w-[455px] px-6">
          <h1 className="font-bold text-[24px]">Fund your creative work</h1>
          <p className="text-center font-normal text-[16px]">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>
    </div>
  );
};
