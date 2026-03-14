import { Clock4, LayoutGrid, Lock, LockOpen } from "lucide-react";
import React from "react";

function UserDataCardsComponent({
  activeListings = 0,
  soldListings = 0,
  pendingListings = 0,
  totalListings = 0,
  loading = false,
}) {
  const dataCards = [
    {
      text: "Total Listings",
      value: totalListings,
      icon: LayoutGrid,
      color: "bg-[#2d3436]", // Dark Charcoal
    },
    {
      text: "Active Listings",
      value: activeListings,
      icon: LockOpen,
      color: "bg-[#4f46e5]", // Indigo
    },
    {
      text: "Sold Listings",
      value: soldListings,
      icon: Clock4,
      color: "bg-[#ef4444]", // Rose/Red
    },
    {
      text: "Pending Listings",
      value: pendingListings,
      icon: Lock,
      color: "bg-[#64748b]", // Slate Gray
    },
  ];

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {dataCards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="p-6 flex items-center justify-between bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex-1">
              <p className="uppercase text-[11px] font-bold text-slate-400 tracking-widest">
                {card.text}
              </p>

              {loading ? (
                /* Shimmer/Skeleton Loader */
                <div className="mt-3 h-9 w-24 bg-slate-100 animate-pulse rounded-lg" />
              ) : (
                <h3 className="mt-2 text-3xl font-black text-slate-800 tracking-tight">
                  {Number(card.value || 0).toLocaleString()}
                </h3>
              )}
            </div>

            <div
              className={`w-14 h-14 text-white flex items-center justify-center rounded-2xl shadow-inner ${card.color}`}
            >
              {loading ? (
                <div className="w-6 h-6 bg-white/20 animate-pulse rounded-full" />
              ) : (
                <Icon size={28} strokeWidth={2.2} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserDataCardsComponent;
