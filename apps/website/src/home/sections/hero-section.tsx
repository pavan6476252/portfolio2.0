import React from "react";
import profilePic from "../../assets/profile-86291311.jpg";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaShareAlt,
  FaTwitter,
} from "react-icons/fa";

interface Props {}

const HeroSection: React.FC<Props> = () => {
  return (
    <div className="container max-w-6xl min-h-screen mx-auto grid grid-cols-7 md:grid-cols-7 lg:grid-cols-11 gap-4">
      <div className="text-white text-2xl col-span-1 flex flex-col justify-center  gap-8 items-center md:items-start">
        <FaInstagram />
        <FaTwitter />
        <FaGithub />
        <FaLinkedinIn />
      </div>
      <div className="  col-span-4 md:col-span-5 lg:col-span-6 max-w-xl flex flex-col justify-center items-start gap-4">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white">
          Pavan Kumar
        </h1>
        <div className="flex items-center gap-4 w-full  flex-nowrap">
          <span className="w-full h-1 bg-[#4f46e5]"></span>
          <span className="inline text-nowrap text-white font-semibold">
            MERN and App Developer
          </span>
        </div>

        <p className="text-lg md:text-xl text-slate-300">
          I'm a skilled software developer with experience in Android, web
          development (MERN Stack), and Flutter. I'm passionate about learning
          new technologies and creating high-quality applications that meet
          clients' needs. With my expertise and dedication to excellence, I'm a
          valuable asset to any team or project.
        </p>
        <br />
        <button className="relative inline-block font-medium group py-3 px-8 ">
          <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border border-indigo-600 group-hover:bg-indigo-50"></span>
          <span className="relative text-indigo-600 flex gap-4 items-center ">
            
            Say Hello <FaShareAlt />
          </span>
        </button>
      </div>
      <div className=" col-span-5 md:col-span-2 lg:col-span-4 flex justify-center items-center">
        <img
          src={profilePic}
          className="animate-border-animation  border-[8px] border-[#4f46e5] w-full aspect-square "
          alt="Profile Picture"
        />
      </div>
    </div>
  );
};

export default HeroSection;
