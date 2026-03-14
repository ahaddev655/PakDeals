import axios from "axios";
import {
  Eye,
  EyeClosed,
  RefreshCw,
  Save,
  ShieldCheck,
  Lock,
} from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserSecuritySettingsComponent() {
  // ==================== USE STATES ====================
  const defaultData = {
    newPassword: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(defaultData);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==================== INPUT HANDLERS ====================
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ==================== REUSABLE INPUT COMPONENT ====================
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
        <label
          htmlFor={name}
          className="text-sm font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2"
        >
          <Lock size={14} className="text-slate-400" />
          {label}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            placeholder={placeholder}
            className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 pr-12
                     focus:border-blue-800 focus:ring-4 focus:ring-blue-50
                     transition-all ease-in-out duration-300 outline-none font-medium text-slate-900"
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-800 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
    );
  };

  // ==================== FORM SUBMISSION ====================
  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    // -------------------- VALIDATIONS --------------------
    if (!data.newPassword?.trim() || !data.confirmPassword?.trim()) {
      toast.error("Both password fields are required.");
      return;
    }

    if (data.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const userId = localStorage.getItem("id");

    axios
      .put(
        `https://pak-deals-backend.vercel.app/api/users/update-password/${userId}`,
        data,
      )
      .then((response) => {
        setData(defaultData);
        toast.success(
          response?.data?.message || "Password updated successfully!",
        );
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.error || "Failed to update password.",
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="py-6 px-4 max-w-4xl">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* -------------------- HEADING -------------------- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-50 p-3 rounded-2xl text-blue-800 shadow-sm">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Security Settings
          </h1>
          <p className="text-gray-500 font-medium">
            Strengthen your account by updating your password
          </p>
        </div>
      </div>

      <div className="h-0.5 bg-slate-100 w-full rounded-full mb-10" />

      {/* ==================== FORM ==================== */}
      <form
        onSubmit={handlePersonalSubmit}
        className="space-y-8 bg-white rounded-2xl p-2"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {inputComponent(
            "New Password",
            data.newPassword,
            "newPassword",
            showNewPassword,
            setShowNewPassword,
            "••••••••••••",
          )}
          {inputComponent(
            "Confirm Password",
            data.confirmPassword,
            "confirmPassword",
            showConfirmPassword,
            setShowConfirmPassword,
            "••••••••••••",
          )}
        </div>

        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex gap-3">
          <ShieldCheck className="text-blue-800 shrink-0" size={20} />
          <p className="text-sm text-blue-900 leading-relaxed font-medium">
            Tip: Use a mix of uppercase, lowercase, numbers, and symbols to
            create a stronger password.
          </p>
        </div>

        {/* -------------------- ACTION BUTTONS -------------------- */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-3 py-4 px-8 bg-blue-900 text-white font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <RefreshCw className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {isSubmitting ? "Updating..." : "Submit Changes"}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-3 py-4 px-8 bg-slate-100 text-slate-600 font-black uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
            onClick={() => setData(defaultData)}
          >
            <RefreshCw size={20} />
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSecuritySettingsComponent;
