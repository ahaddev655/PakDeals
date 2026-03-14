import {
  ChevronDown,
  RefreshCw,
  Save,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function UserPersonalSettingsComponent() {
  const userId = localStorage.getItem("id");
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    city: "",
    address: "",
    country: "",
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleInputChange = (e) => {
    setPersonalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (key, value) => {
    setPersonalData((prev) => ({ ...prev, [key]: value }));
    setOpenDropdown(null);
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    // Validations (Keep your logic exactly as is)
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
    if (!String(personalData.firstName || "")?.trim()) {
      toast.error("First name is required...");
      return;
    }
    if (!String(personalData.lastName || "")?.trim()) {
      toast.error("Last name is required...");
      return;
    }
    if (!String(personalData.email || "")?.trim()) {
      toast.error("Email address is required...");
      return;
    }
    if (!String(personalData.mobileNumber || "")?.trim()) {
      toast.error("Mobile Number is required...");
      return;
    }
    if (String(personalData.mobileNumber || "")?.trim().length > 11) {
      toast.error("Mobile Number is invalid...");
      return;
    }
    if (!String(personalData.country || "")?.trim()) {
      toast.error("Country is required...");
      return;
    }

    axios
      .put(
        `https://pak-deals-backend.vercel.app/api/users/update-personal-profile/${userId}`,
        personalData,
      )
      .then((response) => {
        toast.success(
          response?.data?.message || "Profile updated successfully!",
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/users/fetch-user/${userId}`,
      )
      .then((response) => {
        setPersonalData(response.data.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // REUSABLE SUB-COMPONENTS (Refined Styles)
  const inputComponent = (
    label,
    value,
    name,
    inputType,
    placeholder,
    required,
    Icon,
  ) => (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-gray-600 mb-1.5 flex items-center gap-2"
      >
        {Icon && <Icon size={14} className="text-gray-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={inputType}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400
                   focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all duration-200 outline-none shadow-sm"
        onChange={handleInputChange}
      />
    </div>
  );

  const selectComponent = (
    defaultLabel,
    label,
    fieldKey,
    options,
    scrollable,
    required,
  ) => (
    <div className="flex flex-col w-full relative">
      <label className="text-sm font-semibold text-gray-600 mb-1.5 flex items-center gap-2">
        <MapPin size={14} className="text-gray-400" />
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        className={`w-full flex justify-between items-center py-2.5 px-4 border border-gray-300 rounded-xl transition-all duration-200 
                    focus:ring-4 focus:ring-blue-50 focus:border-blue-600 bg-white shadow-sm ${
                      personalData[fieldKey]
                        ? "text-gray-900 font-medium"
                        : "text-gray-400"
                    }`}
        onClick={() =>
          setOpenDropdown(openDropdown === fieldKey ? null : fieldKey)
        }
      >
        {personalData[fieldKey] || defaultLabel}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${openDropdown === fieldKey ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute z-20 bg-white border border-gray-100 top-18 shadow-2xl w-full rounded-xl overflow-hidden origin-top transition-all duration-300 ${
          openDropdown === fieldKey
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className={scrollable ? "max-h-60 overflow-y-auto" : ""}>
          {options.map((item, i) => (
            <div
              key={i}
              className="px-4 py-3 cursor-pointer hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-medium transition-colors"
              onClick={() => handleSelect(fieldKey, item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 bg-white rounded-2xl">
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Personal Information
        </h1>
        <p className="text-gray-500 font-medium">
          Manage your identity and contact details across the platform.
        </p>
      </div>

      <div className="h-px bg-gray-100 w-full mb-10" />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <RefreshCw className="animate-spin text-blue-600" size={40} />
          <p className="font-bold text-gray-400">Syncing Profile...</p>
        </div>
      ) : (
        <form onSubmit={handlePersonalSubmit} className="space-y-8">
          {/* Section: Name */}
          <div className="grid md:grid-cols-2 gap-6">
            {inputComponent(
              "First Name",
              personalData.firstName,
              "firstName",
              "text",
              "John",
              true,
              User,
            )}
            {inputComponent(
              "Last Name",
              personalData.lastName,
              "lastName",
              "text",
              "Doe",
              true,
              User,
            )}
          </div>

          {/* Section: Contact */}
          <div className="grid md:grid-cols-2 gap-6">
            {inputComponent(
              "Email Address",
              personalData.email,
              "email",
              "email",
              "john@example.com",
              true,
              Mail,
            )}
            {inputComponent(
              "Mobile Number",
              personalData.mobileNumber,
              "mobileNumber",
              "tel",
              "03XXXXXXXXX",
              true,
              Phone,
            )}
          </div>

          {/* Section: Location */}
          <div className="grid md:grid-cols-2 gap-6">
            {selectComponent(
              "Select Country",
              "Country",
              "country",
              selectOptions.countries,
              true,
              true,
            )}
            {inputComponent(
              "City",
              personalData.city,
              "city",
              "text",
              "Enter your city",
              false,
              MapPin,
            )}
          </div>

          {inputComponent(
            "Full Address",
            personalData.address,
            "address",
            "text",
            "123 Business St, Area",
            false,
            MapPin,
          )}

          {/* Actions */}
          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3.5 px-8 bg-blue-700 w-full rounded-xl text-white font-bold 
                         hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
            >
              <Save size={20} />
              Save Changes
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3.5 px-8 bg-gray-50 border border-gray-200 w-full rounded-xl 
                         text-gray-600 font-bold hover:bg-gray-100 transition-all duration-300"
              onClick={() =>
                setPersonalData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  mobileNumber: "",
                  city: "",
                  address: "",
                  country: "",
                })
              }
            >
              <RefreshCw size={18} />
              Reset Form
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserPersonalSettingsComponent;
