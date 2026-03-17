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
    <div>
      <AdminUserComponent />
    </div>
  );
}

export default AdminUserPage;
