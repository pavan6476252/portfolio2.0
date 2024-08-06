import { createBrowserRouter } from "react-router-dom";
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
                path: "create",
                element: <AdminCreateBlogScreen />,
              },
            ],
          },

          {
            path: "projects",
            element: <AdminProjectsScreen />,
          },
        ],
      },
    ],
  },
]);

export default router;
