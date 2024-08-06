import React, { useState } from "react";

interface IIntroSectionData {
  heading: string;
  description: string;
  buttonText: string;
}

const AdminIntroSection: React.FC = () => {
  const [introData, setIntroData] = useState<IIntroSectionData>({
    heading: "A platform designed for growth",
    description:
      "I'm an experienced software developer who enjoys working with Android, web development using MERN Stack, and frameworks like React and Flutter. I'm passionate about staying up-to-date with the latest technologies and learning new things. My expertise in various areas of development makes me a valuable asset to any team or project.",
    buttonText: "Get's Started",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIntroData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Implement save functionality here (e.g., send the data to your backend)
    console.log("Intro section data saved:", introData);
  };

  return (
    <div className="container mx-auto p-4">
       <div className="">
        <h2 className="text-white text-2xl">Intro Section</h2>
      </div>
      <br />
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Heading</label>
          <input
            type="text"
            name="heading"
            value={introData.heading}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={introData.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={introData.buttonText}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
};

export default AdminIntroSection;
