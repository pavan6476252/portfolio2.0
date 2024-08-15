  import React, { useEffect, useState } from "react";
  import { useAppDispatch } from "../../store/store";
  import { graphQlRequest } from "../../store/api/gqlRequest";
  import { IProjectResposne } from "../../dto/project.dto";
  import { Link, useLocation } from "react-router-dom";
  import LoadingSpinner from "../../components/loading-spinner";
  import { gql, useQuery } from "@apollo/client";
  const GET_MY_PROJECTS = gql`
    query {
      getMyProjects {
        id
        bannerImg
        title
        projectLink
        startDate
        endDate
        techStack
        keypoints 
        isActive
      }
    }
  `;
  const AdminProjectsScreen: React.FC = () => {

    const { loading, error, data ,} = useQuery<{getMyProjects:IProjectResposne[]}>(GET_MY_PROJECTS);  if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    return (
      <div className="container mx-auto p-4 dark:text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">My Projects </h1>
          <Link
            to={"new"}
            className="px-3 py-2 bg-indigo-500 hover:bg-indigo-700"
          >
            New Project
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : data?.getMyProjects.length == 0 ? (
          <div className="text-slate-100">
            Oops not projects found . add your projects
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.getMyProjects.map((project) => (
              <div key={project.title} className="relative border rounded-lg p-4 shadow">
                <Link to={`edit/${project.id}`} className="absolute top-5 right-5 px-3 py-1 bg-indigo-500">Edit</Link>
                <img
                  src={project.bannerImg}
                  alt={project.title}
                  className="mb-4 w-full h-32 object-cover"
                />
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                
                <Link
                  to={project.projectLink.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Project Link
                </Link>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    Tech Stack: {project.techStack.join(", ")}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Key Points:</span>
                  <ul className="list-disc ml-4">
                    {project.keypoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  <span>{project.isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default AdminProjectsScreen;
