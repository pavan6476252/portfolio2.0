import React, { useState } from "react";
import { IconType } from "react-icons";

import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGit,
  FaCss3Alt,
  FaHtml5,
  FaJsSquare,
  FaPython,
  FaJava,
  FaLinux,
  FaDatabase,
  FaVuejs,
  FaAngular,
  FaPhp,
  FaRust,
  FaSass,
  FaBootstrap,
  FaNpm,
  FaYarn,
  FaFigma,
  FaJenkins,
  FaJira,
  FaGithub,
  FaBitbucket,
  FaGitlab,
  FaWindows,
} from "react-icons/fa";
import { SiFirebase, SiKubernetes } from "react-icons/si";

interface ITechnology {
  label: string;
  icon: IconType;
  summary: string;
  experienceLevel: number;
  category: string;
}

function AdminTechnologiesSection() {
  const availableTechnologies: ITechnology[] = [
    {
      label: "React",
      icon: FaReact,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Node.js",
      icon: FaNodeJs,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Docker",
      icon: FaDocker,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "AWS",
      icon: FaAws,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Git",
      icon: FaGit,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "CSS3",
      icon: FaCss3Alt,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "HTML5",
      icon: FaHtml5,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "JavaScript",
      icon: FaJsSquare,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Python",
      icon: FaPython,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Java",
      icon: FaJava,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Linux",
      icon: FaLinux,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "SQL",
      icon: FaDatabase,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Vue.js",
      icon: FaVuejs,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Angular",
      icon: FaAngular,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "PHP",
      icon: FaPhp,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Rust",
      icon: FaRust,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Kubernetes",
      icon: SiKubernetes,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Sass",
      icon: FaSass,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Bootstrap",
      icon: FaBootstrap,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "NPM",
      icon: FaNpm,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Yarn",
      icon: FaYarn,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Figma",
      icon: FaFigma,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Jenkins",
      icon: FaJenkins,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Jira",
      icon: FaJira,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "GitHub",
      icon: FaGithub,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Bitbucket",
      icon: FaBitbucket,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "GitLab",
      icon: FaGitlab,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Firebase",
      icon: SiFirebase,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    {
      label: "Windows",
      icon: FaWindows,
      summary: "",
      experienceLevel: 0,
      category: "",
    },
    // Add more as needed
  ];

  const [technologies, setTechnologies] = useState<ITechnology[]>([]);
  const [
    selectedTechnology,
    setSelectedTechnology,
  ] = useState<ITechnology | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<number>(1);
  const [category, setCategory] = useState<string>("frontend");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addOrUpdateTechnology = () => {
    if (selectedTechnology) {
      const updatedTechnology = {
        ...selectedTechnology,
        summary,
        experienceLevel,
        category,
      };

      if (editIndex !== null) {
        const updatedTechnologies = [...technologies];
        updatedTechnologies[editIndex] = updatedTechnology;
        setTechnologies(updatedTechnologies);
        setEditIndex(null);
      } else {
        setTechnologies([...technologies, updatedTechnology]);
      }

      resetForm();
    }
  };

  const editTechnology = (index: number) => {
    const techToEdit = technologies[index];
    setSelectedTechnology(
      availableTechnologies.find((tech) => tech.label === techToEdit.label) ||
        null
    );
    setSummary(techToEdit.summary);
    setExperienceLevel(techToEdit.experienceLevel);
    setCategory(techToEdit.category);
    setEditIndex(index);
  };

  const deleteTechnology = (index: number) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setSelectedTechnology(null);
    setSummary("");
    setExperienceLevel(1);
    setCategory("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <h2 className="text-white text-2xl">Technologies</h2>
      </div>
      <br />
      <div className="mb-4 bg-slate-500 rounded-md flex">
        <select
          className="p-2 bg-transparent mr-2 border-r"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="tools">Tools</option>
        </select>

        <select
          className="p-2 bg-transparent mr-2 border-r"
          value={selectedTechnology?.label || ""}
          onChange={(e) =>
            setSelectedTechnology(
              availableTechnologies.find(
                (tech) => tech.label === e.target.value
              ) || null
            )
          }
        >
          <option value="">Select Technology</option>
          {availableTechnologies.map((tech) => (
            <option key={tech.label} value={tech.label}>
              {tech.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="p-2 bg-transparent mr-2 border-r flex-grow focus:outline-none"
          placeholder="Enter Short Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          type="number"
          min={1}
          max={5}
          className="p-2 bg-transparent mr-2 border-r flex-grow focus:outline-none"
          placeholder="Experience Level (1-5)"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(parseInt(e.target.value))}
        />

        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={addOrUpdateTechnology}
        >
          {editIndex !== null ? "Update Technology" : "Add Technology"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {technologies.map((tech, index) => (
          <TechnologyComponent
            key={index}
            {...tech}
            onEdit={() => editTechnology(index)}
            onDelete={() => deleteTechnology(index)}
          />
        ))}
      </div>
    </div>
  );
}

function TechnologyComponent({
  label,
  icon: Icon,
  summary,
  experienceLevel,
  category,
  onEdit,
  onDelete,
}: ITechnology & { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md">
      <Icon size={24} />
      <div className="flex-grow">
        <h3 className="font-bold">{label}</h3>
        <p>{summary}</p>
        <p>Experience Level: {experienceLevel}/5</p>
        <p>Category: {category}</p>
      </div>
      <button onClick={onEdit} className="p-1 text-sm bg-yellow-300 rounded">
        Edit
      </button>
      <button onClick={onDelete} className="p-1 text-sm bg-red-300 rounded">
        Delete
      </button>
    </div>
  );
}

export default AdminTechnologiesSection;
