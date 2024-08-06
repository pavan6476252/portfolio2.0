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
        "rounded-md border-[0.02px] border-slate-400 p-5 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardLayout;
