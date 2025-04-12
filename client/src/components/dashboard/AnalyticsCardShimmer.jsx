import React from "react";

const shimmerItems = [1, 2, 3, 4];

const AnalyticsCardShimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {shimmerItems.map((_, index) => (
        <div
          key={index}
          className="animate-pulse shadow-lg rounded-lg p-6 flex gap-4 items-start"
        >
          <div className="flex-1 flex justify-center items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-6 bg-gray-400 rounded w-1/2 mx-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCardShimmer;
