import { Bell, Building, Camera, Shield, UserRound } from "lucide-react";
import React, { useState } from "react";
import UserPersonalSettingsComponent from "../../components/user/settings/UserPersonalSettingsComponent";
import UserBuisnessSettingsComponent from "../../components/user/settings/UserBuisnessSettingsComponent";
import UserSecuritySettingsComponent from "../../components/user/settings/UserSecuritySettingsComponent";
import UserNotificationSettingsComponent from "../../components/user/settings/UserNotificationSettingsComponent";

function UserProfileSettingsPage() {
  // ==================== NAVIGATION TABS JS ====================
  const [navTabs, setNavTabs] = useState("personal-info");
  const tabs = [
    {
      key: "personal-info",
      label: "Personal Info",
      icon: UserRound,
    },
    {
      key: "buisness-info",
      label: "Buisness Info",
      icon: Building,
    },
    {
      key: "security",
      label: "Security",
      icon: Shield,
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: Bell,
    },
  ];
  return (
    <div className="sm:px-6 px-2.5 py-6">
      <div className="flex justify-center gap-6">
        <div className="lg:w-[30%] w-full rounded-lg space-y-6">
          {/* -------------------- PROFILE -------------------- */}
          <div className="w-full bg-white shadow-md rounded-lg p-3.75">
            {/* -------------------- PROFILE IMAGE -------------------- */}
            <div className="relative w-25 h-25 border-4 border-[#e2e8f0] rounded-full mx-auto">
              <img
                src="/assets/profile.jpg"
                alt="IMG"
                className="w-full rounded-full border-4 border-blue-800 object-cover"
              />
              <div className="absolute bottom-0 right-0 border-2 bg-blue-800 border-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-blue-900 hover:scale-102 transition-transform duration-200 ease-in-out cursor-pointer">
                <Camera className="text-white w-5 h-5" />
              </div>
            </div>
            {/* -------------------- PROFILE NAME -------------------- */}
            <div className="text-center space-y-1 mt-4">
              <h3 className="text-2xl font-semibold">John Doe</h3>
              <p className="text-gray-500 font-light">john.doe@example.com</p>
            </div>
            {/* -------------------- VERIFIED -------------------- */}
            <div className="bg-green-700 text-center py-1 px-1 rounded-full w-21 text-xs mx-auto mt-3">
              <span className="text-white font-semibold uppercase tracking-wide">
                verified
              </span>
            </div>
          </div>
          {/* -------------------- NAVIGATION TABS -------------------- */}
          <div className="w-full bg-white shadow-md rounded-lg p-3.75 space-y-1">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <div
                  key={i}
                  className={`${navTabs === tab.key ? "text-white bg-blue-800 shadow-xl" : "hover:bg-blue-100 hover:text-blue-900 text-gray-600"} transition-colors duration-200 ease-in-out cursor-pointer p-3 rounded-lg flex items-center gap-5`}
                  onClick={() => setNavTabs(tab.key)}
                >
                  <Icon />
                  <h1 className="font-medium">{tab.label}</h1>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:w-[75%] w-full bg-white shadow-md rounded-lg">
          {navTabs === "personal-info" ? (
            <UserPersonalSettingsComponent />
          ) : navTabs === "buisness-info" ? (
            <UserBuisnessSettingsComponent />
          ) : navTabs === "security" ? (
            <UserSecuritySettingsComponent />
          ) : (
            <UserNotificationSettingsComponent />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileSettingsPage;
