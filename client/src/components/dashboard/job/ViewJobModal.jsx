import React from 'react';
import { statusColors } from '../../../pages/Dashboard';
import { shortenText } from '../../../utils/utils';

const ViewJobModal = ({ selectedApplication, closeViewJobModal }) => {
  return (
    <div className="fixed z-10 inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl h-[80vh] md:h-fit overflow-y-auto shadow-lg w-[90%] max-w-3xl p-6 relative">
        <h2 className="text-xl font-semibold text-gray-800  mb-6 border-b pb-2">Application Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company */}
          <div>
            <h4 className="text-sm text-gray-500">Company</h4>
            <p className="text-base text-gray-800">{shortenText(selectedApplication.company,15)}</p>
          </div>

          {/* Role */}
          <div>
            <h4 className="text-sm text-gray-500">Role</h4>
            <p className="text-base text-gray-800">{shortenText(selectedApplication.role,20)}</p>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-sm text-gray-500">Status</h4>
            <p className={`text-sm px-2 py-1 rounded-full inline-block ${statusColors[selectedApplication.status]}`}>
              {selectedApplication.status}
            </p>
          </div>

          {/* Applied Date */}
          <div>
            <h4 className="text-sm text-gray-500">Applied On</h4>
            <p className="text-base text-gray-800">
              {new Date(selectedApplication.appliedDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Link */}
          <div className="md:col-span-2">
            <h4 className="text-sm text-gray-500">Job Link</h4>
            <a
              href={selectedApplication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {shortenText(selectedApplication.link,50)}
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={closeViewJobModal}
            className="px-4 py-2 rounded-md cursor-pointer bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJobModal;
