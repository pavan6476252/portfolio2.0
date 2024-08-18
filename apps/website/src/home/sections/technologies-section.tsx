import React, { useContext, useState } from "react";

import InfiniteScroll from "../../components/infinite-scroll";
//frontend
import flutterLogo from "../../assets/logos/frontend/flutter.svg";
import blocLogo from "../../assets/logos/frontend/bloc.png";
import cssLogo from "../../assets/logos/frontend/css-3.svg";
import htmlLogo from "../../assets/logos/frontend/html-1.svg";
import jsLogo from "../../assets/logos/frontend/logo-javascript.svg";
import reactLogo from "../../assets/logos/frontend/react-2.svg";
import reduxLogo from "../../assets/logos/frontend/redux.svg";
import tailwindLogo from "../../assets/logos/frontend/tailwind-css-wordmark.svg";
//backend
import apolloLogo from "../../assets/logos/backend/apollo-graphql-1.svg";
import expressLogo from "../../assets/logos/backend/express-109.svg";
import graphqlLogo from "../../assets/logos/backend/graphql-logo-2.svg";
import jwtLogo from "../../assets/logos/backend/jwtio-json-web-token.svg";
import mongodbLogo from "../../assets/logos/backend/mongodb-icon-2.svg";
import nestjsLogo from "../../assets/logos/backend/nestjs.svg";
import postgressLogo from "../../assets/logos/backend/postgresql.svg";
import typeormLogo from "../../assets/logos/backend/typeorm.png";

//tools
import nxLogo from "../../assets/logos/tools/nx.svg";
import dockerLogo from "../../assets/logos/tools/docker-3.svg";
import firebaseLogo from "../../assets/logos/tools/firebase-2.svg";
import githubLogo from "../../assets/logos/tools/github-2.svg";
import jenkinsLogo from "../../assets/logos/tools/jenkins-1.svg";
import kubernetesLogo from "../../assets/logos/tools/kubernets.svg";
import linuxLogo from "../../assets/logos/tools/linux.svg";
import microsoftAzureLogo from "../../assets/logos/tools/microsoft-azure.svg";
import windowsLogo from "../../assets/logos/tools/microsoft-windows-22.svg";
import EditContext from "../../context/edit-context";
import { useAppSelector } from "../../store/store";
import DeveloperToolsEditComponent from "../components/developer-tools.edit.component";
import { getIconByName, groupSkillsByType } from "../../utils/icons.mapper";
import { ISkill } from "../../store/dtos/resume-profile.dto";

function TechnologiesSection() {
  const frontendLogos = [
    flutterLogo,
    blocLogo,
    cssLogo,
    htmlLogo,
    jsLogo,
    reactLogo,
    reduxLogo,
    tailwindLogo,
  ];

  const backendLogos = [
    apolloLogo,
    expressLogo,
    graphqlLogo,
    jwtLogo,
    mongodbLogo,
    nestjsLogo,
    postgressLogo,
    typeormLogo,
  ];

  const toolsLogos = [
    nxLogo,
    dockerLogo,
    firebaseLogo,
    githubLogo,
    jenkinsLogo,
    kubernetesLogo,
    linuxLogo,
    microsoftAzureLogo,
    windowsLogo,
  ];

  const resumeState = useAppSelector((state) => state.home);
  const { editMode } = useContext(EditContext);

  const [visibility, setVisibility] = useState(false);
  const togglePopupPanelVisibility = () => {
    setVisibility((s) => !s);
  };

  if (!resumeState.resume || resumeState.loading) {
    return null;
  }

  const { frontend, backend, other } = groupSkillsByType(
    resumeState.resume.developerTools || []
  );

  const renderSkils = (skill: ISkill, index: number) => {
    return (
      <div
        key={index}
        className={`p-2 flex items-center gap-5 cursor-pointer 
text-white  hover:scale-95
`}
      >
        {getIconByName(
          skill.name,
          55,
          "hover:shadow-lg text-shadow-lg hover:shadow-indigo-500 duration-300 ease-in-out"
        )}

        <span className="text-lg text-nowrap text-center font-semibold text-shadow-lg hover:shadow-indigo-500">
          {skill.name}
        </span>
      </div>
    );
  };
  return (
    <>
      <DeveloperToolsEditComponent
        togglSocialIconsVisibility={togglePopupPanelVisibility}
        visibility={visibility}
      />
      {editMode && (
        <>
          <br />
        </>
      )}
      <div className="flex flex-col gap-16">
        <div className="container mx-auto">
          {(editMode || resumeState.resume.developerTools.length > 0) && (
            <div className="flex justify-between  items-center container mx-auto mt-10">
              <h1 className="text-5xl text-white font-bold leading-tight">
                Developer Tools
                <br />I have worked with
              </h1>
              {editMode && (
                <button
                  className="relative h-min inline-block font-medium group py-3 px-8"
                  onClick={togglePopupPanelVisibility}
                >
                  <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-red-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                  <span className="absolute inset-0 w-full h-full bg-white border border-red-600 group-hover:bg-indigo-50"></span>
                  <span className="relative flex gap-4 items-center">Edit</span>
                </button>
              )}
            </div>
          )}
        </div>
        {resumeState.resume.developerTools.length > 0 && (
          <>
            <InfiniteScroll
              scrollDirection="animate-infinite-scroll-r-to-l"
              className=" w-screen"
            >
              {frontend.map(renderSkils)}
            </InfiniteScroll>
            <InfiniteScroll
              scrollDirection="animate-infinite-scroll-l-to-r"
              className="h-14 w-screen "
            >
              {backend.map(renderSkils)}
            </InfiniteScroll>
            <InfiniteScroll
              scrollDirection="animate-infinite-scroll-r-to-l"
              className="h-14 w-screen"
            >
              {other.map(renderSkils)}
            </InfiniteScroll>
          </>
        )}
        {editMode && (
          <>
            <hr />
          </>
        )}
      </div>
    </>
  );
}

export default TechnologiesSection;
