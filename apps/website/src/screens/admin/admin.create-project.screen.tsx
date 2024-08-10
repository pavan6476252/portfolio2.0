import React, { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

export interface IProjectDTO {
  title?: string;

  projectLink?: string;

  bannerImgFile?: File;

  startDate?: string;

  techStack?: string[];

  desc?: string;

  keypoints: string[];

  isActive?: boolean;
}

const CreateProjectScreen: React.FC = () => {
  const [project, setProject] = useState<IProjectDTO>({});

  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  const handleSubmit = async () => {
    // navigator("/admin/projects");
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
