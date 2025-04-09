import { Search } from "lucide-react";
import React from "react";

const FilterJob = ({filterJobFn,filters}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          name="search"
          type="text"
          placeholder="Search company or role..."
          className="pl-10 pr-4 py-2 w-full border rounded-md"
          value={filters.search}
          onChange={filterJobFn}
        />
      </div>

      <select
        name="status"
        className="border rounded-md px-4 py-2"
        value={filters.status}
        onChange={filterJobFn}
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input
        name="startDate"
        type="date"
        className="border rounded-md px-4 py-2"
        value={filters.startDate}
        onChange={filterJobFn}
      />

      <input
        name="endDate"
        type="date"
        className="border rounded-md px-4 py-2"
        value={filters.endDate}
        onChange={filterJobFn}
      />
    </div>
  );
};

export default FilterJob;
