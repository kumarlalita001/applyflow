// src/hooks/useEditJobForm.js

import { useState } from "react";
import { putData } from "../../api/axiosConfig";
import { ErrorToast, SuccessToast } from "../../utils/Toast";

const useEditJob = (initialData, onClose, refetchFn) => {
  const [form, setForm] = useState({ ...initialData });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await putData(
        `/api/v0/jobpost/${form._id}/`,
        JSON.stringify(form)
      );
      SuccessToast(result.message || "Job updated successfully!");
      refetchFn((prev) => !prev);
      onClose();
    } catch (error) {
      ErrorToast(error.message || "Something went wrong while updating.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useEditJob;
