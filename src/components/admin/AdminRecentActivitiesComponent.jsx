import { Eye, Heart, Package, X, BellOff } from "lucide-react";
import React, { useState } from "react";

function AdminRecentActivitiesComponent() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      activity: "Your listing Audi Q3 3.5 Sportpack has been approved",
      type: "listing",
      time: "2 mins ago",
    },
    {
      id: 2,
      activity: "Someone favorites your Samsung Galaxy listing",
      type: "favorites",
      time: "1 hour ago",
    },
    {
      id: 3,
      activity: "You Subscribed Pro Package",
      type: "subscription",
      time: "3 hours ago",
    },
    {
      id: 4,
      activity: "Your listing Audi Q3 3.5 Sportpack has been approved",
      type: "listing",
      time: "5 hours ago",
    },
    {
      id: 5,
      activity: "Someone favorites your Samsung Galaxy listing",
      type: "favorites",
      time: "Yesterday",
    },
    {
      id: 6,
      activity: "You Subscribed Pro Package",
      type: "subscription",
      time: "2 days ago",
    },
  ]);

  const removeActivity = (id) => {
    setActivities((prev) => prev.filter((item) => item.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "listing":
        return { icon: <Eye size={14} />, color: "bg-blue-50 text-blue-500" };
      case "favorites":
        return { icon: <Heart size={14} />, color: "bg-rose-50 text-rose-500" };
      case "subscription":
        return {
          icon: <Package size={14} />,
          color: "bg-amber-50 text-amber-500",
        };
      default:
        return {
          icon: <BellOff size={14} />,
          color: "bg-slate-50 text-slate-500",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-black text-slate-800 tracking-tight">
          Recent Activities
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
          Notification Log
        </p>
      </div>

      {/* ACTIVITIES LIST */}
      <div className="flex-1 overflow-y-auto max-h-120 custom-scrollbar">
        {activities.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {activities.map((item) => {
              const theme = getIcon(item.type);
              return (
                <div
                  key={item.id}
                  className="group relative p-4 flex items-start gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div
                    className={`mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${theme.color}`}
                  >
                    {theme.icon}
                  </div>

                  <div className="flex-1 pr-6">
                    <p className="text-[13px] font-bold text-slate-600 leading-snug">
                      {item.activity}
                    </p>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-1 block">
                      {item.time}
                    </span>
                  </div>

                  <button
                    onClick={() => removeActivity(item.id)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-3">
              <BellOff size={24} />
            </div>
            <p className="text-slate-900 font-black text-sm">All caught up!</p>
            <p className="text-slate-400 text-xs mt-1">
              No new activities to show right now.
            </p>
          </div>
        )}
      </div>

      {/* FOOTER ACTION */}
      {activities.length > 0 && (
        <div className="p-4 border-t border-slate-100 text-center">
          <button
            onClick={() => setActivities([])}
            className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors"
          >
            Clear All Notifications
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminRecentActivitiesComponent;
