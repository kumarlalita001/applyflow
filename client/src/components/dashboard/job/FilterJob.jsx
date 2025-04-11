import { Search } from "lucide-react";
import React from "react";

const ToolTip = ({ title }) => {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 whitespace-nowrap">
      <div className="relative bg-black text-white text-xs px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {title}
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black"></div>
      </div>
    </div>
  );
};

const FilterJob = ({ filterJobFn, filters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1  md:grid-cols-4 gap-4">
      <div className="relative inline-block  w-full group" title="search">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          name="search"
          type="text"
          title="Please enter your full name"
          placeholder="Search company or role..."
          className="pl-10 pr-4 py-2 w-full border rounded-md"
          value={filters.search}
          onChange={filterJobFn}
        />
        <ToolTip title={"Search..."} />
      </div>

      <div className="relative w-full inline-block group">
        <select
          title="Status"
          name="status"
          className="border rounded-md w-full px-4 py-2"
          value={filters.status}
          onChange={filterJobFn}
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <ToolTip title={"Status"} />
      </div>

      <div className="flex flex-col w-full justify-start  md:flex-row gap-2">
        <div className="relative w-full group">
          <input
           title="StartDate"
            name="startDate"
            type="date"
            className="border rounded-md w-full md:w-fit px-4 py-2"
            value={filters.startDate}
            onChange={filterJobFn}
          />
          <ToolTip title={"Start Date"} />
        </div>

        <div className="relative  group">
          <input
           title="EndDate"
            name="endDate"
            type="date"
            className="border rounded-md w-full md:w-fit px-4 py-2"
            value={filters.endDate}
            onChange={filterJobFn}
          />
          <ToolTip title={"End Date"} />
        </div>
      </div>
    </div>
  );
};

export default FilterJob;
