import React, { useEffect } from "react";
import logo from "../assets/logos/PavanKumarLogo.svg";
import {
  FaShare,
  FaSignOutAlt,
  FaUserAlt,
  FaUserAstronaut,
} from "react-icons/fa";
import SearchBar from "./searchbar/search-bar";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchUserProfile } from "../store/slice/userSlice";
import profilePlaceholder from "../assets/profile-86291311.jpg";
import LoginButton from "./login-button";
import Dropdown from "./drop-down";
import { NavLink } from "react-router-dom";
function NavBar() {
  const { user } = useAppSelector((s) => s.user);
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="z-20 items-center dark:text-white fixed top-0 h-14 w-full border-slate-500 border-b bg-[#080808] drop-shadow-[0_35px_35px_rgba(117,117,117,0.2)">
      <div className="container h-full mx-auto items-center flex justify-between">
        <h1 className="text-2xl">Pavan Kumar</h1>
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
                  <NavLink to={'/admin'} className="w-full bg-[#b0acf6] flex gap-2 items-center py-2 px-2">
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
            Share
            <span>
              <FaShare />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
