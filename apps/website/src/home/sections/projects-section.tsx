import React from "react";
import CardLayout from "../../components/card-layout";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";
import { gql, useQuery } from "@apollo/client";
import LoadingSpinner from "../../components/loading-spinner";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/PavanKumarLogo.svg";
import { useAppSelector } from "../../store/store";
import { FaGit, FaGithub } from "react-icons/fa";

function ProjectsSection() {
  const projects = useAppSelector((s) => s.home.projects);
  if (!projects || projects.length <= 0) {
    return null;
  }
  const colors = [
    "#146ef5",
    "#ff6b00",
    "#ed52cb",
    "#ffae13",
    "#ee1d36",
    "#00d722",
    "#7a3dff",
  ];
  console.log(projects);

  return (
    <div className="dark:text-white">
      <br />
      <br />
      <div className="container mx-auto">
        <h1 className="text-5xl text-right dark:text-white font-bold leading-tight mb-12">
          My Projects
        </h1>
      </div>

      <div className="flex gap-8 overflow-x-scroll no-scrollbar ">
        {projects.map((project, idx) => (
          <CardLayout
            key={project.id}
            className={`${idx === 0 && "ml-20"} ${
              idx === projects.length - 1 && "mr-20"
            } relative min-w-[400px] text-white w-[400px] aspect-[7/9] transition duration-300 my-auto flex flex-col`}
            style={{
              borderColor: colors[idx % colors.length],
            }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.backgroundColor =
                colors[idx % colors.length];
              e.currentTarget.style.boxShadow = `0px 0px 155px ${
                colors[idx % colors.length]
              }`;
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = `0px 0px 0px ${
                colors[idx % colors.length]
              }`;
            }}
          >
            <Link to={`/projects/${project.slug}`}>
              <SpeadedRadialGradient className="" />
              <div className="flex flex-col justify-between  ">
                <img
                  src={project?.bannerImg || logo}
                  alt=""
                  className="w-full h-auto  aspect-video object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex flex-col items-start">
                    <h4 className="text-lg text-left font-bold mb-2">
                      {project.metaTitle}
                    </h4>
                    <p className="text-left">{project.metaDescription}</p>
                  </div>

                  <div className="flex flex-wrap mt-4">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-800 text-white px-2 py-1 rounded mr-2 mb-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={project.projectLink}
                    className="group absolute bottom-5 right-5 flex items-center gap-2 text-blue-500"
                  >
                    View Project <FaGithub />
                  </Link>
                </div>
              </div>
            </Link>
          </CardLayout>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;
