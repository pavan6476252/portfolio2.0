import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa6";

import mobileAppLogo from "../../assets/logos/app-development-removebg-preview.png";
import backendLogo from "../../assets/logos/34877848-removebg-preview.png";
import devopsLogo from "../../assets/logos/devops-2.svg";
import defaultLogo from "../../assets/logos/PavanKumarLogo.svg";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { IAbility } from "../../../store/dtos/resume-profile.dto";
import { graphQlRequest } from "../../../store/api/gqlRequest";
import { updateProfile } from "../../../store/slice/homeSlice";
import { allLogoTypes, getLogoPathFromType } from "../../../home/components/abilities.edit";
import CardLayout from "../../../components/card-layout";

 

export default function AdminAbilitiesSection() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const resumeState = useAppSelector((s) => s.home);
  const dispatch = useAppDispatch();
  const [abilities, setAbilities] = useState<IAbility[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newType, setNewType] = useState<string>("Devops");
  const [newDesc, setNewDesc] = useState<string>("");

  useEffect(() => {
    if (resumeState.resume?.abilities !== undefined) {
      setAbilities(
        resumeState.resume.abilities.map((ability) => ({ ...ability }))
      );
    }
  }, [resumeState.resume]);

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedAbilities = [...abilities];
    updatedAbilities[index] = {
      ...updatedAbilities[index],
      title: e.target.value,
    };
    setAbilities(updatedAbilities);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedAbilities = [...abilities];
    updatedAbilities[index] = {
      ...updatedAbilities[index],
      description: e.target.value,
    };
    setAbilities(updatedAbilities);
  };

  const handleTypeChange = (value: string, index: number) => {
    const updatedAbilities = [...abilities];
    updatedAbilities[index] = {
      ...updatedAbilities[index],
      type: value,
    };
    setAbilities(updatedAbilities);
  };

  const handleAddAbility = () => {
    if (newTitle && newType && newDesc) {
      setAbilities([
        ...abilities,
        { type: newType, title: newTitle, description: newDesc },
      ]);
      setNewTitle("");
      setNewDesc("");
      setNewType("");
    }
  };

  const handleDeleteAbility = (index: number) => {
    const updatedAbilities = abilities.filter((_, i) => i !== index);
    setAbilities(updatedAbilities);
  };

  const handleSubmit = async () => {
    console.log(JSON.stringify(abilities));
    // return ;
    setStatus("loading");

    try {
      const response = await graphQlRequest<{ updateResumeProfile: boolean }>(
        "/graphql",
        {
          query: `
         mutation UpdateResumeProfile($abilities: [AbilitiesInput!]!) {
          updateResumeProfile(updateResumeProfileDto: {
            abilities: $abilities
          })
        }
        `,
          variables: {
            abilities: abilities.map(({ type, title, description }) => ({
              type,
              title,
              description,
            })),
          },
        }
      );
      console.log(response);
      if (response.updateResumeProfile) {
        setStatus("success");
        dispatch(updateProfile({ abilities: abilities }));
      }
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  return (
    <>
    <br />
      <div className="grid grid-cols-2 md::grid-cols-3 lg:grid-cols-4 gap-4">
        {abilities.map((data, index) => {
          const logoPath = getLogoPathFromType(data.type);
          return (
            <CardLayout className="relative">

          
              <img src={logoPath} className="text-indigo-600 flex-1 max-h-40  aspect-video object-cover" alt={data.type} />
              <div className="flex flex-col gap-2 w-full">
                <input
                  value={data.title}
                  onChange={(e) => handleTitleChange(e, index)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full dark:bg-gray-900 dark:text-white "
                  placeholder="Enter title"
                />
                <select
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full dark:bg-gray-900 dark:text-white"
                  value={data.type}
                  onChange={(e) => handleTypeChange(e.target.value, index)}
                >
                  {allLogoTypes().map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <input
                  value={data.description}
                  onChange={(e) => handleDescriptionChange(e, index)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full dark:bg-gray-900 dark:text-white "
                  placeholder="Enter description"
                  />
              </div>
              <FaTrash
                size={18}
                className="absolute top-4 right-4 text-red-600 cursor-pointer ml-2 hover:text-red-800"
                onClick={() => handleDeleteAbility(index)}
                />
           
                </CardLayout>
          );
        })}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold dark:text-white  mb-3">
          Add New Ability
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full dark:bg-gray-900 dark:text-white"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter title"
          />
          <select
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full dark:bg-gray-900 dark:text-white"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            {allLogoTypes().map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full dark:bg-gray-900 dark:text-white"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Enter description"
          />

          <button
            className="flex items-center justify-center h-full px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={handleAddAbility}
          >
            <FaPlus size={20} />
          </button>
        </div>
      </div>
      <div className="text-right mt-6">
        <button
          type="submit"
          className="inline-block h-10 px-6 text-white bg-indigo-600 rounded-lg transition-colors duration-150 hover:bg-indigo-700 focus:shadow-outline"
          onClick={handleSubmit}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Updating..." : "Save Changes"}
        </button>
      </div>
      {status === "success" && (
        <p className="text-green-600 mt-4">Updated successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-4">Failed to update. Please try again.</p>
      )}
      <br />
    </>
  );
}
