import React, { ReactNode } from "react";
import { FaX } from "react-icons/fa6";
import { cn } from "../utils/tailwind-merge";

interface PopupProps {
  visibility: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children: ReactNode;
}

const PopupComponent: React.FC<PopupProps> = ({
  visibility,
  onClose,
  title,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 min-h-screen bg-gray-900 bg-opacity-75 z-[100] flex items-center justify-center ",
        visibility ? "flex" : "hidden"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full  max-w-3xl grid grid-cols-1 bg-white dark:bg-slate-800 rounded-lg  shadow-lg max-h-[80%] overflow-y-scroll",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 backdrop-blur-sm p-4 bg-slate-400/10 flex justify-between items-center">
          <h2 className="text-3xl font-bold dark:text-white text-gray-800">
            {title}
          </h2>
          <FaX
            size={20}
            className=" text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={onClose}
          />
        </div>
        <div className=" p-8">{children}</div>
      </div>
    </div>
  );
};

export default PopupComponent;
