import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CHANGE_USER_ROLE_TO_ADMIN = gql`
  mutation ChangeUserRoleToAdmin($secretKey: String!) {
    changeUserRoleToAdmin(secretKey: $secretKey)
  }
`;

function AdminRoleChangePromptComponent() {
  const [changeRoleAsAdmin, { loading, error, data }] = useMutation<boolean>(
    CHANGE_USER_ROLE_TO_ADMIN
  );
  const [isSucess, setIsSucess] = useState(false);
  const [message, setMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleChangeRole = async () => {
    try {
      await changeRoleAsAdmin({ variables: { secretKey } });
      setMessage("Role changed to Admin successfully.");
      setIsSucess(true);
    } catch (e) {
      setMessage("Failed to change role. " + e);
    }
  };
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 dark:text-white">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      {isSucess === true ? (
        <div>
          <h1>
            Reload to see changes or{" "}
            <span
              className="px-2 py-1 bg-indigo-500"
              onClick={() => window.location.reload()}
            >
              Ctrl + R
            </span>
          </h1>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg z-10 max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Admin Role Required
          </h2>
          <p className="mb-4 dark:text-gray-300">
            To access the admin panel, your role must be changed to admin. Do
            you want to proceed?
          </p>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="border border-gray-300 dark:text-black p-2 rounded w-full mb-4"
            placeholder="Secret Key"
          />
          {message && <p className="mb-4 text-green-500">{message}</p>}
          {error && <p className="mb-4 text-red-500">Error: {error.message}</p>}
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleChangeRole}
              className={`px-4 py-2 bg-indigo-500 disabled:bg-indigo-300 text-white rounded ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading || secretKey.length < 6}
            >
              {loading ? "Processing..." : "Change Role"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminRoleChangePromptComponent;
