import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import Loader from "../components/common/Loader";

const AuthPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if(isAuthenticated){
      console.log("isAuth",isAuthenticated);
      navigate("/dashboard");
    }
  },[isAuthenticated])
  
  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <div className="w-full border  border-gray-300 max-w-lg p-6 bg-white  rounded-lg text-gray-800">
        <Link to={"/"}>
          <div className="p-2 cursor-pointer text-black flex gap-2  justify-center items-center mb-4">
            <div className="text-xl text-center  font-bold ">Back to </div>
            <button className="flex items-center cursor-pointer text-xl gap-2">
              <Home className="w-6 h-6 cursor-pointer" />
              Home
            </button>
          </div>
        </Link>
        <div className="flex justify-center mb-6">
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `px-4 py-2 w-full text-center text-lg font-semibold rounded-lg transition ${
                isActive
                  ? "bg-blue-400 text-white"
                  : "bg-blue-100 text-gray-600 hover:bg-blue-50"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/auth/register"
            className={({ isActive }) =>
              `px-4 py-2 w-full text-center text-lg font-semibold rounded-lg ml-2 transition ${
                isActive
                  ? "bg-blue-400 text-white"
                  : "bg-blue-100 text-gray-600 hover:bg-blue-50"
              }`
            }
          >
            Register
          </NavLink>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
          Welcome to{" "}
          <span className="text-blue-500">
            Apply<span className="text-gray-900">Flow</span>
          </span>
        </h2>
        <div>
          <Outlet />
        </div>
      </div>
    
    </div>
  );
};

export default AuthPage;
