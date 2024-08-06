import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/admin.header";
import AdminSideNav from "./components/admin.sidenav";

function AdminLayout() {
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
