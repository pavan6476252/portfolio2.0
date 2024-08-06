import React from "react";
import { NavLink } from "react-router-dom";

function LoginButton() {
  return (
    <NavLink
      to={"/auth/login"}
      className="flex gap-2  items-center hover:bg-[#4f46e5] hover:text-white bg-slate-200 text-black px-4 py-2 rounded-sm"
    >
      Login
    </NavLink>
  );
}

export default LoginButton;
