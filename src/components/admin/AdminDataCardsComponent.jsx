import React, { useMemo } from "react";
import { LayoutGrid, LockOpen, MessageSquareQuote, Users2 } from "lucide-react";

function AdminDataCardsComponent({
  totalListings = 0,
  activeListings = 0,
  blogs = 0,
  users = 0,
  loading = false,
}) {
  const dataCards = useMemo(
    () => [
      {
        text: "Total Listings",
        value: totalListings,
        icon: LayoutGrid,
        bgColor: "bg-slate-800",
        textColor: "text-slate-800",
      },
      {
        text: "Active Listings",
        value: activeListings,
        icon: LockOpen,
        bgColor: "bg-indigo-600",
        textColor: "text-indigo-600",
      },
      {
        text: "Total Blogs",
        value: blogs,
        icon: MessageSquareQuote,
        bgColor: "bg-rose-500",
        textColor: "text-rose-500",
      },
      {
        text: "Total Users",
        value: users,
        icon: Users2,
        bgColor: "bg-gray-500",
        textColor: "text-gray-500",
      },
    ],
    [totalListings, activeListings, blogs, users],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dataCards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="group p-6 flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-1">
              <p className="uppercase text-xs font-bold text-gray-400 tracking-widest">
                {card.text}
              </p>

              {loading ? (
                <div className="h-9 w-24 bg-gray-200 animate-pulse rounded-md mt-2" />
              ) : (
                <h3 className="text-3xl font-bold text-gray-800 tracking-tight">
                  {Number(card.value || 0).toLocaleString()}
                </h3>
              )}
            </div>

            <div
              className={`w-14 h-14 ${card.bgColor} text-white grid place-items-center rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon size={24} strokeWidth={2.5} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminDataCardsComponent;
