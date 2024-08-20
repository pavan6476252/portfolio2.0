import React, { ReactNode } from "react";
import { cn } from "../utils/tailwind-merge";
import SpeadedRadialGradient from "./animation/spreaded-radial-gradient";

interface Props {
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CardLayout: React.FC<Props> = ({
  className,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={cn(
        "relative h-full bg-slate-800 rounded-3xl p-px overflow-hidden",
        className
      )}
    >
      <div className="relative h-full bg-slate-900  rounded-[inherit]  overflow-hidden">
        <div
          className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
          aria-hidden="true"
        >
          <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
        </div>
        <div className="flex flex-col h-full items-center text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
