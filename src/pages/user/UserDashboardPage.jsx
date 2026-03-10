import React, { useState, useEffect } from "react";
import UserDataCardsComponent from "../../components/user/UserDataCardsComponent";
import UserDataChartComponent from "../../components/user/UserDataChartComponent";
import UserRecentActivitiesComponent from "../../components/user/UserRecentActivitiesComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboardPage() {
  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken && userId) {
      return;
    }
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  }, []);
  const [totalListings, setTotalListings] = useState(Number(null));
  const [activeListings, setActiveListings] = useState(Number(null));
  const [pendingListings, setPendingListings] = useState(Number(null));
  const [expiredListings, setExpiredListings] = useState(Number(null));
  const [loading, setLoading] = useState(true);

  // ==================== API CONFIGURATION ====================
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://pak-deals-backend.vercel.app/api/ads/all-ads")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setActiveListings(data.active_ads);
        setExpiredListings(data.expired_ads);
        setPendingListings(data.pending_ads);
        setTotalListings(data.all_ads);
      })
      .catch((error) => {
        console.log("ADS FETCH API ERROR:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        loading={loading}
      />
      {/* -------------------- DATA CHARTS & RECENT ACTIVITIES -------------------- */}
      <div className="md:grid grid-cols-3 gap-5 md:space-y-0 space-y-5">
        <UserDataChartComponent
          totalListings={totalListings}
          activeListings={activeListings}
          pendingListings={pendingListings}
          expiredListings={expiredListings}
          loading={loading}
        />
        <UserRecentActivitiesComponent />
      </div>
    </div>
  );
}

export default UserDashboardPage;
