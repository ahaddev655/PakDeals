import React, { useEffect } from "react";
import AdminUserComponent from "../../components/admin/AdminUserComponent";
import { useNavigate } from "react-router-dom";

function AdminUserPage() {
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
    <div className="sm:px-6 px-2.5 py-6">
      <AdminUserComponent />
    </div>
  );
}

export default AdminUserPage;
