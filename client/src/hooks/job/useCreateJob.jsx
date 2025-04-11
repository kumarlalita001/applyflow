// src/hooks/useCreateJobForm.js

import { useState } from "react";
import { postData } from "../../api/axiosConfig";
import { ErrorToast, SuccessToast } from "../../utils/Toast";

const today = new Date().toISOString().split("T")[0];
const initialForm = {
  company: "",
  role: "",
  status: "Applied",
  appliedDate: today,
  link: "",
};

const useCreateJobForm = (onClose, refetchFn) => {
  const [form, setForm] = useState({ ...initialForm });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await postData("/api/v0/jobpost/", JSON.stringify(form));
      SuccessToast(result.message);
      refetchFn((prev) => !prev);
      onClose();
    } catch (error) {
      ErrorToast(error.message || "Something went wrong");
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

export default useCreateJobForm;
