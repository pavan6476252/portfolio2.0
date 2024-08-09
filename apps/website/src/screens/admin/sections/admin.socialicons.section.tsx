import React, { useState } from "react";
import { IconType } from "react-icons";
import { ISocialLinks, SocialIconsList } from "../../../utils/social-icons.mapper"; 
import {
  FaDev,
  FaStackOverflow,
  FaBehance,
  FaCodepen,
  FaDribbble,
  FaFacebook,
  FaGithubAlt,
  FaGitlab,
  FaLinkedin,
  FaMedium,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";


function AdminSocialIconsSection() {
  const icons: ISocialLinks[] = SocialIconsList;

  const [data, setData] = useState<ISocialLinks[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<ISocialLinks | null>(null);
  const [link, setlink] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addSocialLink = () => {
    if (selectedIcon && link) {
      if (editIndex !== null) {
        const updatedData = [...data];
        updatedData[editIndex] = { ...selectedIcon, link: link };
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, { ...selectedIcon, link: link }]);
      }
      setlink("");
    }
  };

  const editSocialLink = (index: number) => {
    const linkToEdit = data[index];
    setSelectedIcon(
      icons.find((icon) => icon.name === linkToEdit.name) || null
    );
    setlink(linkToEdit.link);
    setEditIndex(index);
  };

  const deleteSocialLink = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <h2 className="text-white text-2xl">Social Links</h2>
      </div>
      <br />
      <div className="mb-4 bg-slate-800 rounded-md flex overflow-hidden">
        <select
          className="p-2  mr-2 border-r bg-[#5c3bff] "
          value={selectedIcon?.name || ""}
          onChange={(e) =>
            setSelectedIcon(
              icons.find((icon) => icon.name === e.target.value) || null
            )
          }
        >
          <option value="">Select Social Icon</option>
          {icons.map((icon) => (
            <option key={icon.name} value={icon.name} className="">
              {icon.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="p-2 text-white bg-transparent border-r flex-grow focus:outline-none"
          placeholder="Enter link or URL"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        />
        <button
          className="p-2 bg-[#5c3bff] text-white "
          onClick={addSocialLink}
        >
          {editIndex !== null ? "Update Link" : "Add Social Link"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((link, index) => (
          <SocialLinkComponent
            key={index}
            {...link}
            onEdit={() => editSocialLink(index)}
            onDelete={() => deleteSocialLink(index)}
          />
        ))}
      </div>
    </div>
  );
}

function SocialLinkComponent({
  name,
  icon: Icon,
  link,
  onEdit,
  onDelete,
}: ISocialLinks & { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md">
      <Icon size={24} />
      <span>{name}</span>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 flex-grow"
      >
        {link}
      </a>
      <button onClick={onEdit} className="p-1 text-sm bg-yellow-300 rounded">
        Edit
      </button>
      <button onClick={onDelete} className="p-1 text-sm bg-red-300 rounded">
        Delete
      </button>
    </div>
  );
}

export default AdminSocialIconsSection;
