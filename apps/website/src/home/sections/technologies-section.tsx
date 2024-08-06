import React from "react";

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

  return (
    <div className="flex flex-col gap-16">
      <div className="container mx-auto">
      <h1 className="text-5xl text-white font-bold leading-tight">
        Developer Tools<br />
        I have worked with
      </h1>
      </div>
      <InfiniteScroll
        scrollDirection="animate-infinite-scroll-r-to-l"
        className="h-14 w-screen"
      >
        {frontendLogos.map((source, idx) => (
          <img
            key={idx}
            src={source}
            alt=""
            className="max-w-none hover:scale-95 hover:transition-transform"
          />
        ))}
      </InfiniteScroll>
      <InfiniteScroll
        scrollDirection="animate-infinite-scroll-l-to-r"
        className="h-14 w-screen "
      >
        {backendLogos.map((source, idx) => (
          <img
            key={idx}
            src={source}
            alt=""
            className="max-w-none hover:scale-95 hover:transition-transform"
          />
        ))}
      </InfiniteScroll>
      <InfiniteScroll
        scrollDirection="animate-infinite-scroll-r-to-l"
        className="h-14 w-screen"
      >
        {toolsLogos.map((source, idx) => (
          <img
            key={idx}
            src={source}
            alt=""
            className="max-w-none hover:scale-95 hover:transition-transform"
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default TechnologiesSection;
