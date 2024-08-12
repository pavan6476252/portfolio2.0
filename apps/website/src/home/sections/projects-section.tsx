import React from "react";
import CardLayout from "../../components/card-layout";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";
import { gql, useQuery } from "@apollo/client";
import LoadingSpinner from "../../components/loading-spinner";
import { Link } from "react-router-dom";
import logo from '../../assets/logos/PavanKumarLogo.svg'
const FETCH_ACTIVE_PROJECTS = gql`
  query {
    getCurrentUserActiveProjects {
      id
      author {
        picture
        username
      }
      bannerImg
      title
      projectLink
      startDate
      endDate
      techStack
      keypoints
      desc
      isActive
    }
  }
`;

function ProjectsSection() {
  const { loading, error, data } = useQuery<{
    getCurrentUserActiveProjects: IProjectResposne[];
  }>(FETCH_ACTIVE_PROJECTS);

  const colors = [
    "#146ef5",
    "#ff6b00",
    "#ed52cb",
    "#ffae13",
    "#ee1d36",
    "#00d722",
    "#7a3dff",
  ];

  if (loading) {
    return (
      <div className="w-full h-2 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (error || data?.getCurrentUserActiveProjects.length === 0) {
    console.log(error);
    return null;
  }
  
  return (
    <div className="">
    <div className="container mx-auto">
      
      <h1 className="text-5xl text-right text-white font-bold leading-tight mb-12">
        My Projects
      </h1>
      </div>

      <div className="flex gap-8 overflow-x-scroll no-scrollbar">
        {data?.getCurrentUserActiveProjects.map((project, idx) => (
          <CardLayout
            key={project.id}
            className={`${idx===0 &&"ml-20"} ${idx===data.getCurrentUserActiveProjects.length-1&&'mr-20'} relative min-w-[400px] text-white w-[400px] aspect-[8/9] transition duration-300 my-auto`}
            style={{
              borderColor: colors[idx % colors.length],
            }}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.backgroundColor = colors[idx % colors.length];
              e.currentTarget.style.boxShadow = `0px 0px 155px ${colors[idx % colors.length]} `;
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = `0px 0px 0px ${colors[idx % colors.length]} `;
            }}
          >
            <SpeadedRadialGradient className="" />
            <div className="flex flex-col justify-between h-full p-4">
              <div className="flex items-center mb-4">
                <img src={project.author.picture || logo} alt="" className="h-8 mr-4 rounded-full" />
                <span className="font-bold text-lg">{project.title}</span>
              </div>

              <div className="flex flex-col items-start">
                <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
                <p className="text-lg">{project.desc}</p>
              </div>

              <div className="flex flex-wrap mt-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="bg-gray-800 text-white px-2 py-1 rounded mr-2 mb-2">
                    {tech}
                  </span>
                ))}
              </div>

              <Link to={`/projects/${project.id}`} className="group text-blue-500 mt-4">
                Read story <span>&rarr;</span>
              </Link>
            </div>
          </CardLayout>
        ))}
      </div>
    </div>
  );
}

export default ProjectsSection;

 interface IProjectResposne {
  id: string;
  title: string;
  author: IUser;
  projectLink: string;
  bannerImg: string;
  startDate: Date;
  endDate: Date;
  techStack: string[];
  desc: string;
  keypoints: string[];
  isActive: boolean;
}

 interface IUser {
  username: string;
  picture?: string;
}
