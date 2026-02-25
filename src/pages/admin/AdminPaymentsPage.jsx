import React, { useEffect } from "react";
import UserPaymentComponent from "../../components/user/UserPaymentComponent";
import { useNavigate } from "react-router-dom";

function AdminPaymentsPage() {
  // ====================== AUTH CHECK ======================
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
  return (
    <div className="space-y-8 sm:px-6 px-2.5 py-6">
      {/* -------------------- HEADING -------------------- */}
      <div className="space-y-3 mb-6">
        <h1 className="text-3xl font-semibold">Payments</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur</p>
      </div>
      {/* -------------------- PAYMENTS COMPONENT -------------------- */}
      <UserPaymentComponent />
    </div>
  );
}

export default AdminPaymentsPage;
