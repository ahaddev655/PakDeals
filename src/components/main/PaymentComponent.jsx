import React, { useState } from "react";
import { CreditCard, ShieldCheck, Zap, Lock, ArrowRight } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const PaymentComponent = ({ setIsPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });
  const removeItemArray = ["payment", "payment_date", "table_name", "ad_id"];
  const featurePrice = localStorage.getItem("payment");
  const featuredDuration = localStorage.getItem("payment_date");
  const [loading, setLoading] = useState(false);
  const ad_id = localStorage.getItem("ad_id");
  const table_name = localStorage.getItem("table_name");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      const digits = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").substring(0, 4);
      if (digits.length > 2) {
        formattedValue = `${digits.substring(0, 2)} / ${digits.substring(2)}`;
      } else {
        formattedValue = digits;
      }
    }

    if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.cardNumber &&
      !formData.cvc &&
      !formData.expiry &&
      !formData.name
    ) {
      toast.error("All fields are required...");
      return;
    }

    if (!formData.name?.trim()) {
      toast.error("Full Name is required...");
      return;
    }

    if (!formData.cardNumber?.trim()) {
      toast.error("Card number is required...");
      return;
    }

    if (!formData.expiry) {
      toast.error("Expiry is required...");
      return;
    }

    if (!formData.cvc?.trim()) {
      toast.error("Cvc is required...");
      return;
    }

    axios
      .put(
        `https://pak-deals-backend.vercel.app/api/status/featured/${table_name}/${ad_id}`,
        {
          featured_days: featuredDuration,
        },
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res?.data?.message || "");
        setTimeout(() => {
          setIsPaymentSuccess(true);
        }, 2500);
        removeItemArray.forEach((key) => localStorage.removeItem(key));
      })
      .catch((error) => {
        console.error(error?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans antialiased text-slate-900">
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white">
        {/* Top Branding Section */}
        <div className="bg-black p-8 text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-30"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                  <Zap size={14} className="text-blue-400 fill-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100">
                    Premium Upgrade
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Boost your reach.
                </h2>
                <p className="text-slate-400 text-sm mt-2 max-w-60 leading-relaxed">
                  Your ad will stay pinned at the top for {featuredDuration}{" "}
                  days.
                </p>
              </div>
              <div className="text-right">
                <span className="block text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">
                  Total Due
                </span>
                <span className="text-4xl font-light">
                  {Math.floor(featurePrice).toLocaleString()}.
                  <span className="text-xl align-top">00</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 md:p-10">
          {/* Visual Card Preview */}
          <div className="mb-10 w-full h-44 bg-linear-to-br from-slate-800 to-black rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-8 bg-linear-to-br from-yellow-400 to-yellow-600 rounded-md opacity-80"></div>
              <CreditCard className="text-white/20" size={32} />
            </div>
            <div className="relative z-10">
              <p className="text-xl tracking-[0.2em] font-mono">
                {formData.cardNumber || "•••• •••• •••• ••••"}
              </p>
              <div className="flex justify-between mt-4">
                <div className="text-[10px] uppercase opacity-50 tracking-widest">
                  Card Holder
                  <p className="text-xs opacity-100 tracking-normal font-medium mt-1 uppercase">
                    {formData.name || "Your Name"}
                  </p>
                </div>
                <div className="text-[10px] uppercase opacity-50 tracking-widest text-right">
                  Expires
                  <p className="text-xs opacity-100 tracking-normal font-medium mt-1">
                    {formData.expiry || "MM / YY"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1 transition-colors group-focus-within:text-blue-600">
                Full Name on Card
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Alex Rivera"
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-black font-medium placeholder:text-slate-300"
                onChange={handleChange}
              />
            </div>

            <div className="group">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1 transition-colors group-focus-within:text-blue-600">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  placeholder="0000 0000 0000 0000"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-black font-medium placeholder:text-slate-300"
                  onChange={handleChange}
                />
                <Lock
                  className="absolute right-4 top-4 text-slate-300"
                  size={18}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1 transition-colors group-focus-within:text-blue-600">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  placeholder="MM / YY"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-black font-medium placeholder:text-slate-300"
                  onChange={handleChange}
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1 transition-colors group-focus-within:text-blue-600">
                  CVC Code
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  placeholder="123"
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-black font-medium placeholder:text-slate-300"
                  onChange={handleChange}
                />
              </div>
            </div>

            {loading ? (
              <button
                type="submit"
                className="flex items-center justify-center gap-1 w-full bg-blue-600 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all duration-300transform hover:-translate-y-1 active:scale-[0.98] mt-6 group"
              >
                Confirming, please be patient
                <div className="flex items-center gap-[.5px]">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-[0.98] mt-6 group"
              >
                Confirm & Pay Rs {Math.floor(featurePrice).toLocaleString()}.00
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            )}

            <div className="flex items-center justify-center gap-2 mt-6">
              <ShieldCheck size={16} className="text-green-500" />
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                Bank-level Security
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;
