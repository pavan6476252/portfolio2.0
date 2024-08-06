import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { refreshToken } from "../../store/slice/authSlice";

function AuthLayout() {
  const [isRedirecting, setRedirecting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get("access_token");
  const redirectionPath = searchParams.get("return");

  useEffect(() => {
    if (
      location.pathname.endsWith("auth") ||
      location.pathname.endsWith("auth/")
    ) {
      setRedirecting(true);
      setTimeout(() => {
        navigate(redirectionPath || accessToken ? "/" : "/auth/login");

        if (accessToken) {
          dispatch(refreshToken());
        }
        setRedirecting(false);
      }, 2000);
    }
  }, [accessToken, navigate, location.pathname, redirectionPath]);

  return (
    <div className="relative dark:bg-black min-h-screen w-full">
      {isRedirecting && (
        <div className="absolute w-full h-full flex items-center justify-center text-white text-center">
          <h2 className="text-2xl mb-4 animate-pulse">
            Redirection in Progress
          </h2>
        </div>
      )}
      {accessToken && !isRedirecting ? (
        <div className="text-white text-center absolute w-full h-full flex items-center justify-center">
          <h2 className="text-2xl mb-4">Authentication in Progress</h2>
          <p>Please wait while we verify your credentials...</p>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default AuthLayout;
