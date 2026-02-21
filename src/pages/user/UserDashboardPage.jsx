import React, { useState, useEffect } from "react";
import UserDataCardsComponent from "../../components/user/UserDataCardsComponent";
import UserDataChartComponent from "../../components/user/UserDataChartComponent";
import UserRecentActivitiesComponent from "../../components/user/UserRecentActivitiesComponent";
import { useNavigate } from "react-router-dom";

function UserDashboardPage() {
  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken && userId) {
      return;
    }
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  }, []);
  const [totalListings, setTotalListings] = useState(Number(1024));
  const [activeListings, setActiveListings] = useState(Number(1024));
  const [pendingListings, setPendingListings] = useState(Number(1024));
  const [expiredListings, setExpiredListings] = useState(Number(1024));
  return (
    <div className="space-y-8 sm:px-6 px-2.5 py-6">
      {/* -------------------- HEADING -------------------- */}
      <div className="space-y-3 mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-500">Welcome To Your Dashboard Ali Tufan</p>
      </div>
      {/* -------------------- DATA CARDS -------------------- */}
      <UserDataCardsComponent
        totalListings={totalListings}
        activeListings={activeListings}
        pendingListings={pendingListings}
        expiredListings={expiredListings}
        setTotalListings={setTotalListings}
        setActiveListings={setActiveListings}
        setPendingListings={setPendingListings}
        setExpiredListings={setExpiredListings}
      />
      {/* -------------------- DATA CHARTS & RECENT ACTIVITIES -------------------- */}
      <div className="md:grid grid-cols-3 gap-5 md:space-y-0 space-y-5">
        <UserDataChartComponent
          totalListings={totalListings}
          activeListings={activeListings}
          pendingListings={pendingListings}
          expiredListings={expiredListings}
        />
        <UserRecentActivitiesComponent />
      </div>
    </div>
  );
}

export default UserDashboardPage;
