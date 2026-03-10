import { Bell, Building, Camera, Shield, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import UserPersonalSettingsComponent from "../../components/user/settings/UserPersonalSettingsComponent";
import UserBuisnessSettingsComponent from "../../components/user/settings/UserBuisnessSettingsComponent";
import UserSecuritySettingsComponent from "../../components/user/settings/UserSecuritySettingsComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminProfileSettingsPage() {
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
  ];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");
  // ==================== API CONFIGURATION ====================
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/users/fetch-user/${userId}`,
      )
      .then((response) => {
        const user = response.data.user;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
        console.log("PERSONAL PROFILE API ERROR: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const userToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken && userId && userRole === "admin") {
      return;
    }
    setTimeout(() => {
      navigate("/user-dashboard");
    }, 500);
  }, []);
  return (
    <div className="sm:px-6 px-2.5 py-6">
      <div className="flex justify-center gap-6">
        <div className="lg:w-[30%] w-full rounded-lg space-y-6">
          {/* -------------------- PROFILE -------------------- */}
          <div className="w-full bg-white shadow-md rounded-lg p-3.75">
            {loading ? (
              <p className="text-center font-semibold text-xl text-gray-600">
                Loading...
              </p>
            ) : (
              <>
                {/* -------------------- PROFILE IMAGE -------------------- */}
                <div className="w-28 h-28 mx-auto mb-3">
                  <div className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-md grid place-items-center text-4xl font-semibold text-white bg-blue-900 text-clip [text-shadow:2px_2px_6px_rgba(0,0,0,0.7)]">
                    {firstName?.charAt(0)}
                  </div>
                </div>
                {/* -------------------- PROFILE NAME -------------------- */}
                <div className="text-center space-y-1 mt-4">
                  <h3 className="text-2xl font-semibold">
                    {firstName + " " + lastName}
                  </h3>
                  <p className="text-gray-500 font-light">{email}</p>
                </div>
                {/* -------------------- VERIFIED -------------------- */}
                <div className="bg-green-700 text-center py-1 px-1 rounded-full w-21 text-xs mx-auto mt-3">
                  <span className="text-white font-semibold uppercase tracking-wide">
                    verified
                  </span>
                </div>
              </>
            )}
          </div>
          {/* -------------------- NAVIGATION TABS -------------------- */}
          <div className="w-full bg-white shadow-md rounded-lg p-3.75 space-y-0.75">
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
        <div className="lg:w-[75%] w-full bg-white shadow-md rounded-lg h-fit">
          {navTabs === "personal-info" ? (
            <UserPersonalSettingsComponent />
          ) : navTabs === "buisness-info" ? (
            <UserBuisnessSettingsComponent />
          ) : (
            <UserSecuritySettingsComponent />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProfileSettingsPage;
