import React, { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import { useDeleteJob } from "../../../hooks/job/useDeleteJob";
import  { Loader2 } from "lucide-react";

const DeleteJobModal = ({ selectedApplication, onClose, refetchFn }) => {
  const [showUndo, setShowUndo] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const { loading, deleteJob } = useDeleteJob({
    onSuccess: () => {
      refetchFn((prev) => !prev);
      onClose();
    },
  });

  useEffect(() => {
    return () => {
      if (pendingDeleteId) clearTimeout(pendingDeleteId);
    };
  }, [pendingDeleteId]);

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
            onClick={() => {
              setShowUndo(true); // show the undoModal on Ur
              const id = setTimeout(() => {
                deleteJob(selectedApplication._id);
                setShowUndo(false);
              }, 5000);
              setPendingDeleteId(id);
            }}
            disabled={loading}
            className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
        {loading && <Loader />}
      </div>
      {showUndo && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center space-y-4 animate-fadeIn">
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 text-yellow-500 animate-spin" />
            </div>
            <p className="text-gray-800 font-medium">
              Job will be deleted in 5 seconds.
            </p>
            <p className="text-sm text-gray-600">Do you want to undo?</p>
            <button
              onClick={() => {
                clearTimeout(pendingDeleteId);
                setShowUndo(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Undo
            </button>
          </div>
        </div>
      )}

      {/* {showUndo && (
        <div className="mt-4 bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded text-sm flex justify-between items-center">
          <span>Job marked for deletion.</span>
          <button
            onClick={() => {
              clearTimeout(pendingDeleteId);
              setShowUndo(false);
            }}
            className="ml-4 text-blue-600 font-medium hover:underline"
          >
            Undo
          </button>
        </div>
      )} */}
    </div>
  );
};

export default DeleteJobModal;
