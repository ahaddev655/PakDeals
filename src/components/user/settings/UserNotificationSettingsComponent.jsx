import { ChevronDown, Eye, EyeClosed, RefreshCw, Save } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function UserNotificationSettingsComponent() {
  // ==================== USE STATES ====================
  const defaultData = {
    emailNotifications: false,
    sendMsgsToBuyers: false,
    listingStatus: false,
    receiveSms: false,
    urgentMessagesOnly: false,
  };

  const [data, setData] = useState(defaultData);

  // ==================== INPUT HANDLERS ====================
  const handleInputChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ==================== FORM JS ====================
  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...data,
    };
    toast.success("Form submitted successfully...");
    console.log("NOTIFICATIONS DATA FOR SUBMITTED: ", payload);
  };
  return (
    <div className="py-4 px-5">
      {/* -------------------- HEADING -------------------- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Notification Preferences
        </h1>
        <p className="mt-1 text-gray-500 text-lg">
          Choose how you want to receive notifications
        </p>
      </div>

      <div className="h-[1.5px] bg-gray-200 w-full rounded-full my-7.5" />

      {/* ==================== FORM ==================== */}
      <form onSubmit={handlePersonalSubmit} className="space-y-5">
        {/* ==================== TOAST CONTAINER ==================== */}
        <ToastContainer position="top-right" autoClose={2500} theme="light" />
        {/* ==================== EMAIL NOTIFICATIONS ==================== */}
        <div className="p-3 space-y-4 border-l-3 border-blue-800 rounded-lg bg-gray-100">
          <h1 className="text-lg font-semibold text-gray-600">
            Email Notifications
          </h1>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
              checked={data.emailNotifications}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  emailNotifications: e.target.checked,
                }))
              }
            />

            <label className="font-medium text-gray-700">
              Receive email notifications
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
              checked={data.sendMsgsToBuyers}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  sendMsgsToBuyers: e.target.checked,
                }))
              }
            />

            <label className="font-medium text-gray-700">
              New messages from buyers
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
              checked={data.listingStatus}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  listingStatus: e.target.checked,
                }))
              }
            />

            <label className="font-medium text-gray-700">
              Listing status updates
            </label>
          </div>
        </div>
        {/* ==================== SMS NOTIFICATIONS ==================== */}
        <div className="p-3 space-y-4 border-l-3 border-blue-800 rounded-lg bg-gray-100">
          <h1 className="text-lg font-semibold text-gray-600">
            SMS Notifications
          </h1>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
              checked={data.receiveSms}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  receiveSms: e.target.checked,
                }))
              }
            />

            <label className="font-medium text-gray-700">
              Receive SMS notifications
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
              checked={data.urgentMessagesOnly}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  urgentMessagesOnly: e.target.checked,
                }))
              }
            />

            <label className="font-medium text-gray-700">
              Urgent messages only
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

export default UserNotificationSettingsComponent;
