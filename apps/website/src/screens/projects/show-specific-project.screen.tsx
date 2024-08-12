import React from "react";
import CardLayout from "../../components/card-layout";
import SpeadedRadialGradient from "../../components/animation/spreaded-radial-gradient";
import { gql, useQuery } from "@apollo/client";
import LoadingSpinner from "../../components/loading-spinner";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logos/PavanKumarLogo.svg";

const FETCH_CURRENT_PROJECTS = gql`
  query getPostById($id: Float!) {
    getProjectById(id: $id) {
      id
      author {
        picture
        username
        email
        id
        role
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

function ShowSpecificProjectScreen() {
  const params = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ getProjectById: IProjectResposne }>(
    FETCH_CURRENT_PROJECTS,
    {
      variables: {
        id: Number(params.id),
      },
    }
  );

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
  if (error || !data) {
    console.log(error);
    return null;
  }

  const project = data.getProjectById;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={data.getProjectById.bannerImg}
          alt={data.getProjectById.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{data.getProjectById.title}</h1>
          <p className="text-lg mb-4">{data.getProjectById.desc}</p>
  
          <div className="flex items-center mb-4">
            <img
              src={data.getProjectById.author.picture}
              alt={data.getProjectById.author.username}
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <p className="text-sm font-medium">{data.getProjectById.author.username}</p>
              <p className="text-sm text-gray-400">{data.getProjectById.author.email}</p>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Project Link:</h3>
              <a
                href={data.getProjectById.projectLink}
                className="text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.getProjectById.projectLink}
              </a>
            </div>
          </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Date:</h3>
              <p>
                {new Date(data.getProjectById.startDate).toLocaleDateString()} -{" "}
                {new Date(data.getProjectById.endDate).toLocaleDateString()}
              </p>
            </div>
  <br />
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Tech Stack:</h3>
            <div className="flex flex-wrap">
              {data.getProjectById.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
  
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Key Points:</h3>
            <ul className="list-disc list-inside">
              {data.getProjectById.keypoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
  
           
        </div>
      </div>
    </div>
  );
  
}

export default ShowSpecificProjectScreen;

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
  email: string;
  id: number;
  role: string;
}
