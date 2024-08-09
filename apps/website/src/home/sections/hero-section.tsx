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
interface Props {}

const HeroSection: React.FC<Props> = () => {
  const resumeState = useAppSelector((state) => state.home);
  const {editMode,setEditMode} = useContext(EditContext);
  if (
    !resumeState.resume ||
    resumeState.loading ||
    !resumeState.resume?.fullName ||
    !resumeState.resume.tagline ||
    !resumeState.resume.description
  ) {
    return null;
  }

  const { user, fullName, tagline, description } = resumeState.resume;

  const [initialValue, setNewDescription] = useState(``);
  const [newName, setNewName] = useState(``);
  const [newTagLine, setNewTagLine] = useState(``);
  const [showForm, setShowForm] = useState(false);
  const [socialIconsVisibility, setSocialIconsVisibility] = useState(false);

  return (
    <>
      <ContactUsFormComponent
        visibility={showForm}
        email={user.email}
        toggleFormVisibility={() => setShowForm((s) => !s)}
      />
      <EditSocialPlatformsComponent
        visibility={socialIconsVisibility}
        togglSocialIconsVisibility={() => setSocialIconsVisibility((s) => !s)}
      />
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
          className="col-span-1 max-w-sm mx-auto sm:col-span-3 sm:order-2 md:max-w-3xl lg:col-span-4 lg:order-3 "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
        <AnimatedProfilePicComponent profilePic={user.picture}/>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="col-span-1 dark:text-white text-3xl  flex gap-7 justify-center sm:items-end items-center sm:col-span-1 sm:order-1 sm:flex-col lg:col-span-1 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
        {
          resumeState.resume.socialPlatforms.map((platform)=>{
            const Icon = getIconByName(platform.name);
            return <Icon/>
          })
        }
          {
            editMode&& <TbEditCircle   onClick={()=>setSocialIconsVisibility(true)}          className="text-indigo-500"/>
          }
        </motion.div>

        {/* Content */}
        <motion.div
          className="col-span-1  max-w-md sm:col-span-5 sm:order-3 sm:max-w-2xl lg:col-span-7 lg:order-2 mx-auto w-full gap-4 "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <EditableWrapper
            className="font-bold text-4xl w-full md:text-5xl lg:text-6xl text-white"
            initialValue={fullName}
            onChange={(newVal) => setNewName(newVal)}
          >
            <h1>{fullName}</h1>
          </EditableWrapper>
          <div className="flex items-center gap-4 w-full flex-nowrap lg:mb-4">
            <span className="w-full h-1 bg-[#4f46e5]"></span>
            <EditableWrapper
              className="inline text-nowrap text-white font-semibold"
              initialValue={tagline}
              onChange={(newVal) => setNewTagLine(newVal)}
            >
              <span>{tagline}</span>
            </EditableWrapper>
          </div>
          <EditableWrapper
            className="text-lg w-full   md:text-xl text-slate-300"
            initialValue={description}
            onChange={(newVal) => setNewDescription(newVal)}
          >
            <p>{description}</p>
          </EditableWrapper>
          <br />
          <button
            className="relative inline-block font-medium group py-3 px-8"
            onClick={() => setShowForm(true)}
          >
            <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border border-indigo-600 group-hover:bg-indigo-50"></span>
            <span className="relative text-indigo-600 flex gap-4 items-center">
              Say Hello <FaShareAlt />
            </span>
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default HeroSection;
