import React, { FC } from "react";
import logo from "../assets/logos/frontend/flutter.svg";
import { cn } from "../utils/tailwind-merge";
interface Props {
  children?: React.ReactNode;
  scrollDirection:
    | "animate-infinite-scroll-r-to-l"
    | "animate-infinite-scroll-l-to-r";
  className?: string;
}

const InfiniteScroll: FC<Props> = ({
  children,
  className,
  scrollDirection,
}) => {
  return (
    <div className={cn(className, `flex space-x-16 overflow-hidden group`)}>
      <div className={` flex ${scrollDirection} space-x-16 group-hover:paused`}>
        {children}
      </div>
      <div
        className={`flex ${scrollDirection} space-x-16  group-hover:paused`}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default InfiniteScroll;
