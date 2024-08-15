import React, { useState } from "react";
import {
  ApiError,
  graphQLMultipartRequest,
  graphQlRequest,
} from "../../store/api/gqlRequest";
import {
  ICreateProjectDto,
  ICreateProjectResponse,
} from "../../dto/project.dto";
import LoadingSpinner from "../../components/loading-spinner";
import { gql, useMutation } from "@apollo/client";
const CREATE_PROJECT_MUTATION = gql`
  mutation(
    $bannerImgFile: Upload
    $endDate: Date!
    $techStack: [String!]!
    $isActive: Boolean!
    $keypoints: [String!]!
    $projectLink: String!
    $startDate: Date!
    $title: String!
    $metaTitle: String!
    $metaDescription: String!
    $metaKeywords: [String!]!
    $markdownContent:String!
  ) {
    createProject(
      createProjectDto: {
        metaDescription: $metaDescription
        metaKeywords: $metaKeywords
        metaTitle: $metaTitle
        markdownContent: $markdownContent
        bannerImgFile: $bannerImgFile
        endDate: $endDate
        techStack: $techStack
        isActive: $isActive
        keypoints: $keypoints
        projectLink: $projectLink
        startDate: $startDate
        title: $title
      }
    ) {
      id
    }
  }
`;
const AdminAddNewProjectScreen: React.FC = () => {
  const [createProject, { data, error, loading }] = useMutation<
    ICreateProjectResponse,
    ICreateProjectDto
  >(CREATE_PROJECT_MUTATION);
  const [project, setProject] = useState<ICreateProjectDto>({
    metaDescription: "",
    metaKeywords: [],
    metaTitle: "",
    markdownContent: "",
    bannerImgFile: null,
    title: "",
    projectLink: "",
    startDate: "",
    endDate: "",
    techStack: [],

    keypoints: [],
    isActive: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject({
      ...project,
      bannerImgFile: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleTechStackChange = (techStack: string[]) => {
    setProject({ ...project, techStack });
  };
  const handleMetaKeywordsChange = (metaKeywords: string[]) => {
    setProject({ ...project, metaKeywords });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(project);
    // return ;
    try {
      const response = await createProject({
        variables: {
          ...project,
          bannerImgFile: project.bannerImgFile,
        },
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Project</h1>
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error.message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* META title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Title
          </label>
          <input
            type="text"
            name="metaTitle"
            value={project.metaTitle}
            onChange={handleChange}
            placeholder="MEta Title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <input
            type="text"
            name="metaDescription"
            value={project.metaDescription}
            onChange={handleChange}
            placeholder="Meta Descriptioin"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {/* MetaKeywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Keywords
          </label>
          <input
            type="text"
            name="metaKeywords"
            value={project.metaKeywords.join(",")}
            onChange={(e) =>
              handleMetaKeywordsChange(e.target.value.split(","))
            }
            placeholder="Meta Title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Markdown
          </label>
          <textarea
            name="markdownContent"
            value={project.markdownContent}
            onChange={handleChange}
            placeholder="Project Title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Project Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Link
          </label>
          <input
            type="text"
            name="projectLink"
            value={project.projectLink}
            onChange={handleChange}
            placeholder="Project Link"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={project.endDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Banner Image */}
        {project.bannerImgFile && (
          <img src={URL.createObjectURL(project.bannerImgFile)} />
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <input
            type="file"
            name="bannerImgFile"
            accept="image/png, image/gif, image/jpeg"
            // onChange={handleFileChange}
            onChange={({ target: { validity, files } }) => {
              if (validity.valid) {
                console.log(files);
                setProject({
                  ...project,
                  bannerImgFile: files ? files[0] : null,
                });
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tech Stack
          </label>
          <input
            type="text"
            name="techStack"
            value={project.techStack.join(",")}
            onChange={(e) => handleTechStackChange(e.target.value.split(","))}
            placeholder="Tech Stack (comma separated)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Keypoints */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Keypoints
          </label>
          <input
            type="text"
            name="keypoints"
            value={project.keypoints.join(",")}
            onChange={(e) =>
              setProject({ ...project, keypoints: e.target.value.split(",") })
            }
            placeholder="Keypoints (comma separated)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={project.isActive}
            onChange={(e) =>
              setProject({ ...project, isActive: e.target.checked })
            }
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm font-medium text-gray-700">
            Is Active
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddNewProjectScreen;
