import React from "react";

const ShimmerTable = () => {
  const shimmerRows = Array(5).fill(0); // 5 rows of shimmer

  return (
    <div className="bg-white w-full rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-gray-200 animate-pulse">
          <thead className="bg-gray-50">
            <tr>
              {["Company", "Role", "Status", "Date Applied", "Actions"].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shimmerRows.map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {Array(5).fill(0).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 bg-white animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
};

export default ShimmerTable;
