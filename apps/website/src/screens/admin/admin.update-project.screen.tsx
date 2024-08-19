import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { IBlogResposne, IUpdateBlogDto } from "../../dto/blogs.dto";
import { IProjectResposne, IUpdateProjectDto } from "../../dto/project.dto";

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($id: Int!) {
    getProjectById(id: $id) {
      id
      bannerImg
      title
      projectLink
      startDate
      endDate
      techStack
      keypoints
      isActive
      metaTitle
      metaDescription
      metaKeywords
      markdownContent
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($id: Int!, $updateProjectDto: UpdateProjectDto!) {
    updateProject(id: $id, updateProjectDto: $updateProjectDto) {
      id
      bannerImg
      title
      projectLink
      startDate
      endDate
      techStack
      keypoints
      isActive
      metaTitle
      metaDescription
      metaKeywords
      markdownContent
    }
  }
`;

const AdminUpdateProjectScreen = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <h1>Id not passed</h1>;
  }

  const [formData, setFormData] = useState<IUpdateProjectDto>({
    bannerImg: undefined,
    bannerImgFile: null,
    endDate: undefined,
    isActive: undefined,
    keypoints: [],
    projectLink: undefined,
    startDate: undefined,
    techStack: [],
    title: undefined,
    id: undefined,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: [],
    markdownContent: "",
  });

  const { loading, error, data } = useQuery<{
    getProjectById: IProjectResposne;
  }>(GET_PROJECT_BY_ID, {
    variables: { id: parseInt(id, 10) },
  });

  const [updateProject] = useMutation<
    { updateProject: { id: number } },
    { id: number; updateProjectDto: IUpdateProjectDto }
  >(UPDATE_PROJECT);

  useEffect(() => {
    if (data) {
      console.log(data);
      const { getProjectById } = data;
      setFormData({
        bannerImg: getProjectById.bannerImg,
        id: getProjectById.id,
        keypoints: getProjectById.keypoints ?? [],
        isActive: getProjectById.isActive ?? true,
        metaTitle: getProjectById.metaTitle ?? "",
        metaDescription: getProjectById.metaDescription ?? "",
        metaKeywords: getProjectById.metaKeywords ?? [],
        markdownContent: getProjectById.markdownContent ?? "",
        startDate: getProjectById.startDate
          ? new Date(getProjectById.startDate).toISOString().split("T")[0]
          : undefined,
        endDate: getProjectById.endDate
          ? new Date(getProjectById.endDate).toISOString().split("T")[0]
          : undefined,
        projectLink: getProjectById.projectLink,
        techStack: getProjectById.techStack,
        title: getProjectById.title,
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "isActive") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value === "true",
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveProject = async () => {
    try {
      const { id, bannerImg, ...rest } = formData;
      if (!id) return;
      const { data } = await updateProject({
        variables: {
          id: Number(id),
          updateProjectDto: { ...rest },
        },
      });
      if (data) {
        console.log("Project updated with ID:", data.updateProject.id);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gray-800 text-white flex flex-col h-full p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Update Project</h1>
        <button
          onClick={handleSaveProject}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
        >
          Save Project
        </button>
      </div>
      <hr className="my-3" />
      <div className="space-y-4">
        <input
          type="text"
          name="metaTitle"
          placeholder="Meta Title"
          value={formData.metaTitle}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="metaKeywords"
          placeholder="Meta Keywords"
          value={formData.metaKeywords.join(",")}
          onChange={(e) => {
            setFormData({
              ...formData,
              metaKeywords: e.target.value.split(","),
            });
          }}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="keypoints"
          placeholder="Keypoints"
          value={formData.keypoints?.join(",")}
          onChange={(e) => {
            setFormData({
              ...formData,
              keypoints: e.target.value.split(","),
            });
          }}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          name="metaDescription"
          placeholder="Meta Description"
          value={formData.metaDescription}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          name="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div>
          <h3>Current Banner Image</h3>
          {formData.bannerImg && <img src={formData.bannerImg} alt="Banner" />}
          {formData.bannerImgFile && (
            <img
              src={URL.createObjectURL(formData.bannerImgFile)}
              alt="New Banner"
            />
          )}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-400">
              Banner Image
            </label>
            <input
              type="file"
              name="bannerImgFile"
              accept="image/png, image/gif, image/jpeg"
              onChange={({ target: { validity, files } }) => {
                if (validity.valid && files) {
                  setFormData({
                    ...formData,
                    bannerImgFile: files[0],
                  });
                }
              }}
              className="mt-1 block w-full text-gray-700 bg-gray-200 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <br />
      <MarkdownEditor
        className="bg-gray-900 text-white p-4 w-full h-full"
        value={formData.markdownContent}
        onChange={(value) =>
          setFormData({ ...formData, markdownContent: value })
        }
      />
    </div>
  );
};

export default AdminUpdateProjectScreen;
