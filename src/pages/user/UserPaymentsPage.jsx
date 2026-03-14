import React, { useEffect } from "react";
import UserPaymentComponent from "../../components/user/UserPaymentComponent";
import { useNavigate } from "react-router-dom";

function UserPaymentsPage() {
  // ====================== AUTH CHECK ======================
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
            Security & Billing
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            Payments
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage your billing information, invoices, and transaction history.
          </p>
        </div>
      </div>

      {/* -------------------- PAYMENTS COMPONENT CONTAINER -------------------- */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <UserPaymentComponent />
      </div>
    </div>
  );
}

export default UserPaymentsPage;
