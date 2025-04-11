import React from "react";
import Loader from "../../common/Loader";
import useEditJob from "../../../hooks/job/useEditJob";

const EditJobModal = ({ existingData, onClose ,refetchFn}) => {
  

  const { form, isLoading, handleChange, handleSubmit } = useEditJob(
    existingData,
    onClose,
    refetchFn
  );

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-left">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="relative bg-white h-[80vh] md:h-fit overflow-y-auto rounded-lg shadow-xl w-full max-w-2xl p-6 z-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Edit Job Post
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md py-2 px-3 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md py-2 px-3 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Applied Date
                </label>
                <input
                  type="date"
                  name="appliedDate"
                  value={form.appliedDate ? new Date(form.appliedDate).toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md py-2 px-3 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="w-full">
                <label className="block  text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md py-2 px-3 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {["Applied", "Interview", "Offer", "Rejected"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-md py-2 px-3 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 cursor-pointer text-gray-800 rounded-md hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 cursor-pointer text-white rounded-md hover:bg-indigo-700 text-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default EditJobModal;
