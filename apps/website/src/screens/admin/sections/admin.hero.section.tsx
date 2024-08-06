import React, { useState } from "react";

interface IHeroSectionData {
  name: string;
  title: string;
  description: string;
  profilePic: string;
}

const AdminHeroSection: React.FC = () => {
  const [heroData, setHeroData] = useState<IHeroSectionData>({
    name: "Pavan Kumar",
    title: "MERN and App Developer",
    description:
      "I'm a skilled software developer with experience in Android, web development (MERN Stack), and Flutter. I'm passionate about learning new technologies and creating high-quality applications that meet clients' needs. With my expertise and dedication to excellence, I'm a valuable asset to any team or project.",
    profilePic: "../../assets/profile-86291311.jpg", // Default image path
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHeroData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setHeroData((prevData) => ({ ...prevData, profilePic: imageUrl }));
    }
  };

  const handleSave = () => {
    // Implement save functionality here (e.g., send the data to your backend)
    console.log("Hero section data saved:", heroData);
  };

  return (
    <div className="container mx-auto p-4">
     <div className="">
        <h2 className="text-white text-2xl">Hero Section</h2>
      </div>
      <br />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={heroData.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={heroData.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label className="mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={heroData.description}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Profile Picture</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 border rounded"
          />
          <img
            src={heroData.profilePic}
            alt="Profile"
            className="mt-4 w-32 h-32 rounded-full"
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

export default AdminHeroSection;
