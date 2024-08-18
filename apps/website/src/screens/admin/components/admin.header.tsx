import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";
import LoadingSpinner from "../../../components/loading-spinner";
import { CiWarning } from "react-icons/ci";
import { useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./logout-button";

function AdminHeader() {
  return (
    <div className="z-20 items-center dark:text-white h-14 w-full border-slate-500 border-b bg-[#080808] drop-shadow-[0_35px_35px_rgba(117,117,117,0.2)]">
      <div className="container h-full mx-auto items-center flex justify-between">
        <h1 className="text-2xl">Control Panel</h1>
        <LogoutButton />
      </div>
    </div>
  );
}

export default AdminHeader;
