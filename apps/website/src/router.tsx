import { createBrowserRouter, Outlet } from "react-router-dom";
import HomeScreen from "./home/home-screen";
import AuthLayout from "./screens/auth/auth.layout";
import LoginScreen from "./screens/auth/login.screen";
import RegistrationScreen from "./screens/auth/register.screen";
import AdminLayout from "./screens/admin/admin.layout";
import MainLayout from "./MainLayout";
import AdminDashboardScreen from "./screens/admin/admin.dashboard.screen";
import AdminBlogsScreen from "./screens/admin/admin.blogs.screen";
import AdminProjectsScreen from "./screens/admin/admin.projects.screen";
import AdminCreateBlogScreen from "./screens/admin/admin.createblog.screen";
import AdminAddNewProjectScreen from "./screens/admin/admin.new-project.screen";
import AdminEditProjectScreen from "./screens/admin/admin.update-project.screen";
import AllBLogsScreen from "./screens/blogs/all-blogs.screen";
import ShowSpecificBlogScreen from "./screens/blogs/show-specific-blog.screen";
import AllProjectsScreen from "./screens/projects/all-projects.screen";
import ShowSpecificProjectScreen from "./screens/projects/show-specific-project.screen";
import AdminUpdateBlogScreen from "./screens/admin/admin.update-blog.screen";
import NavBar from "./components/navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "register",
            element: <RegistrationScreen />,
          },
          {
            path: "login",
            element: <LoginScreen />,
          },
        ],
      },
      {
        path: "blogs",
        element: (
          <>
            <NavBar />
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <AllBLogsScreen />,
          },
          {
            path: ":id",
            element: <ShowSpecificBlogScreen />,
          },
        ],
      },
      {
        path: "projects",
        element: (
          <>
            <NavBar />
            <Outlet />
          </>
        ),
        children: [
          {
            index: true,
            element: <AllProjectsScreen />,
          },
          {
            path: ":id",
            element: <ShowSpecificProjectScreen />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardScreen />,
          },

          {
            path: "blogs",

            children: [
              { index: true, element: <AdminBlogsScreen /> },
              {
                path: "new",
                element: <AdminCreateBlogScreen />,
              },
              {
                path: "edit/:id",
                element: <AdminUpdateBlogScreen />,
              },
            ],
          },

          {
            path: "projects",
            element: (
              <>
                <Outlet />
              </>
            ),
            children: [
              {
                index: true,
                element: <AdminProjectsScreen />,
              },
              {
                path: "new",
                element: <AdminAddNewProjectScreen />,
              },
              {
                path: "edit/:id",
                element: <AdminEditProjectScreen />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
