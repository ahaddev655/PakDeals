import { Clock4, LayoutGrid, Lock, LockOpen } from "lucide-react";
import React, { useState } from "react";

function UserDataCardsComponent({
  activeListings,
  expiredListings,
  pendingListings,
  totalListings,
}) {
  const dataCards = [
    {
      text: "Total Listings",
      value: totalListings,
      icon: LayoutGrid,
      color: "#343a40",
    },
    {
      text: "Active Listings",
      value: activeListings,
      icon: LockOpen,
      color: "#4f46e5",
    },
    {
      text: "Expired Listings",
      value: expiredListings,
      icon: Clock4,
      color: "#dc3545",
    },
    {
      text: "Pending Listings",
      value: pendingListings,
      icon: Lock,
      color: "#6c757d",
    },
  ];

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {dataCards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="p-6 flex items-center justify-between bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div>
              <p className="uppercase text-[13px] font-medium text-gray-400 tracking-wide">
                {card.text}
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-gray-700">
                {(card.value || 0).toLocaleString()}
              </h3>
            </div>

            <div
              className="w-15 h-15 text-white grid place-items-center rounded-xl"
              style={{ backgroundColor: card.color }}
            >
              <Icon />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserDataCardsComponent;
