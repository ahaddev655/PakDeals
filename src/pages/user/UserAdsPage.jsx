import React from "react";
import UserAdsComponent from "./../../components/user/UserAdsComponent";

function UserAdsPage() {
  return (
    <div className="space-y-8 sm:px-6 px-2.5 py-6">
      {/* -------------------- HEADING -------------------- */}
      <div className="space-y-3 mb-6">
        <h1 className="text-3xl font-semibold">My Ads</h1>
        <p className="text-gray-500">Manage all your listings here</p>
      </div>
      {/* -------------------- LISTING TABLE -------------------- */}
      <UserAdsComponent />
    </div>
  );
}

export default UserAdsPage;
