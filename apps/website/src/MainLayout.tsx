import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/store";
import { fetchUserProfile } from "./store/slice/userSlice";
import { refreshToken } from "./store/slice/authSlice";

function MainLayout() {
  const user = useAppSelector((s) => s.user);
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  useEffect(() => {
    if (auth.access_token !== null) {
      dispatch(fetchUserProfile());
    }
  }, [auth.access_token]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default MainLayout;
