import React from "react";

const Loader = () => {
  return (
    <div className="fixed z-50 inset-0 h-screen w-screen flex items-center justify-center bg-black/50  bg-opacity-50">
      <span className="loader"></span>
    </div>
   
  );
};

export default Loader;
