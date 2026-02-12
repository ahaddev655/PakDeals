import { Eye, Heart, Package, X } from "lucide-react";
import React, { useState } from "react";

function UserRecentActivitiesComponent() {
  const [activities, setActivities] = useState([
    {
      activity: "Your listing Audi Q3 3.5 Sportpack has been approved",
      type: "listing",
    },
    {
      activity: "Someone favorites your Samsung Galaxy listing",
      type: "favorites",
    },
    {
      activity: "You Subscribed Pro Package",
      type: "subscription",
    },
    {
      activity: "Your listing Audi Q3 3.5 Sportpack has been approved",
      type: "listing",
    },
    {
      activity: "Someone favorites your Samsung Galaxy listing",
      type: "favorites",
    },
    {
      activity: "You Subscribed Pro Package",
      type: "subscription",
    },
    {
      activity: "Your listing Audi Q3 3.5 Sportpack has been approved",
      type: "listing",
    },
    {
      activity: "Someone favorites your Samsung Galaxy listing",
      type: "favorites",
    },
    {
      activity: "You Subscribed Pro Package",
      type: "subscription",
    },
  ]);

  const removeActivity = (index) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="col-span-1 bg-white p-4 shadow-lg rounded-lg border border-gray-300">
      {/* -------------------- HEADING -------------------- */}
      <div className="md:text-start text-center mb-3">
        <h1 className="text-xl font-medium text-gray-800">Recent Activites</h1>
      </div>
      {/* -------------------- ACTIVITIES -------------------- */}
      <div className="overflow-y-auto h-117.5">
        {activities.map((activity, i) => (
          <div
            key={i}
            className={`py-2 px-4 relative ${
              i === activities.length - 1 ? "" : "border-b border-gray-200"
            } flex items-center gap-4`}
          >
            <X
              onClick={() => removeActivity(i)}
              className="absolute top-1 right-0 w-4 h-4 hover:text-red-600 transition-colors duration-300 ease-in-out cursor-pointer"
            />

            <div className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center bg-gray-200">
              {activity.type === "listing" ? (
                <Eye className="w-4 h-4 text-gray-500" />
              ) : activity.type === "favorites" ? (
                <Heart className="w-4 h-4 text-gray-500" />
              ) : (
                <Package className="w-4 h-4 text-gray-500" />
              )}
            </div>

            <h6 className="text-sm leading-snug text-gray-600">
              {activity.activity}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRecentActivitiesComponent;
