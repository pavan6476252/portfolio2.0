import React, { useEffect, useState } from "react";
import {
  ApiError,
  graphQLMultipartRequest,
  graphQlRequest,
} from "../../store/api/gqlRequest";
import {
  ICreateProjectDto,
  ICreateProjectResponse,
  IProjectResposne,
  IUpdateProjectDto,
} from "../../dto/project.dto";
import LoadingSpinner from "../../components/loading-spinner";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
const FETCH_PROJECT_QUERY = gql`
  query getProjectById($id: Float!) {
    getProjectById(id: $id) {
      id
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

const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject(
    $id:Float!
    $bannerImgFile: Upload
    $title: String!
    $projectLink: String!
    $startDate: Date!
    $endDate: Date!
    $techStack: [String!]!
    $desc: String!
    $keypoints: [String!]!
    $isActive: Boolean!
  ) {
    updateProject(
      id:$id
      updateProjectDto: {
        bannerImgFile: $bannerImgFile
        title: $title
        projectLink: $projectLink
        startDate: $startDate
        endDate: $endDate
        techStack: $techStack
        desc: $desc
        keypoints: $keypoints
        isActive: $isActive
      }
    ) {
      id
    }
  }
`;

const AdminEditProjectScreen: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { data, loading: queryLoading, error: queryError } = useQuery<{
    getProjectById: IProjectResposne;
  }>(FETCH_PROJECT_QUERY, {
    variables: { id: Number(params.id) },
  });
  const [
    updateProject,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_PROJECT_MUTATION);

  const [project, setProject] = useState<IUpdateProjectDto>({
    id: "",
    bannerImgFile: null,
    title: "",
    projectLink: "",
    startDate: "",
    endDate: "",
    techStack: [],
    desc: "",
    keypoints: [],
    isActive: false,
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      setProject({
        id: data.getProjectById.id,
        bannerImgFile: null,
        bannerImg: data.getProjectById.bannerImg,
        title: data.getProjectById.title,
        projectLink: data.getProjectById.projectLink,
        // startDate: data.getProjectById.startDate
        //   ? data.getProjectById.startDate.toString()
        //   : undefined,
        // endDate: data.getProjectById.endDate
        //   ? data.getProjectById.endDate.toString()
        //   : undefined,
        startDate: data.getProjectById.startDate ? new Date(data.getProjectById.startDate).toISOString().split('T')[0] : undefined,
        endDate: data.getProjectById.endDate ? new Date(data.getProjectById.endDate).toISOString().split('T')[0] : undefined,
       
        techStack: data.getProjectById.techStack,
        desc: data.getProjectById.desc,
        keypoints: data.getProjectById.keypoints,
        isActive: data.getProjectById.isActive,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleTechStackChange = (techStack: string[]) => {
    setProject({ ...project, techStack });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProject({
        variables: {
          ...project,
          id:Number(params.id)
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // if (queryLoading) return <div>Loading...</div>;
  // if (queryError) return <div>Error: {queryError.message}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Project</h1>
      {queryLoading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {queryError && (
        <div className="text-red-500 mb-4">{queryError.message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        {project.bannerImg && <img src={project.bannerImg} />}
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
            value={project.techStack?.join(",") ?? ""}
            onChange={(e) => handleTechStackChange(e.target.value.split(","))}
            placeholder="Tech Stack (comma separated)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Description
          </label>
          <textarea
            name="desc"
            value={project.desc}
            onChange={handleChange}
            placeholder="Project Description"
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
            value={project.keypoints?.join(",")}
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

export default AdminEditProjectScreen;
