import React, { useState } from "react";
import { Zap, ShieldCheck, Star, ArrowRight } from "lucide-react";

function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(2); // Default to recommended plan

  const discountedPrice = (price, discount) => {
    if (!discount) return price;
    return (price - (price * discount) / 100).toFixed(0);
  };

  const offers = [
    {
      id: 1,
      title: "7 Days Feature",
      reach: "Reach up to 4x more buyers",
      price: discountedPrice(1999, null),
      originalPrice: null,
      discount: null,
      recommended: false,
      icon: <Zap size={20} className="text-orange-500" />,
    },
    {
      id: 2,
      title: "15 Days Feature",
      reach: "Reach up to 7x more buyers",
      price: discountedPrice(3999, 38),
      originalPrice: 3999,
      discount: 38,
      recommended: true,
      icon: <Star size={20} className="text-blue-600" />,
    },
    {
      id: 3,
      title: "30 Days Feature",
      reach: "Reach up to 10x more buyers",
      price: discountedPrice(5999, 33),
      originalPrice: 5999,
      discount: 33,
      recommended: true,
      icon: <ShieldCheck size={20} className="text-green-600" />,
    },
    {
      id: 4,
      title: "60 Days Feature",
      reach: "Reach up to 15x more buyers",
      price: discountedPrice(9999, 30),
      originalPrice: 9999,
      discount: 30,
      recommended: false,
      icon: <Zap size={20} className="text-purple-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Boost Your Ad Reach
          </h2>
          <p className="text-gray-500 mt-2 font-medium">
            Featured ads get higher visibility and faster sales
          </p>
        </div>

        {/* Pricing List */}
        <div className="space-y-4">
          {offers.map((offer) => {
            const isSelected = selectedPlan === offer.id;
            return (
              <label
                key={offer.id}
                htmlFor={`pricing${offer.id}`}
                className={`relative block transition-all duration-300 rounded-2xl border-2 p-5 cursor-pointer
                  ${
                    isSelected
                      ? "border-blue-800 bg-white shadow-xl shadow-blue-900/5 ring-4 ring-blue-50"
                      : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
              >
                <input
                  type="radio"
                  name="pricing"
                  id={`pricing${offer.id}`}
                  className="hidden"
                  checked={isSelected}
                  onChange={() => setSelectedPlan(offer.id)}
                />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Icon Circle */}
                    <div
                      className={`mt-1 p-2.5 rounded-xl ${isSelected ? "bg-blue-50" : "bg-gray-50"}`}
                    >
                      {offer.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-800">
                          {offer.title}
                        </span>
                        {offer.recommended && (
                          <span className="bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">
                            Best Value
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-tight mt-0.5">
                        {offer.reach}
                      </p>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="text-right">
                    {offer.discount && (
                      <div className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full inline-block mb-1">
                        SAVE {offer.discount}%
                      </div>
                    )}
                    <div className="flex flex-col items-end">
                      <span
                        className={`text-xl font-black ${isSelected ? "text-blue-900" : "text-slate-800"}`}
                      >
                        PKR {Number(offer.price).toLocaleString()}
                      </span>
                      {offer.discount && (
                        <span className="text-xs text-gray-400 line-through font-bold">
                          PKR {offer.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-800 rounded-r-full" />
                )}
              </label>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <button className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 group">
            Proceed to Payment
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <p className="text-[10px] text-gray-400 mt-4 font-bold uppercase">
            Secure 256-bit SSL Encrypted Payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
