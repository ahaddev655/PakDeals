import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PersonalProfilePage() {
  const [userData, setUserData] = useState({
    // ==================== PERSONAL DATA ====================
    firstName: "" || null,
    lastName: "" || null,
    email: "" || null,
    mobileNumber: "" || null,
    country: "" || null,
    city: "" || null,
    address: "" || null,
    // ==================== BUISNESS DATA ====================
    company: "" || null,
    description: "" || null,
    buisnessCategory: "" || null,
    buisnessType: "" || null,
  });
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);

  // -------------------- API CONFIGURATION --------------------
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/users/user/${userId}`)
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
        console.log("PERSONAL PROFILE API ERROR: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const dataComponent = (label, dataKey) => {
    return (
      <div className="bg-gray-50 hover:bg-gray-100 transition p-2 rounded-md border border-gray-200 w-full">
        <p className="font-medium text-gray-700">{label}</p>
        <p className="font-semibold text-blue-700">{dataKey}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 min-w-xl">
        {loading ? (
          <p className="text-center font-semibold text-xl text-gray-600">Loading...</p>
        ) : (
          <>
            {/* ==================== PERSONAL DATA ==================== */}
            <div>
              {/* -------------------- PROFILE IMAGE -------------------- */}
              <div className="w-28 h-28 mx-auto mb-3">
                <div className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-md grid place-items-center text-4xl font-semibold text-white bg-blue-900 text-clip [text-shadow:2px_2px_6px_rgba(0,0,0,0.7)]">
                  {userData?.firstName?.charAt(0)}
                </div>
              </div>
              <div className="md:flex mt-5 space-y-5 md:space-y-0 gap-5 w-full">
                {/* -------------------- PERSONAL DATA -------------------- */}
                <div className="space-y-2 w-full">
                  <h5 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1">
                    Personal Data
                  </h5>
                  {dataComponent("First Name", userData.firstName || "—")}
                  {dataComponent("Last Name", userData.lastName || "—")}
                  {dataComponent("Email", userData.email || "—")}
                  {dataComponent("Mobile", userData.mobileNumber || "—")}
                  <div className="bg-gray-50 hover:bg-gray-100 transition p-2 rounded-md border border-gray-200">
                    <p className="font-medium text-gray-700">Location</p>
                    <span className="font-semibold text-blue-700">
                      {userData.country || "—" + ", " + userData.city || "—"}
                    </span>
                  </div>
                  {dataComponent("Address", userData.address || "—")}
                </div>
                <div className="w-px self-stretch bg-gray-300 rounded-full" />
                {/* -------------------- BUISNESS DATA -------------------- */}
                <div className="space-y-2 w-full">
                  <h5 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-1">
                    Buisness Data
                  </h5>
                  {dataComponent("Company", userData.company || "—")}
                  {dataComponent(
                    "Buisness Category",
                    userData.buisnessCategory || "—",
                  )}
                  {dataComponent("Buisness Type", userData.buisnessType || "—")}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalProfilePage;
