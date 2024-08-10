import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { ISkill } from "../../store/dtos/resume-profile.dto";
import PopupComponent from "../../components/popup-component";
import { graphQlRequest } from "../../store/api/gqlRequest";
import { updateProfile } from "../../store/slice/homeSlice";
import { getIconByName, skillsList } from "../../utils/icons.mapper";

interface Props {
  togglSocialIconsVisibility: () => void;
  visibility: boolean;
}

const groupSkillsByType = (skills: ISkill[]) => {
  return skills.reduce(
    (acc, skill) => {
      if (skill.type === "frontend") {
        acc.frontend.push(skill);
      } else if (skill.type === "backend") {
        acc.backend.push(skill);
      } else {
        acc.other.push(skill);
      }
      return acc;
    },
    { frontend: [], backend: [], other: [] } as {
      frontend: ISkill[];
      backend: ISkill[];
      other: ISkill[];
    }
  );
};

function DeveloperToolsEditComponent({
  togglSocialIconsVisibility,
  visibility,
}: Props) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const resumeState = useAppSelector((s) => s.home);
  const dispatch = useAppDispatch();

  const [developerTools, setDeveloperTools] = useState<ISkill[]>([]);

  useEffect(() => {
    if (resumeState.resume?.developerTools !== undefined) {
      setDeveloperTools(resumeState.resume.developerTools ?? []);
    }
  }, [resumeState.resume]);

  const handleSkillToggle = (skill: ISkill) => {
    setDeveloperTools((prev) => {
      const exists = prev.find((s) => s.name === skill.name);
      if (exists) {
        return prev.filter((s) => s.name !== skill.name); // Remove if already exists
      } else {
        return [...prev, skill]; // Add if not exists
      }
    });
  };

  const handleSubmit = async () => {
    console.log(developerTools)
    setStatus("loading");


    try {
      const response = await graphQlRequest<{ updateResumeProfile: boolean }>(
        "/graphql",
        {
          query: `
          mutation UpdateResumeProfile($developerTools: [SkillInput!]!) {
            updateResumeProfile(updateResumeProfileDto: {
              developerTools: $developerTools
            })
          }
          `,
          variables: {
            developerTools: developerTools.map((skill) => ({
              name: skill.name,
              type: skill.type,
            })),
          },
        }
      );

      if (response.updateResumeProfile) {
        dispatch(
          updateProfile({
            developerTools: developerTools,
          })
        );
        setStatus("success");
      }
    } catch (error) {
      console.error("Error updating developer tools:", error);
      setStatus("error");
    }
  };

  const { frontend, backend, other } = groupSkillsByType(skillsList);

  const renderSkillGroup = (title: string, skills: ISkill[]) => (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {skills.map((skill, index) => {
          const isSelected = developerTools.some((s) => s.name === skill.name);
          return (
            <div
              key={index}
              onClick={() => handleSkillToggle(skill)}
              className={`p-2 rounded aspect-square justify-center gap-2 place-items-center col-span-1 flex flex-col items-center cursor-pointer ${
                isSelected ? "bg-indigo-200" : "bg-slate-200"
              }`}
            >
              {getIconByName(skill.name, 45)}
              <span className="text-lg text-center font-semibold">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <PopupComponent
      onClose={togglSocialIconsVisibility}
      title="Edit Developer Tools"
      visibility={visibility}
    >
      {renderSkillGroup("Frontend Skills", frontend)}
      {renderSkillGroup("Backend Skills", backend)}
      {renderSkillGroup("Other Skills", other)}

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
    </PopupComponent>
  );
}

export default DeveloperToolsEditComponent;
