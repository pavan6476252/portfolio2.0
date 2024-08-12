import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import ProjectsSection from "./sections/projects-section";
import BlogsSection from "./sections/blogs-section";
import HeroSection from "./sections/hero-section";
import TechnologiesSection from "./sections/technologies-section";
import MyAbilitiesSection from "./sections/my-abilities-section";
import MakeItYoursComponent from "./sections/make-it-yours-component";
import FooterSection from "./sections/footer-section";
import IntroSection from "./sections/intro-section";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/store";
import { refreshToken } from "../store/slice/authSlice";
import EditContext from "../context/edit-context";
import { fetchHomePageResume } from "../store/slice/homeSlice";
import LoadingSpinner from "../components/loading-spinner";
import NotificationBar from "../components/notification-bar";
import { LuFileWarning, LuX } from "react-icons/lu";
import { CiWarning } from "react-icons/ci";
import { IoRemoveCircleOutline } from "react-icons/io5";
import NoContentSVG from "../assets/no_content.svg";
function HomeScreen() {
  const dispatch = useAppDispatch();
  const resumeState = useAppSelector((s) => s.home);
  useEffect(() => {
    if (resumeState.resume == null) {
      dispatch(fetchHomePageResume());
    }
  }, []);
  const [editMode, setEditMode] = useState(false);

  if (resumeState.loading) {
    return (
      <div className="relative min-h-screen w-full flex justify-center items-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <EditContext.Provider value={{ editMode, setEditMode }}>
      {resumeState.error?.statusCode === 500 && (
        <NotificationBar className=" flex justify-between text-lg items-center">
          <div>
            <h1 className="font-semibold text-black">
              Oops! Internal Server Error{" "}
            </h1>
            <p className="text-slate-700">Please try agian later</p>
          </div>
          <button className="flex gap-2 border-red-200 border-2 rounded px-3 py-1">
            <span className="text-slate-700">Report</span>
            <CiWarning size={30} className="text-red-500" />
          </button>
        </NotificationBar>
      )}
      {resumeState.error?.statusCode === 404 && (
        <NotificationBar className=" flex justify-between text-lg items-center">
          <div>
            <h1 className="font-semibold text-black">
              Oops! Profile Not found{" "}
            </h1>
            <p className="text-slate-700">
              If your are admin change your role to 'admin' in database and
              re-login again
            </p>
          </div>
          
          <CiWarning size={30} className="text-yellow-500" />
         
        </NotificationBar>
      )}

      {resumeState.error?.errors && (
        <NotificationBar className=" flex justify-between text-lg items-center">
          <div>
            <h1 className="font-semibold text-black">Unknown error</h1>
            <p className="text-slate-700">{resumeState.error?.message}</p>
          </div>
          <CiWarning size={30} className="text-yellow-500" />
        </NotificationBar>
      )}
      <div className=" bg-[#080808] w-full overflow-x-hidden selection:bg-purple-300 selection:text-slate-900">
        <NavBar />
        {resumeState.resume === null && !resumeState.loading ? (
          <div className="min-h-screen w-full flex items-center justify-center">
            <img src={NoContentSVG} />
          </div>
        ) : (
          <>
            <br />
            <HeroSection />
            <IntroSection />
            <br />
            <br /> 
            <MyAbilitiesSection />
            <br />
            <br />
            <TechnologiesSection />
            <br />
            <br />
            
            <ProjectsSection />
            <br />
            <br />
            <BlogsSection />
            <MakeItYoursComponent />
            <FooterSection /> <br />
          </>
        )}
      </div>
    </EditContext.Provider>
  );
}

export default HomeScreen;
