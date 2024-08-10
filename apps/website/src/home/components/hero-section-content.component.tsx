import React, { useContext, useState } from "react";
import EditableWrapper from "../../components/editable-wrapper";
import { useAppSelector, useAppDispatch } from "../../store/store";
import EditContext from "../../context/edit-context";
import ContactUsFormComponent from "./contact-us.component";
import { FaShareAlt } from "react-icons/fa";
import apiClient from "../../store/api/apiClient";
import { updateProfile } from "../../store/slice/homeSlice"; // Assuming you have an action to update the store
import { graphQlRequest } from "../../store/api/gqlRequest";

function HeroSectionContentComponent() {
  const resumeState = useAppSelector((state) => state.home);
  const { editMode } = useContext(EditContext);
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newName, setNewName] = useState(resumeState.resume?.fullName || "");
  const [newTagline, setNewTagLine] = useState(
    resumeState.resume?.tagline || ""
  );
  const [newDescription, setNewDescription] = useState(
    resumeState.resume?.description || ""
  );

  if (!resumeState.resume || resumeState.loading) {
    return null;
  }

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await graphQlRequest<{ updateResumeProfile: boolean }>(
        "/graphql",
        {
          query: `
            mutation {
              updateResumeProfile(updateResumeProfileDto: {
                fullName: "${newName}",
                tagline: "${newTagline}",
                description: "${newDescription}"
              })
            }
          `,
        }
      );

      if (response.updateResumeProfile) {
        dispatch(
          updateProfile({
            fullName: newName,
            tagline: newTagline,
            description: newDescription,
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
    setNewName(resumeState.resume?.fullName || "");
    setNewTagLine(resumeState.resume?.tagline || "");
    setNewDescription(resumeState.resume?.description || "");
  };

  return (
    <>
      <EditableWrapper
        className="font-bold text-4xl w-full md:text-5xl lg:text-6xl text-white"
        initialValue={resumeState.resume.fullName}
        isEditable={editMode}
        maxRows={1}
        onChange={(newVal) => setNewName(newVal)}
      >
        <h1>{resumeState.resume.fullName}</h1>
      </EditableWrapper>
      <div className="flex items-center gap-4 w-full flex-nowrap mb-4">
        <span className="w-full h-1 bg-[#4f46e5]"></span>
        <EditableWrapper
          className="inline text-nowrap text-white font-semibold"
          initialValue={resumeState.resume.tagline}
          isEditable={editMode}
          maxRows={1}
          onChange={(newVal) => setNewTagLine(newVal)}
        >
          <span>{resumeState.resume.tagline}</span>
        </EditableWrapper>
      </div>
      <EditableWrapper
        className="text-lg w-full md:text-xl text-slate-300"
        initialValue={resumeState.resume.description}
        isEditable={editMode}
        onChange={(newVal) => setNewDescription(newVal)}
      >
        <p>{resumeState.resume.description}</p>
      </EditableWrapper>
      <br />
      <div className="flex justify-between">
        <button
          className="relative inline-block font-medium group py-3 px-8"
          onClick={() => setShowForm(true)}
        >
          <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform translate-x-1 translate-y-1 bg-indigo-600 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border border-indigo-600 group-hover:bg-indigo-50"></span>
          <span className="relative text-indigo-600 flex gap-4 items-center">
            Say Hello <FaShareAlt />
          </span>
        </button>

        {(newName !== resumeState.resume.fullName ||
          newTagline !== resumeState.resume.tagline ||
          newDescription !== resumeState.resume.description) && (
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
        )}
      </div>
      <ContactUsFormComponent
        visibility={showForm}
        email={resumeState.resume.user.email}
        toggleFormVisibility={() => setShowForm((s) => !s)}
      />
    </>
  );
}

export default HeroSectionContentComponent;
