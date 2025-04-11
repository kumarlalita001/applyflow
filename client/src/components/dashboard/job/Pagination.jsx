import React from "react";

const Pagination = ({currentPage,totalPages,prevPageFn,nextPageFn}) => {
  return (
    <div className="w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 bg-white">
      <button
        onClick={prevPageFn}
        disabled={currentPage === 1}
        className="px-4 cursor-pointer py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm text-gray-700">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </span>

      <button
        onClick={nextPageFn}
        disabled={currentPage === totalPages}
        className="px-4 py-2 cursor-pointer border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
