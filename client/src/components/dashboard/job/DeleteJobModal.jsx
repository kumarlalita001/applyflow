import React from 'react';
import Loader from '../../common/Loader';
import { useDeleteJob } from '../../../hooks/job/useDeleteJob';

const DeleteJobModal = ({ selectedApplication, onClose,refetchFn }) => {

  const { loading, deleteJob } = useDeleteJob({
    onSuccess: () => {
      refetchFn((prev) => !prev);
      onClose();
    },
  });
 

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">
          Are you sure you want to delete this application?
        </h2>

        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span className="font-medium">Company:</span>
            <span>{selectedApplication.company}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span>{selectedApplication.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span>{selectedApplication.status}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 cursor-pointer text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteJob(selectedApplication._id)}
            disabled={loading}
            className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        {loading && <Loader/>}
      </div>
    </div>
  );
};

export default DeleteJobModal;
