import { Building, Shield, UserRound, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserPersonalSettingsComponent from "../../components/user/settings/UserPersonalSettingsComponent";
import UserBuisnessSettingsComponent from "../../components/user/settings/UserBuisnessSettingsComponent";
import UserSecuritySettingsComponent from "../../components/user/settings/UserSecuritySettingsComponent";
import { toast } from "react-toastify";
import axios from "axios";

function UserProfileSettingsPage() {
  const [navTabs, setNavTabs] = useState("personal-info");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");

  const tabs = [
    { key: "personal-info", label: "Personal Info", icon: UserRound },
    { key: "buisness-info", label: "Business Info", icon: Building },
    { key: "security", label: "Security & Privacy", icon: Shield },
  ];

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/users/fetch-user/${userId}`,
      )
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Failed to fetch profile");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#f8fafc] sm:px-8 px-4 py-10">
      {/* -------------------- PAGE HEADING -------------------- */}
      <div className="mb-10">
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
          Account Management
        </span>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight font-montserrat">
          Settings
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* -------------------- LEFT SIDEBAR -------------------- */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto" />
                <div className="h-4 w-32 bg-slate-200 rounded mx-auto" />
                <div className="h-3 w-48 bg-slate-200 rounded mx-auto" />
              </div>
            ) : (
              <>
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 rounded-3xl bg-slate-900 flex items-center justify-center text-3xl font-black text-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                    {userData.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-xl border-4 border-white shadow-lg">
                    <CheckCircle size={14} />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight mt-4">
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-slate-500 font-medium text-sm break-all">
                  {userData.email}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Verified Account
                  </span>
                </div>
              </>
            )}
          </div>

          {/* NAVIGATION TABS */}
          <nav className="bg-white rounded-3xl shadow-sm border border-slate-200 p-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = navTabs === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setNavTabs(tab.key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      isActive
                        ? "text-blue-400"
                        : "text-slate-400 group-hover:text-slate-600"
                    }
                  />
                  <span className="font-bold text-sm tracking-tight">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* -------------------- SETTINGS CONTENT -------------------- */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-4xl shadow-sm border border-slate-200 overflow-hidden min-h-150">
          <div className="p-8 md:p-12">
            {navTabs === "personal-info" && <UserPersonalSettingsComponent />}
            {navTabs === "buisness-info" && <UserBuisnessSettingsComponent />}
            {navTabs === "security" && <UserSecuritySettingsComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileSettingsPage;
