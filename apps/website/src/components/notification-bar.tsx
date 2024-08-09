import React, { ReactNode } from "react";
import { cn } from "../utils/tailwind-merge";
interface Props {
  className: string;
  children: ReactNode;
}
function NotificationBar({ className, children }: Props) {
  return (
    <div className="w-full p-2 bg-yellow-50 fixed bottom-0 left-0 right-0 z-50">
      <div className={cn("container mx-auto", className)}>{children}</div>
    </div>
  );
}

export default NotificationBar;
