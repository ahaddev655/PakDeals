import React, { useState } from "react";
import {
  ShieldCheck,
  Zap,
  Smartphone,
  Building2,
  Copy,
  CheckCircle2,
  ArrowRight,
  SmartphoneIcon,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const PaymentComponent = ({ setIsPaymentSuccess }) => {
  const [activeTab, setActiveTab] = useState("easypaisa");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    accountName: "",
  });

  const removeItemArray = ["payment", "payment_date", "table_name", "ad_id"];
  const featurePrice = localStorage.getItem("payment") || "0";
  const featuredDuration = localStorage.getItem("payment_date") || "0";
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("id");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const digits = value.replace(/\D/g, "").substring(0, 11);
      setFormData({ ...formData, [name]: digits });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEasyPaisaSubmit = (e) => {
    e.preventDefault();

    const accountName = formData.accountName?.trim();
    const phoneNumber = formData.phoneNumber?.trim();

    if (!accountName && !phoneNumber) {
      toast.error("All fields are required.");
      return;
    }

    if (!accountName) {
      toast.error("Account name is required.");
      return;
    }

    if (!phoneNumber) {
      toast.error("Phone number is required.");
      return;
    }

    if (phoneNumber.length !== 11) {
      toast.error("Phone number is invalid.");
      return;
    }

    setLoading(true);

    const payload = {
      transaction_amount: featurePrice,
      transaction_status: 0,
      transaction_method: "easypaisa",
    };

    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/users/insert-transactions/${userId}`,
        payload,
      )
      .then((response) => {
        console.log("Transaction Success:", response.data);
        removeItemArray.forEach((key) => localStorage.removeItem(key));
        toast.success("Transaction submitted successfully!");

        setTimeout(() => {
          setIsPaymentSuccess(true);
        }, 2500);
      })
      .catch((error) => {
        const errorMsg =
          error?.response?.data?.error ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
        console.error("Submission Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-4 font-sans antialiased text-slate-900">
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />

      <div className="w-full max-w-lg bg-white rounded-4xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Modern Header */}
        <div className="p-8 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2 bg-blue-50 w-fit px-3 py-1 rounded-full">
                <Zap size={14} className="text-blue-600 fill-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Premium Upgrade
                </span>
              </div>
              <h2 className="text-2xl font-black text-black tracking-tight">
                Select Payment
              </h2>
            </div>
            <div className="text-right">
              <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                Total
              </span>
              <span className="text-2xl font-black text-blue-600">
                Rs {Math.floor(featurePrice).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-8 flex gap-2">
          <button
            onClick={() => setActiveTab("easypaisa")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border ${activeTab === "easypaisa" ? "bg-black text-white border-black" : "bg-slate-50 text-slate-500 border-slate-100"}`}
          >
            <SmartphoneIcon size={16} /> Easypaisa
          </button>
          <button
            onClick={() => setActiveTab("bank")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all border ${activeTab === "bank" ? "bg-black text-white border-black" : "bg-slate-50 text-slate-500 border-slate-100"}`}
          >
            <Building2 size={16} /> Bank Transfer
          </button>
        </div>

        <div className="p-8">
          {activeTab === "easypaisa" ? (
            <form className="space-y-6" onSubmit={handleEasyPaisaSubmit}>
              <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <img
                    src="/assets/easypaisa.png"
                    alt="Easypaisa"
                    className="w-12 h-auto"
                  />
                </div>
                <p className="text-sm font-medium text-slate-600">
                  Enter your Easypaisa account number to receive a payment
                  prompt on your phone.
                </p>
              </div>

              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="group">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-2 ml-1">
                    Easypaisa Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="03XXXXXXXXX"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                    <Smartphone
                      className="absolute right-4 top-4 text-slate-300"
                      size={18}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {loading
                  ? "Processing..."
                  : `Pay Rs ${Math.floor(featurePrice).toLocaleString()}`}
                {!loading && <ArrowRight size={20} />}
              </button>
            </form>
          ) : (
            /* Bank Transfer View */
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3">
                <CheckCircle2 className="text-blue-600 shrink-0" size={18} />
                <p className="text-[13px] text-blue-900 leading-snug">
                  Please transfer{" "}
                  <strong>
                    Rs {Math.floor(featurePrice).toLocaleString()}
                  </strong>{" "}
                  to the following account and share the receipt.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { label: "Bank Name", value: "HBL Bank Ltd." },
                  { label: "Account Title", value: "Pak Deals Official" },
                  { label: "Account Number", value: "0042 9876 5432 10" },
                  { label: "IBAN", value: "PK72 HABB 0000 0042 9876 5432" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-blue-200 transition-colors"
                  >
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-black">
                        {item.value}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value)}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 p-4 bg-black text-white rounded-2xl justify-center">
                  <ShieldCheck size={18} className="text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Manual Verification
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 mt-8 opacity-40">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Secure Checkout — {featuredDuration} Days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
