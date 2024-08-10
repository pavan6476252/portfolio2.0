import React from "react";
import { Project } from "../../store/dtos/project.dto";

interface Props {
  project: Project;
  onEdit: (id: number) => void;
}

const ProjectCard: React.FC<Props> = ({ project, onEdit }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={project.bannerImg}
        alt={project.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{project.title}</h2>
      <p className="text-gray-600">{project.projectLink}</p>
      <button
        onClick={() => onEdit(project.id)}
        className="mt-4 text-indigo-600 hover:text-indigo-800"
      >
        Edit Project
      </button>
    </div>
  );
};

export default ProjectCard;
