import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/tailwind-merge";

export default function LoadingSpinner({className}:{className?:string}) {
  return (
    <div className={cn(`relative w-12 h-12`, className)}>
      <motion.span
        className="block w-12 h-12 border-4 border-indigo-600 border-t-4 border-t-gray-800 rounded-full absolute top-0 left-0 box-border"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "easeInOut",
          duration: 1,
        }}
      />
    </div>
  );
}
