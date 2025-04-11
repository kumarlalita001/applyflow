import { Edit2, Eye, Trash2 } from "lucide-react";
import React from "react";
import { statusColors } from "../../../pages/Dashboard";

const ShowJobTable = ({ jobs ,handleView, handleEdit, handleDelete}) => {
  return (
    <div className="overflow-x-auto ">
      <table className=" min-w-full divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left   text-xs  font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link
            </th>
            <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Applied
            </th>
            <th className="px-6 py-3 text-left   text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y  divide-gray-200">
          {jobs && jobs?.jobs?.length > 0 ? (
            jobs.jobs.map((application) => (
              <tr key={application._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      <a
                        href={application.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600"
                      >
                        {application.company}
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm rounded-full px-3 py-1 font-medium ${
                      statusColors[application.status]
                    }`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a
                    href={application.link}
                    target="_blank"
                    className="text-blue-500 hover:text-blue-900"
                  >
                    Link
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(application.appliedDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={ () => handleView(application)}
                      className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(application)}
                      className="text-blue-600 cursor-pointer hover:text-blue-900"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(application)}
                      className="text-red-600 cursor-pointer hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className=" px-6  text-center  h-[50vh] w-full">
                No JobPosts Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowJobTable;
