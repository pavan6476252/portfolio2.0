import React, { useState } from "react";
import {
  FaCode,
  FaServer,
  FaMobileAlt,
  FaTools,
  FaDatabase,
  FaCloud,
} from "react-icons/fa";

interface IAbility {
  icon: React.ReactNode;
  iconLabel: string;
  title: string;
  description: string;
}

const iconOptions = {
  "WebDeveloper": <FaCode />,
  "BackendDeveloper": <FaServer />,
  "MobileAppDeveloper": <FaMobileAlt />,
  "DevOps": <FaTools />,
  "DatabaseAdministrator": <FaDatabase />,
  "CloudEngineer": <FaCloud />,
};

const AdminAbilitiesSection: React.FC = () => {
  const [abilities, setAbilities] = useState<IAbility[]>([]);
  const [newAbility, setNewAbility] = useState<IAbility>({
    icon: iconOptions["WebDeveloper"],
    iconLabel: "Web Developer",
    title: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updatedAbilities = [...abilities];
      updatedAbilities[editIndex] = newAbility;
      setAbilities(updatedAbilities);
      setEditIndex(null);
    } else {
      setAbilities([...abilities, newAbility]);
    }
    setNewAbility({
      icon: iconOptions["WebDeveloper"],
      iconLabel: "Web Developer",
      title: "",
      description: "",
    });
  };

  const handleEdit = (index: number) => {
    setNewAbility(abilities[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    setAbilities(abilities.filter((_, i) => i !== index));
  };

  const handleIconChange = (label: string) => {
    setNewAbility({
      ...newAbility,
      icon: iconOptions[label],
      iconLabel: label,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex flex-col gap-2">
        <select
          value={newAbility.iconLabel}
          onChange={(e) => handleIconChange(e.target.value)}
          className="p-2 border"
        >
          {Object.keys(iconOptions).map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Title"
          value={newAbility.title}
          onChange={(e) => setNewAbility({ ...newAbility, title: e.target.value })}
          className="p-2 border"
        />
        <textarea
          placeholder="Description"
          value={newAbility.description}
          onChange={(e) =>
            setNewAbility({ ...newAbility, description: e.target.value })
          }
          className="p-2 border"
        />
        <button
          onClick={handleAddOrUpdate}
          className="p-2 bg-blue-500 text-white"
        >
          {editIndex !== null ? "Update Ability" : "Add Ability"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {abilities.map((ability, index) => (
          <div key={index} className="p-4 border rounded-md flex flex-col items-center">
            {ability.icon}
            <h3 className="font-bold">{ability.title}</h3>
            <p>{ability.description}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(index)}
                className="p-2 bg-yellow-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="p-2 bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAbilitiesSection;
