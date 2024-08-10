import React, { useContext, useEffect } from "react";
import logo from "../assets/logos/PavanKumarLogo.svg";
import {
  FaEdit,
  FaShare,
  FaSignOutAlt,
  FaTimesCircle,
  FaUserAlt,
  FaUserAstronaut,
  FaUserEdit,
} from "react-icons/fa";
import SearchBar from "./searchbar/search-bar";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchUserProfile } from "../store/slice/userSlice";
import profilePlaceholder from "../assets/profile-86291311.jpg";
import LoginButton from "./login-button";
import Dropdown from "./drop-down";
import { NavLink } from "react-router-dom";
import EditContext from "../context/edit-context";
function NavBar() {
  const { user } = useAppSelector((s) => s.user);
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const resumeState = useAppSelector((s) => s.home);
  const { editMode, setEditMode } = useContext(EditContext);

  const toggleEditMode = () => {
    if (user && user.role == "admin") setEditMode((prevMode) => !prevMode);
  };

  return (
    <div className="z-20 items-center dark:text-white fixed top-0 h-14 w-full border-slate-500 border-b bg-[#080808] drop-shadow-[0_35px_35px_rgba(117,117,117,0.2)">
      <div className="container h-full mx-auto items-center flex justify-between">
        <h1 className="text-2xl">
          {resumeState.resume?.fullName ?? "UnNamed Site"}
        </h1>
        <SearchBar />

        <div className="flex  gap-4 place-items-center ">
          {user ? (
            <Dropdown
              className=""
              button={
                <>
                  <div className="border-[3px] rounded-full border-[#4f46e5] hover:border-white h-10 aspect-square overflow-hidden">
                    <img
                      src={user.picture ? user.picture : profilePlaceholder}
                      alt=""
                    />
                  </div>
                </>
              }
            >
              <ul className="overflow-hidden gap-[1px] flex flex-col">
                <li className="w-full bg-[#b0acf6] flex gap-2 items-center py-2 px-2">
                  <FaUserAlt /> Profile
                </li>
                {user.role == "admin" && (
                  <button
                    className={`flex gap-2 items-center px-2 py-2  shadow-md transition duration-300 ${
                      editMode
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-[#b0acf6] hover:bg-indigo-700"
                    } text-white`}
                    onClick={toggleEditMode}
                  >
                    {editMode ? (
                      <>
                        <FaTimesCircle />
                        <span>Disable Edit</span>
                      </>
                    ) : (
                      <>
                        <FaUserEdit />
                        <span>Enable Edit</span>
                      </>
                    )}
                  </button>
                )}
                {user.role == "admin" && (
                  <NavLink
                    to={"/admin"}
                    className="w-full bg-[#b0acf6] flex gap-2 items-center py-2 px-2"
                  >
                    <FaUserAstronaut /> Admin Panel
                  </NavLink>
                )}
                <li className="w-full bg-[#b0acf6] flex gap-2 items-center py-2 px-2">
                  <FaSignOutAlt /> Logout
                </li>
              </ul>
            </Dropdown>
          ) : (
            <LoginButton />
          )}
          <button className="flex gap-2  items-center bg-[#4f46e5] px-4 py-2 rounded-sm">
            <span className="hidden md:block">
            Share
            </span>
              <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
