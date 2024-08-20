import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/store";
import { refreshToken } from "../store/slice/authSlice";
import EditContext from "../context/edit-context";
import { fetchHomePageResume } from "../store/slice/homeSlice";
import LoadingSpinner from "../components/loading-spinner";
import NotificationBar from "../components/notification-bar";
import { CiWarning } from "react-icons/ci";
import NoContentSVG from "../assets/no_content.svg";
import { Link } from "react-router-dom";

// Lazy load sections
const NavBar = lazy(() => import("../components/navbar"));
const ProjectsSection = lazy(() => import("./sections/projects-section"));
const BlogsSection = lazy(() => import("./sections/blogs-section"));
const HeroSection = lazy(() => import("./sections/hero-section"));
const TechnologiesSection = lazy(() =>
  import("./sections/technologies-section")
);
const MyAbilitiesSection = lazy(() =>
  import("./sections/my-abilities-section")
);
const MakeItYoursComponent = lazy(() =>
  import("./sections/make-it-yours-component")
);
const FooterSection = lazy(() => import("./sections/footer-section"));
const IntroSection = lazy(() => import("./sections/intro-section"));

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
              Oops! Internal Server Error
            </h1>
            <p className="text-slate-700">Please try again later</p>
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
              Oops! Profile Not found
            </h1>
            <p className="text-slate-700">
              If you are admin, change your role to 'admin' in the database and
              re-login again
            </p>
          </div>
          <CiWarning size={30} className="text-yellow-500" />
        </NotificationBar>
      )}
      {resumeState.error?.errors && (
        <NotificationBar className="flex justify-between text-lg items-center">
          <div>
            <h1>
              Database Errors | Manage from{" "}
              <Link to="/admin" className="underline">
                Admin panel
              </Link>
            </h1>
            <p className="text-slate-700">
              {resumeState.error.errors.map((msg: any, index: number) => (
                <span key={index} className="mr-3">
                  {msg.message}
                </span>
              ))}
            </p>
          </div>
          <CiWarning size={30} className="text-yellow-500" />
        </NotificationBar>
      )}

      <div className="bg-[#080808] w-full overflow-x-hidden selection:bg-purple-300 selection:text-slate-900">
        <Suspense>
          <NavBar />
        </Suspense>

        {resumeState.resume === null && !resumeState.loading ? (
          <div className="min-h-screen w-full flex items-center justify-center">
            <img src={NoContentSVG} alt="No content available" />
          </div>
        ) : (
          <>
            <br />
            <Suspense fallback={ <LoadingSpinner />}>
              <HeroSection />
              <IntroSection />
              <MyAbilitiesSection />
              <TechnologiesSection />
              <ProjectsSection />
              <BlogsSection />
              <MakeItYoursComponent />
              <FooterSection />
            </Suspense>
            <br />
          </>
        )}
      </div>
    </EditContext.Provider>
  );
}

export default HomeScreen;
