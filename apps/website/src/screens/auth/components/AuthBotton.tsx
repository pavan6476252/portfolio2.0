import React from "react";
interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: VoidFunction;
  className?: string;
}
function AuthButton({ children, type = "button", onClick, className }: Props) {
  return (
    <button
      className={`font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default AuthButton;
