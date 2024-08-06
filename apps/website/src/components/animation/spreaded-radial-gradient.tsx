import React from "react";
import { cn } from "../../utils/tailwind-merge";
interface Props {
  className?: string;
}
const SpeadedRadialGradient: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-0  m-auto  w-1/2 hover:w-5/6 h-1/2 hover:h-5/6 bg-gradient-to-r from-slate-500/10 via-slate-500/20 to-slate-500/10 duration-1000 rounded-full blur-3xl",
        className
      )}
    ></div>
  );
};

export default SpeadedRadialGradient;
