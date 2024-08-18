import React from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "./components/admin.header";
import AdminSideNav from "./components/admin.sidenav";
import { useAppSelector } from "../../store/store";
import AdminRoleChangePromptComponent from "./components/admin.role-prompt.component";

function AdminLayout() {
  const userInfo = useAppSelector((s) => s.user);

  if (!userInfo.user) {
    return (
      <div className="dark:bg-[#080808] min-h-screen w-full flex flex-col items-center justify-center">
        <h1 className="dark:text-white">
          Please{" "}
          <Link to={"/auth/login"} className="underline">
            Login
          </Link>{" "}
          to access Admin Panel
        </h1>
      </div>
    );
  }

  if (userInfo.user.role === "user") {
    return (
      <div className="dark:bg-[#080808] min-h-screen w-full flex flex-col items-center justify-center">
        <AdminRoleChangePromptComponent />
      </div>
    );
  }

  return (
    <div className="dark:bg-[#080808] min-h-screen w-full flex flex-col">
      <AdminHeader />
      <div className="flex-grow w-full grid grid-cols-1 lg:grid-cols-6">
        <div className=" lg:col-span-1 border-r ">
          <AdminSideNav />
        </div>
        <div className="  col-span-1 lg:col-span-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
