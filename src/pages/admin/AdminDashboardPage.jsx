import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDataCardsComponent from "../../components/admin/AdminDataCardsComponent";

function AdminDashboardPage() {
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

  const [totalListings, setTotalListings] = useState(Number(null));
  const [activeListings, setActiveListings] = useState(Number(null));
  const [blogs, setBlogs] = useState(Number(null));
  const [users, setUsers] = useState(Number(null));
  const [loading, setLoading] = useState(true);
  return (
    <div className="space-y-8 sm:px-6 px-2.5 py-6">
      <AdminDataCardsComponent
        totalListings={totalListings}
        activeListings={activeListings}
        blogs={blogs}
        users={users}
        loading={loading}
      />
    </div>
  );
}

export default AdminDashboardPage;
