import { BriefcaseIcon, Home, Settings, X } from "lucide-react";
import React from "react";

const DashSidebar = ({sidebarOpen,sidebarCloseFn}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-700 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0 " : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 bg-indigo-800">
        <div className="flex items-center">
          <BriefcaseIcon className="h-8 w-8 text-white" />
          <span className="ml-2 text-white font-semibold">ApplyFlow</span>
        </div>
        <button onClick={sidebarCloseFn} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-5 px-2 flex flex-col justify-between  h-[80vh]">
        <a
          href="#"
          className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white bg-indigo-800"
        >
          <Home className="mr-4 h-6 w-6" />
          Dashboard
        </a>
        <a
          href="#"
          className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 bg-gray-700 hover:bg-indigo-600"
        >
          <Settings className="mr-4 h-6 w-6" />
          Settings
        </a>
      </nav>
    </div>
  );
};

export default DashSidebar;
