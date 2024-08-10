import React from "react";
import { Link, NavLink } from "react-router-dom";

function AdminSideNav() {
  const routes = [
    {
      path: "",
      title: "Dashboard",
    },
    {
      path: "blogs",
      title: "Blogs",
    },
    {
      path: "projects",
      title: "Projects",
    },
  ];
  return (
    <div className="w-full h-full  px-2 py-2">
      <div className="flex flex-col gap-2">
        {routes.map((route) => (
          <NavLink
            to={route.path}
            end={true}
            className={({ isActive, isPending }) =>
              `px-3 py-2 bg-slate-800 
              ${isPending ? "animate-pulse" : ""} 
              ${isActive ? "bg-indigo-900 text-white" : "text-white"}`
            }
          >
            {route.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AdminSideNav;
