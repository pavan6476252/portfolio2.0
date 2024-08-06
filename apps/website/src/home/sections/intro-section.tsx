import React from "react";
interface Props {}

const IntroSection: React.FC<Props> = () => {
  return (
    <div className=" font-workSans  flex flex-col gap-10 justify-center items-center ">
      <h1 className="text-center font-bold text-8xl text-white">
        A platform <br /> designed for growth
      </h1>

      <p className="text-center text-xl text-slate-300 max-w-3xl">
        I'm an experienced software developer who enjoys working with Android,
        web development using MERN Stack, and frameworks like React and Flutter.
        I'm passionate about staying up-to-date with the latest technologies and
        learning new things. My expertise in various areas of development makes
        me a valuable asset to any team or project.
      </p>

      <button className="relative inline-block font-medium group py-3 px-8 ">
        <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border border-indigo-600 group-hover:bg-indigo-50"></span>
        <span className="relative text-indigo-600 ">Get's Started</span>
      </button>
    </div>
  );
};

export default IntroSection;
