import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import LoadingSpinner from "../../components/loading-spinner";
import {
  ICreateProjectDto,
  ICreateProjectResponse,
} from "../../dto/project.dto";
import MarkdownEditor from "@uiw/react-markdown-editor";

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
    $markdownContent: String!
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
    <div className="min-h-screen flex items-center justify-center dark:text-white">
      <div className="w-full  p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 ">Add New Project</h1>

        {!loading && (
          <div className="flex justify-center z-20 mb-6 fixed top-20 left-0 right-0">
            <LoadingSpinner />
          </div>
        )}

        {error && <div className="text-red-500 mb-4">{error.message}</div>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium ">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={project.metaTitle}
              onChange={handleChange}
              placeholder="Meta Title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium ">
              Meta Description
            </label>
            <input
              type="text"
              name="metaDescription"
              value={project.metaDescription}
              onChange={handleChange}
              placeholder="Meta Description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Meta Keywords */}
          <div>
            <label className="block text-sm font-medium ">Meta Keywords</label>
            <input
              type="text"
              name="metaKeywords"
              value={project.metaKeywords.join(",")}
              onChange={(e) =>
                handleMetaKeywordsChange(e.target.value.split(","))
              }
              placeholder="Meta Keywords comma separated"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium ">Project Title</label>
            <input
              type="text"
              name="title"
              value={project.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Project Markdown */}
          {/* <div className="md:col-span-2">
            <label className="block text-sm font-medium ">
              Project Markdown
            </label>
            <textarea
              name="markdownContent"
              value={project.markdownContent}
              onChange={handleChange}
              placeholder="Project Markdown Content"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
              rows={4}
            />
          </div> */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium ">
              Project Markdown
            </label>
            <MarkdownEditor
              className="bg-gray-900 h-80 text-white p-4 w-full mt-2"
              value={project.markdownContent}
              onChange={(value) =>
                setProject({
                  ...project,
                  markdownContent: value,
                })
              }
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium ">Project Link</label>
            <input
              type="text"
              name="projectLink"
              value={project.projectLink}
              onChange={handleChange}
              placeholder="Project Link"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium ">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium ">End Date</label>
            <input
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Banner Image */}
          <div className="md:col-span-2">
            {project.bannerImgFile && (
              <img
                src={URL.createObjectURL(project.bannerImgFile)}
                alt="Banner"
                className="mb-4 max-h-40"
              />
            )}
            <label className="block text-sm font-medium ">Banner Image</label>
            <input
              type="file"
              name="bannerImgFile"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium ">Tech Stack</label>
            <input
              type="text"
              name="techStack"
              value={project.techStack.join(",")}
              onChange={(e) => handleTechStackChange(e.target.value.split(","))}
              placeholder="Tech Stack (comma separated)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Keypoints */}
          <div>
            <label className="block text-sm font-medium ">Keypoints</label>
            <input
              type="text"
              name="keypoints"
              value={project.keypoints.join(",")}
              onChange={(e) =>
                setProject({ ...project, keypoints: e.target.value.split(",") })
              }
              placeholder="Keypoints (comma separated)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-900 p-2"
            />
          </div>

          {/* Is Active */}
          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={project.isActive}
              onChange={(e) =>
                setProject({ ...project, isActive: e.target.checked })
              }
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm font-medium ">Is Active</label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddNewProjectScreen;
