import React, { useState } from "react";

function PersonalProfilePage() {
  const [userData, setUserData] = useState({
    // ==================== PERSONAL DATA ====================
    profileImage: "/assets/profile.jpg",
    firstName: "Muhammad",
    lastName: "Ahad",
    email: "ahad@example.com",
    mobileNumber: "+1234567890",
    country: "United States",
    city: "New York",
    address: "123 Main Street",
    // ==================== BUISNESS DATA ====================
    company: "Tech Solutions Inc",
    description: "Professional software developer with 5+ years experience",
    buisnessCategory: "Electronics",
    buisnessType: "Individual",
  });

  const dataComponent = (label, dataKey) => {
    return (
      <div className="flex items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 transition p-2 rounded-md border border-gray-200">
        <p className="font-medium text-gray-700">{label}</p>
        <span className="font-semibold text-blue-700">{dataKey}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {/* ==================== PERSONAL DATA ==================== */}
        <div>
          {/* -------------------- PROFILE IMAGE -------------------- */}
          <div className="w-28 h-28 mx-auto mb-3">
            <img
              src={userData.profileImage}
              alt="IMG"
              className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-md"
            />
          </div>
          <div className="flex mt-5 gap-5">
            {/* -------------------- PERSONAL DATA -------------------- */}
            <div className="space-y-2">
              <h5 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1">
                Personal Data
              </h5>
              {dataComponent("First Name", userData.firstName)}
              {dataComponent("Last Name", userData.lastName)}
              {dataComponent("Email", userData.email)}
              {dataComponent("Mobile", userData.mobileNumber)}
              <div className="flex items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 transition p-2 rounded-md border border-gray-200">
                <p className="font-medium text-gray-700">Location</p>
                <span className="font-semibold text-blue-700">
                  {userData.country + ", " + userData.city}
                </span>
              </div>
              {dataComponent("Address", userData.address)}
            </div>
            <div className="w-px self-stretch bg-gray-300 rounded-full" />
            {/* -------------------- BUISNESS DATA -------------------- */}
            <div className="space-y-2">
              <h5 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1">
                Buisness Data
              </h5>
              {dataComponent("Company", userData.company)}
              {dataComponent("Buisness Category", userData.buisnessCategory)}
              {dataComponent("Buisness Type", userData.buisnessType)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfilePage;
