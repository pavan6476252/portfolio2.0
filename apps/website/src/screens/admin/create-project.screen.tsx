import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
const CreateProjectScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [desc, setDesc] = useState<string[]>([]);
  const [bannerImgFile, setBannerImgFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const handleSubmit = async () => {
    const projectData = {
      title,
      projectLink,
      startDate,
      techStack,
      desc,
      bannerImgFile,
    };
    console.log(projectData);

    navigator("/admin/projects");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      {/* Form Inputs */}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Add other form fields for projectLink, startDate, techStack, desc, and bannerImgFile */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800"
      >
        Save Project
      </button>
    </div>
  );
};

export default CreateProjectScreen;
