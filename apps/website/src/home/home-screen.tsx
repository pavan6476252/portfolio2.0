import React, { useEffect } from "react";
import NavBar from "../components/navbar";
import ProjectsSection from "./sections/projects-section";
import BlogsSection from "./sections/blogs-section";
import HeroSection from "./sections/hero-section";
import TechnologiesSection from "./sections/technologies-section";
import MyAbilitiesSection from "./sections/my-abilities-section";
import MakeItYoursComponent from "./sections/make-it-yours-component";
import FooterSection from "./sections/footer-section";
import IntroSection from "./sections/intro-section";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/store";
import { refreshToken } from "../store/slice/authSlice";

function HomeScreen() {
 
  return (
    <div className=" bg-[#080808] w-full overflow-x-hidden">
      <NavBar />
      <br />
      <HeroSection />
      <IntroSection />
      <br />
      <br />
      <br />
      <br />
      <MyAbilitiesSection />
      <br />
      <br />
      <TechnologiesSection />
      <br />
      <br />
      <br />
      <ProjectsSection />
      <BlogsSection />
      <MakeItYoursComponent />
      <FooterSection /> <br />
    </div>
  );
}

export default HomeScreen;
