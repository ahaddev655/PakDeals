import React, { useEffect } from "react";
import UserAdsComponent from "./../../components/user/UserAdsComponent";
import { useNavigate } from "react-router-dom";

function UserAdsPage() {
  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken || !userId) {
      const timer = setTimeout(() => {
        navigate("/signup");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userToken, userId, navigate]);

  return (
    <div className="min-h-screen bg-[#f8fafc] sm:px-8 px-4 py-8">
      {/* -------------------- HEADING SECTION -------------------- */}
      <div className="mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
            Inventory Management
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            My Ads
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Review, edit, or remove your current marketplace listings.
          </p>
        </div>
      </div>

      {/* -------------------- TABLE CONTAINER -------------------- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <UserAdsComponent />
      </div>
    </div>
  );
}

export default UserAdsPage;
