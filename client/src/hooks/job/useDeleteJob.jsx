// hooks/useDeleteJob.js for better readbility

import { useState } from "react";
import { deleteData } from "../../api/axiosConfig";
import { ErrorToast, SuccessToast } from "../../utils/Toast";

export const useDeleteJob = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const deleteJob = async (jobId) => {
    setLoading(true);
    try {
      const result = await deleteData(`/api/v0/jobpost/${jobId}`);
      SuccessToast(result.message);
      onSuccess?.();
    } catch (error) {
      console.error('Delete failed:', error);
      ErrorToast(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteJob };
};
