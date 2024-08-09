import React, { useContext, useState } from "react";
import EditContext from "../../context/edit-context";
import { FaCamera } from "react-icons/fa6";
import apiClient from "../../store/api/apiClient";
import { useAppDispatch } from "../../store/store";
import { updateProfileUrl } from "../../store/slice/homeSlice";
import LoadingSpinner from "../../components/loading-spinner";

interface Props {
  profilePic?: string;
}

const sendGraphQLMultipartRequest = async (file: File) => {
  try {
    const operations = {
      query: `mutation editPost($profilepic: Upload!) {
        updateUser(userUpdateInput: { profileFile: $profilepic }) {
          picture
        }
      }`,
      variables: {
        profilepic: null,
      },
    };

    const map = {
      "0": ["variables.profilepic"],
    };

    const formData = new FormData();
    formData.append("operations", JSON.stringify(operations));
    formData.append("map", JSON.stringify(map));
    formData.append("0", file);

    const response = await apiClient.post("/graphql", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "apollo-require-preflight": "true",
      },
    });

    return response.data;
  } catch (error) {
    console.error("GraphQL multipart request failed", error);
    throw error;
  }
};

const AnimatedProfilePicComponent: React.FC<Props> = ({ profilePic }) => {
  const { editMode } = useContext(EditContext);
  const [newPic, setNewPic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(profilePic);
  const [loading, setLoading] = useState(false); // State for loading animation
  const dispatch = useAppDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfilePic = async () => {
    if (newPic) {
      setLoading(true); // Start loading animation
      try {
        const data = await sendGraphQLMultipartRequest(newPic);

        if (data?.updateUser?.picture) {
          setPreviewUrl(data.updateUser.picture);
          setNewPic(null);
          dispatch(updateProfileUrl(data.updateUser.picture));
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      } finally {
        setLoading(false); // Stop loading animation
      }
    }
  };

  return (
    <div className="relative max-w-sm flex items-center justify-center">
      {editMode && (
        <>
          <FaCamera
            className="absolute z-10 text-indigo-500 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
            size={30}
            onClick={() => document.getElementById("fileInput")?.click()}
          />
          <input
            id="fileInput"
            type="file"
            multiple={false}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
      <div className="relative w-full aspect-square">
        (
        <img
          src={previewUrl || "/default-profile-pic.png"} // Use a default image if none is provided
          className="animate-border-animation h-full w-full border-[8px] border-[#4f46e5] object-cover rounded-full"
          alt="Profile Picture"
        />
        )
      </div>
      {loading && <LoadingSpinner className="absolute z-10" />}
      {newPic!==null && !loading && (
        <div className="mt-2 absolute bottom-2 flex space-x-2">
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
            onClick={handleUpdateProfilePic}
          >
            Update
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
            onClick={() => {
              setNewPic(null);
              setPreviewUrl(profilePic);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimatedProfilePicComponent;
