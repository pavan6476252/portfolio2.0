import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/loading-spinner";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { IProjectResposne } from "../../dto/project.dto";

const FETCH_CURRENT_PROJECTS = gql`
  query getBySlug($slug: String!) {
    getProjectBySlug(slug: $slug) {
      id
      author {
        id
        picture
        email
        username
      }
      bannerImg
      title
      projectLink
      startDate
      endDate
      techStack
      keypoints
      metaDescription
      markdownContent
    }
  }
`;

function ShowSpecificProjectScreen() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, error, data } = useQuery<{
    getProjectBySlug: IProjectResposne;
  }>(FETCH_CURRENT_PROJECTS, {
    variables: { slug },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-red-500 text-center">Error loading project data</div>
    );
  }

  const project = data.getProjectBySlug;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={project.bannerImg}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg mb-6">{project.metaDescription}</p>

          <div className="flex items-center mb-6">
            <img
              src={project.author?.picture}
              alt={project.author?.username}
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-medium">{project.author?.username}</p>
              <p className="text-sm text-gray-400">{project.author?.email}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Project Link:</h3>
            <a
              href={project.projectLink}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.projectLink}
            </a>
          </div>

          <div className="mt-4">
            {/* <div className="prose dark:prose-dark mt-2"> */}
            <MarkdownEditor.Markdown
              source={data?.getProjectBySlug?.markdownContent}
              className="p-2"
            />
            {/* </div> */}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Project Duration:</h3>
            <p>
              {new Date(project.startDate).toLocaleDateString()} -{" "}
              {new Date(project.endDate).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Tech Stack:</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-blue-700 text-white px-4 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Key Points:</h3>
            <ul className="list-disc list-inside">
              {project.keypoints.map((point, idx) => (
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
