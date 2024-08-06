import React, { FormEventHandler, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./components/FormInput";
import AuthButton from "./components/AuthBotton";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.access_token) {
      // Store token and navigate to another page
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboard");
    } else {
      // Handle error (e.g., show error message)
      console.error("Login failed");
    }
  };

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
              />
            </svg>
          </div>
          Portfolio
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">
              Login
            </h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">
              Welcome back, enter your credentials to continue.
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Username or email"
                type="text"
                name="username"
                placeholder="Enter username or email"
                value={username}
                onChange={(e) => setUsername(e?.target.value)}
              />
              <div className="mt-4">
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <Link
                  to="/auth/register"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                >
                  Register
                </Link>
                <AuthButton
                  type="submit"
                  className="bg-white text-black h-10 px-4 py-2"
                >
                  Login
                </AuthButton>
              </div>
            </form>
            <div className="flex items-center gap-3 my-2">
              <hr className="w-full" />
              <span>Or</span>
              <hr className="w-full" />
            </div>
            <AuthButton
              onClick={handleGoogleLogin}
              className="bg-white text-black h-10 px-4 py-2 w-full flex items-center justify-center gap-4"
            >
              <FaGoogle /> Continue with Google
            </AuthButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
