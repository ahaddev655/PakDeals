import React, { useState } from "react";
import { Zap, ShieldCheck, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PricingPage() {
  const navigate = useNavigate();

  const discountedPrice = (price, discount) => {
    if (!discount) return price;
    return (price - (price * discount) / 100).toFixed(0);
  };

  const offers = [
    {
      id: 1,
      title: "7 Days Feature",
      reach: "Reach 4x more buyers",
      price: discountedPrice(1999, null),
      originalPrice: null,
      discount: null,
      recommended: false,
      icon: <Zap size={20} className="text-orange-500" />,
    },
    {
      id: 2,
      title: "15 Days Feature",
      reach: "Reach 7x more buyers",
      price: discountedPrice(3999, 38),
      originalPrice: 3999,
      discount: 38,
      recommended: true,
      icon: <Star size={20} className="text-blue-600" />,
    },
    {
      id: 3,
      title: "30 Days Feature",
      reach: "Reach 10x more buyers",
      price: discountedPrice(5999, 33),
      originalPrice: 5999,
      discount: 33,
      recommended: true,
      icon: <ShieldCheck size={20} className="text-green-600" />,
    },
    {
      id: 4,
      title: "60 Days Feature",
      reach: "Reach 15x more buyers",
      price: discountedPrice(9999, 30),
      originalPrice: 9999,
      discount: 30,
      recommended: false,
      icon: <Zap size={20} className="text-purple-600" />,
    },
  ];

  const [selectedPlanId, setSelectedPlanId] = useState(2);
  const [selectedPlanData, setSelectedPlanData] = useState(offers[1]);
  const table_name = localStorage.getItem("table_name");
  const ad_id = localStorage.getItem("ad_id");

  const handlePaymentTransfer = () => {
    if (!selectedPlanData) return;

    const duration = selectedPlanData.title.split(" ")[0];

    localStorage.setItem("payment_date", duration);
    localStorage.setItem("payment", selectedPlanData.price);

    navigate(`/payment/${table_name}/${ad_id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Boost Your Ad Reach
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-2 font-medium px-4">
            Featured ads get higher visibility and faster sales
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {offers.map((offer) => {
            const isSelected = selectedPlanId === offer.id;
            return (
              <label
                key={offer.id}
                htmlFor={`pricing${offer.id}`}
                className={`relative block transition-all duration-300 rounded-2xl border-2 p-4 md:p-5 cursor-pointer
                  ${
                    isSelected
                      ? "border-blue-800 bg-white shadow-xl shadow-blue-900/5 ring-4 ring-blue-50"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
              >
                <input
                  type="radio"
                  name="pricing"
                  id={`pricing${offer.id}`}
                  className="hidden"
                  checked={isSelected}
                  onChange={() => {
                    setSelectedPlanId(offer.id);
                    setSelectedPlanData(offer);
                  }}
                />

                <div className="flex flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div
                      className={`shrink-0 p-2 md:p-2.5 rounded-xl ${isSelected ? "bg-blue-50" : "bg-gray-50"}`}
                    >
                      {offer.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-base md:text-lg font-bold text-slate-800 whitespace-nowrap">
                          {offer.title}
                        </span>
                        {offer.recommended && (
                          <span className="bg-orange-100 text-orange-700 text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md">
                            Best Value
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] md:text-sm text-gray-400 font-bold uppercase tracking-tight mt-0.5 truncate">
                        {offer.reach}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {offer.discount && (
                      <div className="bg-green-100 text-green-700 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mb-1">
                        -{offer.discount}%
                      </div>
                    )}
                    <div className="flex flex-col items-end">
                      <span
                        className={`text-lg md:text-xl font-bold leading-none ${isSelected ? "text-blue-900" : "text-slate-800"}`}
                      >
                        Rs {Number(offer.price).toLocaleString()}
                      </span>
                      {offer.discount && (
                        <span className="text-[10px] md:text-xs text-gray-400 line-through font-bold mt-1">
                          Rs {offer.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-6 md:h-8 bg-blue-800 rounded-r-full hidden xs:block" />
                )}
              </label>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10 bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="md:flex items-center justify-center gap-5">
            <button
              className="w-full bg-gray-600 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-bold uppercase tracking-widest hover:bg-gray-500 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 group"
              onClick={() => navigate("/user-dashboard/my-ads")}
            >
              Continue Free
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              className="w-full bg-blue-900 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base font-bold uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 group"
              onClick={handlePaymentTransfer}
            >
              Proceed to Payment
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
          <p className="text-[9px] md:text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-wider">
            Secure 256-bit SSL Encrypted Payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
