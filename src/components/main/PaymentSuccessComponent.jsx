import React, { useEffect } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-4 font-sans antialiased">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 text-center border border-white relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500 rounded-full blur-[80px] opacity-10"></div>

        {/* Success Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="bg-green-50 p-4 rounded-full">
            <CheckCircle2
              size={64}
              className="text-green-500 animate-bounce-short"
            />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
          Payment Successful!
        </h2>
        <p className="text-slate-500 leading-relaxed mb-10">
          Your ad has been successfully boosted. It will now appear at the top
          of the listings for the selected duration.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/user-dashboard/my-ads")}
            className="w-full bg-blue-600 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-100 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-[0.98]"
          >
            Go to My Ads
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
          >
            <ShoppingBag size={18} />
            Back to Marketplace
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-8 border-t border-slate-50">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <ExternalLink size={12} />A receipt has been sent to your email
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessComponent;
