import axios from "axios";
import { ChevronDown, RefreshCw, Save, Building2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserBuisnessSettingsComponent() {
  // ==================== USE STATES & VARIABLES ====================
  const userId = localStorage.getItem("id");

  const defaultData = {
    company: "",
    description: "",
    buisnessCategory: "",
    buisnessType: "",
  };

  const [data, setData] = useState(defaultData);
  const [initialData, setInitialData] = useState(defaultData); // For Reset functionality
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selectOptions = {
    buisnessCategory: [
      "Electronics",
      "Automotive",
      "Real Estate",
      "Services",
      "Fashion",
    ],
    buisnessType: ["Individual", "Small Buisness", "Corporation", "Non-Profit"],
  };

  // ==================== REUSABLE COMPONENTS ====================
  const inputComponent = (label, value, name, inputType, placeholder) => {
    return (
      <div className="flex flex-col w-full">
        <label
          htmlFor={name}
          className="text-sm font-black text-slate-700 uppercase tracking-wider mb-2"
        >
          {label}
        </label>
        <input
          type={inputType}
          name={name}
          value={value || ""}
          placeholder={placeholder}
          className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 
                 focus:border-blue-800 focus:ring-4 focus:ring-blue-50
                 transition-all ease-in-out duration-300 outline-none font-medium"
          onChange={handleInputChange}
        />
      </div>
    );
  };

  const selectComponent = (
    defaultLabel,
    label,
    fieldKey,
    options,
    scrollable,
  ) => {
    return (
      <div className="flex flex-col w-full relative">
        <label className="text-sm font-black text-slate-700 uppercase tracking-wider mb-2">
          {label}
        </label>

        <button
          type="button"
          className={`w-full flex justify-between items-center py-3 px-4 border-2 border-gray-100 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-50 bg-white ${
            data[fieldKey]
              ? "text-slate-900 font-bold"
              : "text-gray-400 font-medium"
          }`}
          onClick={() =>
            setOpenDropdown(openDropdown === fieldKey ? null : fieldKey)
          }
        >
          {data[fieldKey] || defaultLabel}
          <ChevronDown
            className={`transition-transform duration-300 ${openDropdown === fieldKey ? "rotate-180" : ""}`}
          />
        </button>

        {openDropdown === fieldKey && (
          <div
            className={`absolute z-20 bg-white top-full mt-2 shadow-2xl w-full rounded-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 ${
              scrollable ? "max-h-60 overflow-y-auto" : ""
            }`}
          >
            {options.map((item, i) => (
              <h4
                key={i}
                className="px-4 py-3 cursor-pointer hover:bg-blue-50 text-slate-600 font-bold text-sm transition-colors"
                onClick={() => handleSelect(fieldKey, item)}
              >
                {item}
              </h4>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ==================== INPUT HANDLERS ====================
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
  };

  // ==================== FORM JS ====================
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    axios
      .put(
        `https://pak-deals-backend.vercel.app/api/users/update-buisness-profile/${userId}`,
        data,
      )
      .then((response) => {
        setInitialData(data); // Update reset point to current data
        toast.success(
          response?.data?.message || "Profile Updated Successfully",
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Update Failed");
      })
      .finally(() => setSaving(false));
  };

  // ==================== DATA FETCHING ====================
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/users/fetch-user/${userId}`,
      )
      .then((response) => {
        const fetchedData = {
          company: response.data.user.company || "",
          description: response.data.user.description || "",
          buisnessCategory: response.data.user.buisnessCategory || "",
          buisnessType: response.data.user.buisnessType || "",
        };
        setData(fetchedData);
        setInitialData(fetchedData);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Failed to fetch data");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <RefreshCw className="animate-spin text-blue-800" size={40} />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">
          Fetching Business Data...
        </p>
      </div>
    );

  return (
    <div className="py-6 px-4 max-w-4xl">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* -------------------- HEADING -------------------- */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-50 p-3 rounded-2xl text-blue-800">
          <Building2 size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Business Information
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your professional identity and listing preferences
          </p>
        </div>
      </div>

      <div className="h-0.5 bg-slate-100 w-full rounded-full mb-10" />

      {/* ==================== FORM ==================== */}
      <form onSubmit={handlePersonalSubmit} className="space-y-8">
        {/* Company Name */}
        {inputComponent(
          "Company/Business Name",
          data.company,
          "company",
          "text",
          "e.g. Pak Deals Motors",
        )}

        {/* Company Description */}
        <div className="flex flex-col w-full">
          <label className="text-sm font-black text-slate-700 uppercase tracking-wider mb-2">
            Company Description
          </label>
          <textarea
            name="description"
            value={data.description || ""}
            placeholder="Tell your customers about your business..."
            className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-blue-800 focus:ring-4 focus:ring-blue-50
                       transition-all ease-in-out duration-300 resize-none font-medium min-h-37.5"
            rows={5}
            onChange={handleInputChange}
          />
        </div>

        {/* Buisness Category & Type */}
        <div className="grid md:grid-cols-2 gap-6">
          {selectComponent(
            "Select Buisness Category",
            "Buisness Category",
            "buisnessCategory",
            selectOptions.buisnessCategory,
            true,
          )}
          {selectComponent(
            "Select Buisness Type",
            "Buisness Type",
            "buisnessType",
            selectOptions.buisnessType,
            true,
          )}
        </div>

        {/* -------------------- SUBMIT BUTTONS -------------------- */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-3 py-4 px-8 bg-blue-900 w-full rounded-xl text-white font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70"
          >
            {saving ? (
              <RefreshCw className="animate-spin" />
            ) : (
              <Save size={20} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-3 py-4 px-8 bg-slate-100 w-full rounded-xl text-slate-600 font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            onClick={() => setData(initialData)}
          >
            <RefreshCw size={20} />
            Reset Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserBuisnessSettingsComponent;
