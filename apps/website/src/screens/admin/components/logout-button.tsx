import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";
import LoadingSpinner from "../../../components/loading-spinner";
import { CiWarning } from "react-icons/ci";
import { useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../utils/tailwind-merge";
const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;
interface Props {
  className?: string;
}
function LogoutButton({className}:Props) {
  const navigate = useNavigate();
  const [logout, { loading, error }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      window.location.replace("/");
    },
    onError: (err) => {
      console.error("Logout error:", err);
      alert("Logout failed");
    },
    context: {
      credentials: "include",
    },
  });

  const handleLogout = async () => {
    await logout();
  };
  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={cn("flex gap-2 items-center bg-[#e54646] px-4 py-2 rounded-sm",className)}
    >
      Logout
      <span>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <CiWarning size={20} />
        ) : (
          <FaSignOutAlt />
        )}
      </span>
    </button>
  );
}

export default LogoutButton;
