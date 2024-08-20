import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchBox } from "react-instantsearch";
import { cn } from "../../utils/tailwind-merge";

const SearchBar = ({ setShowResults }: { setShowResults: (show: boolean) => void }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const memoizedSearch = useCallback(
    (query: string, search: (value: string) => any) => {
      search(query);
    },
    []
  );

  const { refine } = useSearchBox({
    queryHook: memoizedSearch,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refine(event.target.value);
  };

  const toggleSearch = () => {
    searchInputRef.current?.focus();
  };

  useEffect(() => {
    const ctrlq = (event: KeyboardEvent) => event.ctrlKey && event.key === "q";
    const searchHandler = (event: KeyboardEvent) => {
      if (ctrlq(event)) toggleSearch();
    };
    const searchIgnore = (event: KeyboardEvent) => {
      if (ctrlq(event)) event.preventDefault();
    };
    document.addEventListener("keyup", searchHandler);
    document.addEventListener("keydown", searchIgnore);
    return () => {
      document.removeEventListener("keyup", searchHandler);
      document.removeEventListener("keydown", searchIgnore);
    };
  }, []);

  return (
    <div
      className={cn(
        `bg-slate-400/20 px-3 py-2 rounded-sm flex items-center gap-2 ${
          isFocused && "border-2 border-purple-500"
        } transition-all duration-300 mx-4`
      )}
    >
      <FaSearch className="text-lg text-gray-600" />
      <input
        ref={searchInputRef}
        placeholder="Search blogs here"
        type="text"
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
          setShowResults(true);
        }}
        onBlur={() => {
          setIsFocused(false);
          // setTimeout(() => setShowResults(false), 200);  
        }}
        className="flex-grow bg-transparent text-lg text-black dark:text-white focus:outline-none"
      />
      <span className="bg-purple-500 text-white text-sm px-2 py-1 rounded-sm">
        Ctrl+Q
      </span>
    </div>
  );
};

export default SearchBar;
