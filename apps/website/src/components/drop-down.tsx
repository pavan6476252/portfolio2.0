import React, { useState } from "react";
import { cn } from "../utils/tailwind-merge";
interface Props {
  children: React.ReactNode;
  button: React.ReactNode;
  className?: string;
}
const Dropdown = ({ children, button, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative inline-block">
        <button
          type="button"
          className={cn(className)}
          onClick={toggleDropdown}
        >
          {button}
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5" 
          onMouseLeave={()=>closeDropdown()}
          >
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {children}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
