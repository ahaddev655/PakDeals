import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Building2,
  Copy,
  CheckCircle2,
  ArrowRight,
  SmartphoneIcon,
  UploadCloud,
  Check,
  Lock,
  Info,
  ChevronRight,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const PaymentComponent = ({ setIsPaymentSuccess }) => {
  const [activeTab, setActiveTab] = useState("easypaisa");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const removeItemArray = ["payment", "payment_date", "table_name", "ad_id"];
  const featurePrice = localStorage.getItem("payment") || "0";
  const userId = localStorage.getItem("id");
  const ad_table = localStorage.getItem("table_name");
  const ad_id = localStorage.getItem("ad_id");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      toast.success("Receipt attached successfully");
    }
  };

  const handleEasyPaisaSubmit = (e) => {
    e.preventDefault();
    if (!screenshot) {
      toast.error("Please upload the payment screenshot first.");
      return;
    }
    setLoading(true);
    const payload = {
      transaction_amount: featurePrice,
      transaction_status: 0,
      transaction_method: activeTab,
      ad_table: ad_table,
      ad_id: ad_id,
    };

    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/users/insert-transactions/${userId}`,
        payload,
      )
      .then((response) => {
        removeItemArray.forEach((key) => localStorage.removeItem(key));
        toast.success("Transaction submitted!");
        setTimeout(() => setIsPaymentSuccess(true), 2500);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Submission failed");
      })
      .finally(() => setLoading(false));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.info("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-6 font-sans antialiased text-slate-900">
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar
        theme="dark"
      />

      {/* Main Card */}
      <div className="w-full max-w-120 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative">
        {/* Top Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-400 via-blue-600 to-black" />

        {/* Header Section */}
        <div className="p-8 pb-6">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-fit">
                <Zap size={12} className="fill-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Premium Ad
                </span>
              </div>
              <h2 className="text-3xl font-black text-black tracking-tighter">
                Secure Checkout
              </h2>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-right min-w-30">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Total Payable
              </p>
              <p className="text-xl font-black text-blue-600">
                Rs {Math.floor(featurePrice).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Steps (Visual Only) */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-1.5 flex-1 bg-black rounded-full" />
            <div className="h-1.5 flex-1 bg-blue-600 rounded-full" />
            <div className="h-1.5 flex-1 bg-slate-100 rounded-full" />
          </div>

          {/* Tab Selection */}
          <div className="bg-slate-100/50 p-1.5 rounded-[1.25rem] flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab("easypaisa")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                activeTab === "easypaisa"
                  ? "bg-white text-black shadow-md shadow-slate-200"
                  : "text-slate-500 hover:bg-white/50"
              }`}
            >
              <SmartphoneIcon size={16} /> Easypaisa
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                activeTab === "bank"
                  ? "bg-white text-black shadow-md shadow-slate-200"
                  : "text-slate-500 hover:bg-white/50"
              }`}
            >
              <Building2 size={16} /> Bank
            </button>
          </div>

          {/* Payment Details Container */}
          <div className="space-y-4 min-h-55">
            {activeTab === "easypaisa" ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-blue-600 p-6 rounded-3xl text-white mb-4 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                    <SmartphoneIcon size={120} />
                  </div>
                  <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-1">
                    Account Title
                  </p>
                  <p className="text-lg font-bold mb-4">
                    Official Merchant Account
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-1">
                        Number
                      </p>
                      <p className="text-2xl font-black tracking-wider">
                        0316-5827272
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard("03165827272", "ep")}
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-xl backdrop-blur-md transition-all"
                    >
                      {copiedId === "ep" ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-300">
                {[
                  { label: "Bank Name", value: "HBL Bank Ltd.", id: "bn" },
                  {
                    label: "Account Title",
                    value: "Pak Deals Official",
                    id: "at",
                  },
                  {
                    label: "Account Number",
                    value: "0042 9876 5432 10",
                    id: "an",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors"
                  >
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-[14px] font-bold text-black">
                        {item.value}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.id)}
                      className={`p-2 rounded-lg transition-all ${copiedId === item.id ? "text-green-600 bg-green-50" : "text-slate-300 hover:text-blue-600"}`}
                    >
                      {copiedId === item.id ? (
                        <Check size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            <div className="pt-4">
              <div
                className={`relative border-2 border-dashed rounded-3xl p-6 transition-all duration-300 group ${screenshot ? "border-green-500 bg-green-50/30" : "border-slate-200 bg-slate-50 hover:border-blue-400"}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex items-center gap-4">
                  <div
                    className={`p-4 rounded-2xl transition-all duration-300 ${screenshot ? "bg-green-500 text-white" : "bg-white text-blue-600 shadow-sm group-hover:scale-110"}`}
                  >
                    {screenshot ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <UploadCloud size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-black">
                      {screenshot
                        ? "Screenshot Uploaded"
                        : "Upload Payment Receipt"}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {screenshot
                        ? screenshot.name
                        : "Tap to browse (JPG, PNG)"}
                    </p>
                  </div>
                  {!screenshot && (
                    <ChevronRight size={18} className="text-slate-300" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleEasyPaisaSubmit}
            disabled={loading}
            className={`w-full mt-8 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] shadow-xl ${
              loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-black hover:bg-blue-600 text-white shadow-blue-200"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing
              </span>
            ) : (
              <>
                Confirm Payment
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Security Footer */}
          <div className="flex items-center justify-center gap-6 mt-8 opacity-40 grayscale hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1">
              <Lock size={12} />
              <span className="text-[10px] font-bold">SSL SECURE</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} />
              <span className="text-[10px] font-bold">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
