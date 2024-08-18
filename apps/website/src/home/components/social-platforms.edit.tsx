import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa6";
import PopupComponent from "../../components/popup-component";
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
      const socialLinksInput = JSON.stringify(
        socialLinks.map(({ name, link }) => ({
          name: name,
          link: link,
        }))
      ).replace(/"([^"]+)":/g, "$1:");

      const response = await apiClient.post("/graphql", {
        query: `
          mutation {
            updateResumeProfile(updateResumeProfileDto: {
              socialPlatforms: ${socialLinksInput}
            })
          }
        `,
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
    <PopupComponent
      visibility={visibility}
      onClose={togglSocialIconsVisibility}
      title="Edit Social Links"
    >
      <div className="grid gap-4 sm:grid-cols-1 text-sm">
        {socialLinks.map((data, index) => {
          const Icon = getIconByName(data.name);
          return (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-slate-700 rounded-md shadow-sm"
            >
              <Icon size={20} className="text-indigo-600" />
              <span className="flex-1 text-gray-800 dark:text-white">
                {data.name.split("-").join(" ")}
              </span>
              <input
                value={data.link}
                onChange={(e) => handleLinkChange(e, index)}
                className="flex-1 p-2 text-gray-800 border border-gray-300 rounded-md dark:border-gray-600"
                placeholder="Enter link"
              />
              <FaTrash
                size={18}
                className="ml-2 text-red-600 cursor-pointer hover:text-red-800"
                onClick={() => handleDeleteSocialLink(index)}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-sm">
        <h3 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white">
          Add New Social Link
        </h3>
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <select
            className="p-2 text-gray-800 border border-gray-300 rounded-md dark:border-gray-600"
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
            className="p-2 text-gray-800 border border-gray-300 rounded-md dark:border-gray-600"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Enter link"
          />
          <button
            className="flex items-center  justify-center px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={handleAddSocialLink}
          >
            <FaPlus size={20} />
          </button>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          type="submit"
          className="inline-block h-10 px-6 text-white bg-indigo-600  text-sm rounded-lg transition-colors duration-150 hover:bg-indigo-700 focus:shadow-outline"
          onClick={handleSubmit}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Updating..." : "Save Changes"}
        </button>
      </div>
      {status === "success" && (
        <p className="mt-4 text-green-600">Updated successfully!</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">Failed to update. Please try again.</p>
      )}
    </PopupComponent>
  );
}
