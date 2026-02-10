import { ChevronDown, Eye, EyeClosed, RefreshCw, Save } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserSecuritySettingsComponent() {
  // ==================== USE STATES ====================
  const defaultData = {
    currentPassword: "3104944Tony",
    newPassword: "",
    confirmPassword: "",
    enableTwoFactorAuthentication: false,
    sendNotificationsWhenLogined: true,
  };
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
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

    // ==================== VALIDATIONS ====================
    if (!data.confirmPassword && !data.currentPassword && !data.newPassword) {
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

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password do not match...");
      return;
    }

    const payload = {
      ...data,
    };
    toast.success("Form submitted successfully...");
    console.log("SECURITY DATA FOR SUBMITTED: ", payload);
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
        {/* ==================== CURRENT PASSWORD ==================== */}
        {inputComponent(
          "Current Password",
          data.currentPassword,
          "currentPassword",
          showCurrentPassword,
          setShowCurrentPassword,
          "Enter Your Current Password",
        )}
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

        {/* ==================== SECURITY CHECKBOXES ==================== */}
        <div className="p-3 space-y-4 border-l-3 border-green-500 rounded-lg bg-gray-100">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
              checked={data.enableTwoFactorAuthentication}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  enableTwoFactorAuthentication: e.target.checked,
                }))
              }
            />

            <label className="font-medium text-gray-700">
              Enable Two-Factor Authentication
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
              checked={data.sendNotificationsWhenLogined}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  sendNotificationsWhenLogined: e.target.checked,
                }))
              }
            />

            <label className="font-medium text-gray-700">
              Send login alerts to email
            </label>
          </div>
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
