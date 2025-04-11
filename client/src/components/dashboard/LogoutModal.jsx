import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../api/axiosConfig";
import { ErrorToast, SuccessToast } from "../../utils/Toast";
import Loader from "../common/Loader";

const LogoutModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const result = await postData("/api/v0/auth/logout"); // or your actual logout route
      localStorage.removeItem("userData");
      localStorage.removeItem("applyflowtoken");
      SuccessToast(result.message || "Logout Success");
      onClose();
      navigate("/auth/login");
    } catch (error) {
      ErrorToast(error.message || "Logout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center w-full min-h-screen justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Logout</h3>
        <p className="text-sm text-gray-600">
          Are you sure you want to logout? You’ll need to login again to access
          your applications.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>

        {loading && (
          <div className="flex justify-center mt-2">
            <Loader className="w-5 h-5 text-gray-600 animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutModal;
