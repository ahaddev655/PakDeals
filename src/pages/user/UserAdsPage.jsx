import React from "react";
import UserListingsComponent from "../../components/user/UserListingsComponent";

function UserAdsPage() {
  return (
    <div className="space-y-8 sm:px-6 px-2.5 py-6">
      {/* -------------------- HEADING -------------------- */}
      <div className="space-y-3 mb-6">
        <h1 className="text-3xl font-semibold">My Ads</h1>
        <p className="text-gray-500">Manage all your listings here</p>
      </div>
      {/* -------------------- LISTING TABLE -------------------- */}
      <UserListingsComponent />
    </div>
  );
}

export default UserAdsPage;
