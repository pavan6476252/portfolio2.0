import React from "react";
import logo from "../assets/logos/PavanKumarLogo.svg";
import { FaShare, FaSignOutAlt } from "react-icons/fa";
function AdminHeader() {
  return (
    <div className="z-20 items-center dark:text-white  h-14 w-full border-slate-500 border-b bg-[#080808] drop-shadow-[0_35px_35px_rgba(117,117,117,0.2)">
      <div className="container h-full mx-auto items-center flex justify-between">
        <h1 className="text-2xl">Control Panel </h1>

        <button className="flex gap-2  items-center bg-[#e54646] px-4 py-2 rounded-sm">
          Logout
          <span>
            <FaSignOutAlt />
          </span>
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;
