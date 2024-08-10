import React, { useContext, useState } from "react";
import profilePic from "../../assets/profile-86291311.jpg";
import {
  FaEdit,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaShareAlt,
  FaTwitter,
} from "react-icons/fa";
import { TbEditCircle } from "react-icons/tb";
import { motion } from "framer-motion";
import EditableWrapper from "../../components/editable-wrapper";
import ContactUsFormComponent from "../components/contact-us.component";
import { useAppSelector } from "../../store/store";
import EditContext from "../../context/edit-context";
import SocialPlatformsEdit from "../components/social-platforms.edit";
import EditSocialPlatformsComponent from "../components/social-platforms.edit";
import { getIconByName } from "../../utils/social-icons.mapper";
import AnimatedProfilePicComponent from "../components/animated-profilepick.component";
import HeroSectionContentCmoponent from "../components/hero-section-content.component";
import HeroSectionSocialIconsComponent from "../components/hero-section-social-icon.component";
interface Props {}

const HeroSection: React.FC<Props> = () => {
  const resumeState = useAppSelector((state) => state.home);
  if (
    !resumeState.resume ||
    resumeState.loading ||
    !resumeState.resume?.fullName ||
    !resumeState.resume.tagline ||
    !resumeState.resume.description
  ) {
    return null;
  }

  const { user } = resumeState.resume;

  return (
    <>
      <br />
      <br />
      <motion.div
        className="container  max-w-6xl  min-h-screen mx-auto grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-12  lg:place-items-center gap-4 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Profile Picture */}
        <motion.div
          className="col-span-1 max-w-sm  mx-auto sm:col-span-3 sm:order-2   lg:col-span-4 lg:order-3 "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <AnimatedProfilePicComponent profilePic={user.picture} />
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="col-span-1 dark:text-white text-3xl  flex gap-7 justify-center sm:items-end items-center sm:col-span-1 sm:order-1 sm:flex-col lg:col-span-1 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <HeroSectionSocialIconsComponent />
        </motion.div>

        {/* Content */}
        <motion.div
          className="col-span-1  max-w-md sm:col-span-5 sm:order-3 sm:max-w-2xl lg:col-span-7 lg:order-2 mx-auto w-full gap-4 "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <HeroSectionContentCmoponent />
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeroSection;
