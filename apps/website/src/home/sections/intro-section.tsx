import React, { useContext, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import EditableWrapper from "../../components/editable-wrapper";
import apiClient from "../../store/api/apiClient";
import { updateProfile } from "../../store/slice/homeSlice";
import EditContext from "../../context/edit-context";
import { graphQlRequest } from "../../store/api/gqlRequest";

const IntroSection: React.FC = () => {
  const resumeState = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  const { editMode } = useContext(EditContext);

  const [newHeroTitle, setNewHeroTitle] = useState(
    resumeState.resume?.heroTitle || ""
  );
  const [newHeroDescription, setNewHeroDescription] = useState(
    resumeState.resume?.heroDescription || ""
  );
  const [loading, setLoading] = useState(false);

  if (
    !resumeState.resume ||
    resumeState.loading ||
    resumeState.resume?.heroTitle == undefined ||
    resumeState.resume.heroDescription == undefined
  ) {
    return null;
  }

  const handleUpdateProfile = async () => {
    console.log(newHeroTitle);
    console.log(newHeroDescription);
    // return ;
    setLoading(true);
    try {
      const response = await graphQlRequest<{ updateResumeProfile: boolean }>(
        "/graphql",
        {
          query: `
          mutation UpdateResumeProfile($heroTitle: String!, $heroDescription: String!) {
            updateResumeProfile(updateResumeProfileDto: {
              heroTitle: $heroTitle,
              heroDescription: $heroDescription
            })
          }
          `,
          variables: {
            heroTitle: newHeroTitle,
            heroDescription: newHeroDescription,
          },
        }
      );

      if (response.updateResumeProfile) {
        dispatch(
          updateProfile({
            heroTitle: newHeroTitle,
            heroDescription: newHeroDescription,
          })
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setNewHeroTitle(resumeState.resume?.heroTitle || "");
    setNewHeroDescription(resumeState.resume?.heroDescription || "");
  };

  return (
    <div className="font-workSans flex flex-col gap-10 sm:my-[10%] md:my-[5%] lg:my-0 justify-center items-center">
      <EditableWrapper
        isEditable={editMode}
        className="text-center font-bold text-5xl text-white"
        initialValue={resumeState.resume.heroTitle}
        onChange={(newVal) => setNewHeroTitle(newVal)}
      >
        <h1>
          {newHeroTitle.split("\\n").map((line, index) => (
            <span key={index}>
              {line}
              {index !== newHeroTitle.split("\\n").length - 1 && <br />}
            </span>
          ))}
        </h1>
      </EditableWrapper>

      <EditableWrapper
        isEditable={editMode}
        className="text-center text-xl text-slate-300 max-w-3xl mx-auto"
        initialValue={resumeState.resume.heroDescription}
        onChange={(newVal) => setNewHeroDescription(newVal)}
      >
        <p>{newHeroDescription}</p>
      </EditableWrapper>

      {(newHeroTitle !== resumeState.resume.heroTitle ||
        newHeroDescription !== resumeState.resume.heroDescription) && (
        <div className="flex gap-4 mt-4">
          <div className="flex w-min gap-2">
            <button
              className="relative inline-block font-medium group py-3 px-8"
              onClick={handleUpdateProfile}
              disabled={loading}
            >
              <span
                className={`absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 ${
                  loading ? "bg-gray-400" : "bg-green-600"
                } group-hover:-translate-x-0 group-hover:-translate-y-0`}
              ></span>
              <span
                className={`absolute inset-0 w-full h-full bg-white border ${
                  loading ? "border-gray-400" : "border-green-600"
                } group-hover:bg-indigo-50`}
              ></span>
              <span className="relative flex gap-4 items-center">
                {loading ? "Updating..." : "Update"}
              </span>
            </button>
            <button
              className="relative inline-block font-medium group py-3 px-8"
              onClick={handleCancelEdit}
            >
              <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-red-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border border-red-600 group-hover:bg-indigo-50"></span>
              <span className="relative flex gap-4 items-center">Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroSection;
