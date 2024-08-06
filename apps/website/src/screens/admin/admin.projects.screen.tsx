import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Section {
  id: number;
  title: string;
  content: string[];
}

const initialSections: Section[] = [
  {
    id: 1,
    title: "Personal Information",
    content: [
      "Name: Meesala Pavan Kumar",
      "Website: ",
      "Phone: +91-8309407054",
      "Email: meesalapavan2003@gmail.com",
      "Location: Visakhapatnam, India",
    ],
  },
  {
    id: 2,
    title: "Education",
    content: [
      "Bachelor of Technology in Computer Science",
      "Institution: Vignan’s Institute of Information Technology",
      "CGPA: 8.5",
      "Years: 2021–2025",
    ],
  },
  {
    id: 3,
    title: "Experience",
    content: [
      "AITORCH CONSULTANTS LLP - Digital Marketing and Cloud Engineering Intern (May 2024–Jul 2024)",
      "BUILD WITH INNOVATION - Flutter Developer Intern (Dec 2023–Feb 2024)",
    ],
  },
  {
    id: 4,
    title: "Projects",
    content: [
      "Inventory Management System (IMS)",
      "Event Management System (For Event Managers)",
    ],
  },
  {
    id: 5,
    title: "Certifications & Courses",
    content: [
      "Operating Systems Basics",
      "Introduction to Flutter Course",
      "The Complete Web Development",
    ],
  },
  {
    id: 6,
    title: "Technical Skills",
    content: [
      "Languages: C, Python, JavaScript, Dart, TypeScript",
      "Technologies/Frameworks: ReactJS, Redux, NodeJS, ExpressJS, Nest JS, MongoDB, Mongoose, TypeORM, SQL, Tailwind CSS",
      "Developer Tools: Git, Linux, GitHub, Docker, Firebase",
    ],
  },
  {
    id: 7,
    title: "Achievements",
    content: [
      "Secured 84th Rank in APECET.",
      "Emerged victorious in the Cacheho Hackathon, showcasing pure development prowess.",
    ],
  },
  {
    id: 8,
    title: "Volunteering Experience",
    content: [
      "Google Developer Student Clubs - Android Developer Lead (Jul 2023–May 2024)",
    ],
  },
];

const AdminProjectsScreen: React.FC = () => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionContent, setNewSectionContent] = useState<string[]>([""]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrUpdateSection = () => {
    if (editIndex !== null) {
      const updatedSections = [...sections];
      updatedSections[editIndex] = {
        ...updatedSections[editIndex],
        title: newSectionTitle,
        content: newSectionContent,
      };
      setSections(updatedSections);
      setEditIndex(null);
    } else {
      setSections([
        ...sections,
        {
          id: sections.length + 1,
          title: newSectionTitle,
          content: newSectionContent,
        },
      ]);
    }
    setNewSectionTitle("");
    setNewSectionContent([""]);
  };

  const handleEditSection = (index: number) => {
    setNewSectionTitle(sections[index].title);
    setNewSectionContent(sections[index].content);
    setEditIndex(index);
  };

  const handleDeleteSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleContentChange = (index: number, value: string) => {
    const updatedContent = [...newSectionContent];
    updatedContent[index] = value;
    setNewSectionContent(updatedContent);
  };

  const handleAddContent = () => {
    setNewSectionContent([...newSectionContent, ""]);
  };

  const handleRemoveContent = (index: number) => {
    setNewSectionContent(newSectionContent.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Manage Resume Sections</h2>
        <input
          type="text"
          placeholder="Section Title"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          className="p-2 border mb-2 w-full"
        />
        {newSectionContent.map((content, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="p-2 border flex-grow"
            />
            <button
              onClick={() => handleRemoveContent(index)}
              className="p-2 bg-red-500 text-white ml-2"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button onClick={handleAddContent} className="p-2 bg-blue-500 text-white mb-4">
          Add Content
        </button>
        <button onClick={handleAddOrUpdateSection} className="p-2 bg-green-500 text-white">
          {editIndex !== null ? "Update Section" : "Add Section"}
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Current Sections</h2>
        {sections.map((section, index) => (
          <div key={section.id} className="mb-4 p-4 border rounded">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{section.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditSection(index)}
                  className="p-2 bg-yellow-500 text-white"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteSection(index)}
                  className="p-2 bg-red-500 text-white"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside">
              {section.content.map((content, idx) => (
                <li key={idx}>{content}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjectsScreen;
