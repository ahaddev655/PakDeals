import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDataCardsComponent from "../../components/admin/AdminDataCardsComponent";
import axios from "axios";
import AdminChartsComponent from "../../components/admin/AdminChartsComponent";
import AdminRecentActivitiesComponent from "../../components/admin/AdminRecentActivitiesComponent";

function AdminDashboardPage() {
  const [totalListings, setTotalListings] = useState(Number(null));
  const [activeListings, setActiveListings] = useState(Number(null));
  const [blogs, setBlogs] = useState(Number(null));
  const [users, setUsers] = useState(Number(null));
  const [loading, setLoading] = useState(true);

  // ==================== API CONFIGURATION ====================
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://pak-deals-backend.vercel.app/api/admin/fetch-count")
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setActiveListings(data.active_listings);
        setUsers(data.total_users);
        setBlogs(data.total_blogs);
        setTotalListings(data.total_listings);
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
      <AdminDataCardsComponent
        totalListings={totalListings}
        activeListings={activeListings}
        blogs={blogs}
        users={users}
        loading={loading}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* CHART: Takes 2 columns on large screens */}
        <div className="lg:col-span-2 h-full">
          <AdminChartsComponent
            totalListings={totalListings}
            activeListings={activeListings}
            blogs={blogs}
            users={users}
            loading={loading}
          />
        </div>
        {/* ACTIVITIES: Takes 1 column */}
        <div className="lg:col-span-1">
          <AdminRecentActivitiesComponent />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
