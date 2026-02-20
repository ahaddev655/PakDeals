import { ChevronDown, RefreshCw, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function UserPersonalSettingsComponent() {
  // ==================== USE STATES ====================

  const [personalData, setPersonalData] = useState({
    firstName: "" || null,
    lastName: "" || null,
    email: "" || "",
    mobileNumber: "" || null,
    city: "" || null,
    address: "" || null,
    country: "" || null,
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const selectOptions = {
    countries: [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "India",
      "Pakistan",
      "Bangladesh",
    ],
  };

  // ==================== REUSABLE COMPONENTS ====================
  const inputComponent = (
    label,
    value,
    name,
    inputType,
    placeholder,
    required,
  ) => {
    return (
      <div className="flex flex-col w-full">
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
          {required === true ? <span className="text-red-600"> *</span> : ""}
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
    required,
  ) => {
    return (
      <div className="flex flex-col w-full">
        <label className="font-medium text-gray-700">
          {label}
          {required ? <span className="text-red-600"> *</span> : ""}
        </label>

        <div className="relative mt-1">
          <button
            type="button"
            className={`w-full flex justify-between py-2 px-3 border-2 border-gray-300 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-blue-800 ${
              personalData[fieldKey] ? "text-black" : "text-gray-400"
            }`}
            onClick={() =>
              setOpenDropdown(openDropdown === fieldKey ? null : fieldKey)
            }
          >
            {personalData[fieldKey] || defaultLabel}
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
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (key, value) => {
    setPersonalData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setOpenDropdown(null);
  };

  // ==================== FORM JS ====================
  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    // -------------------- VALIDATIONS --------------------
    if (
      !personalData.firstName &&
      !personalData.lastName &&
      !personalData.email &&
      !personalData.country &&
      !personalData.mobileNumber
    ) {
      toast.error("All fields are required...");
      return;
    }

    if (!personalData.firstName?.trim()) {
      toast.error("First name is required...");
      return;
    }

    if (!personalData.lastName?.trim()) {
      toast.error("Last name is required...");
      return;
    }

    if (!personalData.email?.trim()) {
      toast.error("Email address is required...");
      return;
    }

    if (!personalData.mobileNumber?.trim()) {
      toast.error("Mobile Number is required...");
      return;
    }

    if (!personalData.country?.trim()) {
      toast.error("Country is required...");
      return;
    }

    const payload = {
      ...personalData,
    };

    setPersonalData({
      firstName: "" || null,
      lastName: "" || null,
      email: "" || "",
      mobileNumber: "" || null,
      city: "" || null,
      address: "" || null,
      country: "" || null,
    });
    toast.success("Form submitted successfully...");
    console.log("PERSONAL DATA FOR SUBMITTED: ", payload);
  };

  // ==================== USER PERSONAL DATA API CONFIGURATION JS ====================
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/user/${userId}`)
      .then((response) => {
        setPersonalData(response.data.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
        console.log("PERSONAL PROFILE API ERROR: ", error);
      });
  }, []);
  return (
    <div className="py-4 px-5">
      {/* -------------------- HEADING -------------------- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h1>
        <p className="mt-1 text-gray-500 text-lg">
          Update your personal details and contact information
        </p>
      </div>

      <div className="h-[1.5px] bg-gray-200 w-full rounded-full my-7.5" />

      {/* ==================== FORM ==================== */}
      <form onSubmit={handlePersonalSubmit} className="space-y-5">
        {/* ==================== TOAST CONTAINER ==================== */}
        <ToastContainer position="top-right" autoClose={2500} theme="light" />
        {/* ==================== FIRST & LAST NAME ==================== */}
        <div className="flex items-center justify-center gap-5">
          {/* -------------------- FIRST NAME -------------------- */}
          {inputComponent(
            "First Name",
            personalData.firstName,
            "firstName",
            "text",
            "Enter Your First Name",
            true,
          )}
          {/* -------------------- LAST NAME -------------------- */}
          {inputComponent(
            "Last Name",
            personalData.lastName,
            "lastName",
            "text",
            "Enter Your Last Name",
            true,
          )}
        </div>

        {/* ==================== EMAIL & MOBILE NUMBER ==================== */}
        <div className="flex items-center justify-center gap-5">
          {/* -------------------- EMAIL -------------------- */}
          {inputComponent(
            "Email Address",
            personalData.email,
            "email",
            "text",
            "Enter Your Email Address",
            true,
          )}
          {/* -------------------- MOBILE NUMBER -------------------- */}
          {inputComponent(
            "Mobile Number",
            personalData.mobileNumber,
            "mobileNumber",
            "tel",
            "Enter Your Mobile Number",
            true,
          )}
        </div>

        {/* ==================== COUNTRY & CITY ==================== */}
        <div className="flex items-center justify-center gap-5">
          {/* -------------------- COUNTRY -------------------- */}
          {selectComponent(
            "Select Country",
            "Country",
            "country",
            selectOptions.countries,
            true,
            true,
          )}
          {/* -------------------- CITY -------------------- */}
          {inputComponent(
            "City",
            personalData.city,
            "city",
            "text",
            "Enter Your City Name",
          )}
        </div>

        {/* ==================== ADDRESS ==================== */}
        {inputComponent(
          "Address",
          personalData.address,
          "address",
          "text",
          "Enter Your Address",
        )}

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
            onClick={() =>
              setPersonalData({
                firstName: "" || null,
                lastName: "" || null,
                email: "" || "",
                mobileNumber: "" || null,
                city: "" || null,
                address: "" || null,
                country: "" || null,
              })
            }
          >
            <RefreshCw />
            Reset settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserPersonalSettingsComponent;
