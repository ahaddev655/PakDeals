import axios from "axios";
import { ChevronDown, Eye, EyeClosed, RefreshCw, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserSecuritySettingsComponent() {
  // ==================== USE STATES ====================
  const defaultData = {
    newPassword: "",
    confirmPassword: "",
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState(defaultData);

  // ==================== REUSABLE COMPONENTS ====================
  const inputComponent = (
    label,
    value,
    name,
    showPassword,
    setShowPassword,
    placeholder,
  ) => {
    return (
      <div className="flex flex-col w-full relative">
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          placeholder={placeholder}
          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 mt-1
        focus:border-blue-800 focus:ring-2 focus:ring-blue-800
        transition-colors ease-in-out duration-300"
          onChange={handleInputChange}
        />

        <div
          className="absolute top-[55%] right-3 w-6 h-6 hover:text-blue-800 transition-colors ease-linear cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeClosed /> : <Eye />}
        </div>
      </div>
    );
  };

  // ==================== INPUT HANDLERS ====================
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ==================== FORM JS ====================
  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    // -------------------- VALIDATIONS --------------------
    if (!data.confirmPassword && !data.newPassword) {
      toast.error("All fields are required...");
      return;
    }

    if (!data.confirmPassword?.trim()) {
      toast.error("Confirm your password...");
      return;
    }

    if (!data.newPassword?.trim()) {
      toast.error("New password is required...");
      return;
    }
    if (data.newPassword < 12) {
      toast.error("New password should be 12 characters long...");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password do not match...");
      return;
    }

    const payload = {
      ...data,
    };
    // -------------------- API CONFIGURATION --------------------
    const userId = localStorage.getItem("userId");
    axios
      .put(
        `https://pak-deals-backend.vercel.app/api/users/update-password/${userId}`,
        payload,
      )
      .then((response) => {
        console.log(response.data);
        setData({
          newPassword: "",
          confirmPassword: "",
        });
        toast.success(
          response?.response?.data?.message ||
            response?.data?.message ||
            "Form submitted successfully...",
        );
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.error ||
            error?.response?.error ||
            "Internal Server Error",
        );
      });
  };
  return (
    <div className="py-4 px-5">
      {/* -------------------- HEADING -------------------- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Security Settings</h1>
        <p className="mt-1 text-gray-500 text-lg">
          Manage your password and security preferences
        </p>
      </div>

      <div className="h-[1.5px] bg-gray-200 w-full rounded-full my-7.5" />

      {/* ==================== FORM ==================== */}
      <form onSubmit={handlePersonalSubmit} className="space-y-5">
        {/* ==================== TOAST CONTAINER ==================== */}
        <ToastContainer position="top-right" autoClose={2500} theme="light" />
        {/* ==================== NEW AND CONFIRM PASSWORD ==================== */}
        <div className="flex items-center gap-3">
          {inputComponent(
            "New Password",
            data.newPassword,
            "newPassword",
            showNewPassword,
            setShowNewPassword,
            "Enter Your New Password",
          )}
          {inputComponent(
            "Confirm Password",
            data.confirmPassword,
            "confirmPassword",
            showConfirmPassword,
            setShowConfirmPassword,
            "Confirm Your New Password",
          )}
        </div>

        {/* -------------------- SUBMIT BUTTONS -------------------- */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="submit"
            className="flex items-center gap-3 py-3 px-6 bg-blue-800 w-full rounded-md text-white font-medium hover:bg-blue-900 transition-colors duration-300 ease-in-out"
          >
            <Save />
            Submit changes
          </button>

          <button
            type="button"
            className="flex items-center gap-3 py-3 px-6 bg-gray-600 w-full rounded-md text-white font-medium hover:bg-gray-700 transition-colors duration-300 ease-in-out"
            onClick={() => {
              setData(defaultData);
            }}
          >
            <RefreshCw />
            Reset settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSecuritySettingsComponent;
