import { ChevronDown, RefreshCw, Save } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserBuisnessSettingsComponent() {
  // ==================== USE STATES ====================
  const defaultData = {
    company: "Tech Solutions Inc",
    description: "Professional software developer with 5+ years experience",
  };

  const defaultFilters = {
    buisnessCategory: "",
    buisnessType: "",
  };

  const [data, setData] = useState(defaultData);
  const [filters, setFilters] = useState(defaultFilters);

  const [openDropdown, setOpenDropdown] = useState(null);

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
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
        <input
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 mt-1
                focus:border-blue-800 focus:ring-2 focus:ring-blue-800
                  transition-colors ease-in-out duration-300"
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
      <div className="flex flex-col w-full">
        <label className="font-medium text-gray-700">{label}</label>

        <div className="relative mt-1">
          <button
            type="button"
            className={`w-full flex justify-between py-2 px-3 border-2 border-gray-300 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-blue-800 ${
              filters[fieldKey] ? "text-black" : "text-gray-400"
            }`}
            onClick={() =>
              setOpenDropdown(openDropdown === fieldKey ? null : fieldKey)
            }
          >
            {filters[fieldKey] || defaultLabel}
            <ChevronDown />
          </button>

          <div
            className={`absolute z-10 bg-white top-12 shadow-xl w-full origin-top transition-all ease-in-out duration-300 ${
              scrollable ? "max-h-70 overflow-auto" : ""
            } ${
              openDropdown === fieldKey
                ? "scale-y-100 opacity-100 pointer-events-auto"
                : "scale-y-0 opacity-0 pointer-events-none"
            }`}
          >
            {options.map((item, i) => (
              <h4
                key={i}
                className="p-2 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSelect(fieldKey, item)}
              >
                {item}
              </h4>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ==================== INPUT HANDLERS ====================
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setOpenDropdown(null);
  };

  // ==================== FORM JS ====================
  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...data,
      buisnessCategory: filters.buisnessCategory,
      buisnessType: filters.buisnessType,
    };
    toast.success("Form submitted successfully...");
    console.log("BUISNESS DATA FOR SUBMITTED: ", payload);
  };
  return (
    <div className="py-4 px-5">
      {/* -------------------- HEADING -------------------- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Buisness Information
        </h1>
        <p className="mt-1 text-gray-500 text-lg">
          Manage your business profile and listing preferences
        </p>
      </div>

      <div className="h-[1.5px] bg-gray-200 w-full rounded-full my-7.5" />

      {/* ==================== FORM ==================== */}
      <form onSubmit={handlePersonalSubmit} className="space-y-5">
        {/* ==================== TOAST CONTAINER ==================== */}
        <ToastContainer position="top-right" autoClose={2500} theme="light" />
        {/* ==================== COMPANY NAME ==================== */}
        {inputComponent(
          "Company/Business Name",
          data.company,
          "company",
          "text",
          "Enter Your Company Name",
        )}

        {/* ==================== COMPANY DESCRIPTION ==================== */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="companyDescription"
            className="font-medium text-gray-700"
          >
            Company Description
          </label>
          <textarea
            name="companyDescription"
            value={data.description}
            placeholder="Describe YOur Company"
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800
            transition-colors ease-in-out duration-300 resize-none"
            rows={5}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* ==================== BUISNESS CATEGORY & TYPE ==================== */}
        <div className="flex items-center justify-center gap-5">
          {/* -------------------- BUISNESS CATEGORY -------------------- */}
          {selectComponent(
            "Select Buisness Category",
            "Buisness Category",
            "buisnessCategory",
            selectOptions.buisnessCategory,
            true,
          )}
          {/* -------------------- BUISNESS TYPE -------------------- */}
          {selectComponent(
            "Select Buisness Type",
            "Buisness Type",
            "buisnessType",
            selectOptions.buisnessType,
            true,
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
              setPersonlData(defaultPersonalData);
              setFilters(defaultFilters);
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

export default UserBuisnessSettingsComponent;
