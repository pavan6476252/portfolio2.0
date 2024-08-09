import React, { useEffect, useState } from "react";
import { FaX, FaTrash, FaPlus } from "react-icons/fa6";
import { cn } from "../../utils/tailwind-merge";
import ContactUsSvg from "../../assets/contact_us.svg";
import { useAppSelector } from "../../store/store";
import {
  getIconByName,
  ISocialLinks,
  SocialIconsList,
} from "../../utils/social-icons.mapper";
import apiClient from "../../store/api/apiClient";

interface Props {
  togglSocialIconsVisibility: () => void;
  visibility: boolean;
}

export default function EditSocialPlatformsComponent({
  togglSocialIconsVisibility,
  visibility,
}: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const resumeState = useAppSelector((s) => s.home);

  const [socialLinks, setSocialLinks] = useState<ISocialLinks[]>([]);
  const [newLink, setNewLink] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  useEffect(() => {
    if (resumeState.resume?.socialPlatforms !== undefined) {
      setSocialLinks(resumeState.resume.socialPlatforms ?? []);
    }
  }, [resumeState.resume]);

  const handleLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].link = e.target.value;
    setSocialLinks(updatedLinks);
  };

  const handleAddSocialLink = () => {
    if (selectedPlatform && newLink) {
      setSocialLinks([
        ...socialLinks,
        { name: selectedPlatform, link: newLink },
      ]);
      setNewLink("");
      setSelectedPlatform("");
    }
  };

  const handleDeleteSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  const handleSubmit = async () => {
    setStatus("loading");

    try {
        // Convert the socialLinks array into a valid GraphQL input format
        const socialLinksInput = JSON.stringify(
            socialLinks.map(({ name, link }) => ({
                name: name,
                link: link,
            }))
        ).replace(/"([^"]+)":/g, '$1:');

        const response = await apiClient.post("/graphql", {
            query: `
            mutation {
                updateResumeProfile(updateResumeProfileDto: {
                    socialPlatforms: ${socialLinksInput}
                })
            }`,
        });

        if (response.data.data?.updateResumeProfile) {
            setStatus("success");
        } else {
            setStatus("error");
            console.log(response.data);
        }
    } catch (error) {
        setStatus("error");
        console.log(error);
    }
};

  return (
    <div
      className={cn(
        "fixed inset-0 min-h-screen bg-gray-900 bg-opacity-75 z-[100] flex items-center justify-center",
        `${visibility ? "flex" : "hidden"}`
      )}
      onClick={togglSocialIconsVisibility}
    >
      <div
        className="relative w-full mx-5 max-w-3xl grid grid-cols-1 gap-6 p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <FaX
          size={20}
          className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={togglSocialIconsVisibility}
        />
        <h2 className="text-3xl font-bold dark:text-white text-gray-800">
          Edit Social Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((data, index) => {
            const Icon = getIconByName(data.name);
            return (
              <div
                key={index}
                className="flex items-center gap-2 dark:bg-slate-700 p-3 rounded-md shadow-sm"
              >
                <Icon size={20} className="text-indigo-600" />
                <span className="dark:text-white text-gray-800 flex-1">
                  {data.name.split("-").join(" ")}
                </span>
                <input
                  value={data.link}
                  onChange={(e) => handleLinkChange(e, index)}
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full text-gray-800 "
                  placeholder="Enter link"
                />
                <FaTrash
                  size={18}
                  className="text-red-600 cursor-pointer ml-2 hover:text-red-800"
                  onClick={() => handleDeleteSocialLink(index)}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-3">
            Add New Social Link
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-800 "
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="" disabled>
                Select Platform
              </option>
              {SocialIconsList.map((data, index) => (
                <option key={index} value={data.name}>
                  {data.name.split("-").join(" ")}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full text-gray-800"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Enter link"
            />
            <button
              className="flex items-center justify-center h-full px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={handleAddSocialLink}
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
          <p className="text-red-600 mt-4">
            Failed to update. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
