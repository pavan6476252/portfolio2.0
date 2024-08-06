import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="bg-slate-400/20 px-2 rounded-sm py-1 flex gap-2 items-center w-2/6">
      <FaSearch  className="text-lg"/>
      <input
        placeholder="Search blogs here"
        type="text"
        name="search-bar"
        id=""
        className="focus:outline-none w-full dark:text-white bg-transparent text-lg "
      />
      <span className="bg-[#564fecbe] text-sm px-2 py-1 rounded-sm">
        Click+Q
      </span>
    </div>
  );
}

export default SearchBar;
