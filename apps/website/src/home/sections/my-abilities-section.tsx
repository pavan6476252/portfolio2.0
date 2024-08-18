import React, { useContext, useState } from "react";
import mobileAppLogo from "../../assets/logos/app-development-removebg-preview.png";
import backendLogo from "../../assets/logos/34877848-removebg-preview.png";
import devopsLogo from "../../assets/logos/devops-2.svg";
import defaultLogo from "../../assets/logos/PavanKumarLogo.svg";
import CardLayout from "../../components/card-layout";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";
import { useAppSelector } from "../../store/store";
import EditContext from "../../context/edit-context";
import PopupComponent from "../../components/popup-component";
import EditAbilitiesComponent, {
  getLogoPathFromType,
} from "../components/abilities.edit";

function MyAbilitiesSection() {
  const resumeState = useAppSelector((state) => state.home);
  const { editMode } = useContext(EditContext);

  const [visibility, setVisibility] = useState(false);
  const togglePopupPanelVisibility = () => {
    setVisibility((s) => !s);
  };

  if (!resumeState.resume || resumeState.loading) {
    return null;
  }

  const abilities = resumeState.resume.abilities || [];

  return (
    <>
      {editMode && (
        <>
          <hr />
          <br />
          <div className="flex justify-between container mx-auto mb-5">
            <h2 className="dark:text-white text-5xl font-bold">My Abilities</h2>
            <button
              className="relative inline-block font-medium group py-3 px-8"
              onClick={togglePopupPanelVisibility}
            >
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-red-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-red-600 group-hover:bg-indigo-50"></span>
              <span className="relative flex gap-4 items-center">Edit</span>
            </button>
          </div>
         
        </>
      )}

      <div className="container mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {editMode && (
          <EditAbilitiesComponent
            toggleSocialIconsVisibility={togglePopupPanelVisibility}
            visibility={visibility}
          />
        )}
        {abilities.map((data, idx) => (
          <CardLayout
            key={idx}
            className="flex flex-col justify-between "
          >
            
            <SpeadedRadialGradient />
            <img
              src={getLogoPathFromType(data.type)}
              alt=""
              className="w-1/2 mx-auto flex-1"
            />
            <div className="p-2">
              <h2 className="font-bold text-slate-100 text-2xl mb-2">
                {data.title}
              </h2>
              <p className="font-thin text-slate-200">{data.description}</p>
            </div>
          </CardLayout>
        ))}
      </div>
      {editMode && (
        <>
          <br />
          <hr />
          </>)}
    </>
  );
}

export default MyAbilitiesSection;
