import React, { useEffect } from "react";
import UserAdsComponent from "../../components/user/UserAdsComponent";
import { useNavigate } from "react-router-dom";

function AdminAdsPage() {
  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
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
    <div className="space-y-8 sm:px-6 px-2.5 py-6">
      {/* -------------------- HEADING -------------------- */}
      <div className="space-y-3 mb-6">
        <h1 className="text-3xl font-semibold">My Ads</h1>
        <p className="text-gray-500">Manage all your listings here</p>
      </div>
      {/* -------------------- LISTING TABLE -------------------- */}
      <UserAdsComponent />
    </div>
  );
}

export default AdminAdsPage;
