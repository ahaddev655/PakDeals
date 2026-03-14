import React, { useState, useEffect } from "react";
import UserDataCardsComponent from "../../components/user/UserDataCardsComponent";
import UserDataChartComponent from "../../components/user/UserDataChartComponent";
import UserRecentActivitiesComponent from "../../components/user/UserRecentActivitiesComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboardPage() {
  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
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

  // ==================== DASHBOARD STATE ====================
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    sold: 0,
  });
  const [loading, setLoading] = useState(true);

  // ==================== API FETCHING ====================
  useEffect(() => {
    const fetchDashboardData = () => {
      setLoading(true);

      axios
        .get("https://pak-deals-backend.vercel.app/api/ads/all-ads")
        .then((response) => {
          const data = response.data;
          setStats({
            total: data.all_ads || 0,
            active: data.active_ads || 0,
            pending: data.pending_ads || 0,
            sold: data.sold_ads || 0,
          });
        })
        .catch((error) => {
          console.error("ADS FETCH API ERROR:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/users/fetch-user/${userId}`,
      )
      .then((response) => {
        setUserName(response.data.user.firstName + " " + response.data.user.lastName);
      })
      .catch((error) => {
        console.error(
          "Navbar Fetch Error:",
          error?.response?.data?.error || "Error",
        );
      });

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] sm:px-8 px-4 py-10">
      {/* -------------------- HEADER SECTION -------------------- */}
      <div className="mb-10">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
            Overview
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Welcome back,{" "}
            <span className="text-slate-900 font-bold">{userName}</span>. Here is
            what's happening today.
          </p>
        </div>
      </div>

      {/* -------------------- DATA CARDS (Top Row) -------------------- */}
      <div className="mb-8">
        <UserDataCardsComponent
          totalListings={stats.total}
          activeListings={stats.active}
          pendingListings={stats.pending}
          soldListings={stats.sold}
          loading={loading}
        />
      </div>

      {/* -------------------- ANALYTICS & ACTIVITIES (Bottom Row) -------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* CHART: Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <UserDataChartComponent
            totalListings={stats.total}
            activeListings={stats.active}
            pendingListings={stats.pending}
            soldListings={stats.sold}
            loading={loading}
          />
        </div>

        {/* ACTIVITIES: Takes 1 column */}
        <div className="lg:col-span-1">
          <UserRecentActivitiesComponent />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardPage;
