import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminUserPage() {
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
  return <div>AdminUserPage</div>;
}

export default AdminUserPage;
