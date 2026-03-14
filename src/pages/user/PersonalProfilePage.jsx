import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User, Briefcase, MapPin, Phone, Mail } from "lucide-react";

function PersonalProfilePage() {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/users/fetch-user/${userId}`,
      )
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const DataField = ({ label, value, icon: Icon }) => (
    <div className="group bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300">
      <div className="flex items-center gap-3 mb-1">
        {Icon && (
          <Icon
            size={14}
            className="text-slate-400 group-hover:text-blue-500 transition-colors"
          />
        )}
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
      </div>
      <p className="text-sm font-bold text-slate-700 truncate">
        {value || "—"}
      </p>
    </div>
  );

  const SkeletonField = () => (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 animate-pulse">
      <div className="h-2 w-16 bg-slate-200 rounded mb-2" />
      <div className="h-4 w-32 bg-slate-200 rounded" />
    </div>
  );

  const formatLocation = () => {
    const parts = [userData?.city, userData?.country].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "—";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* PROFILE HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700" />
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-white p-1.5 shadow-xl">
                <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-4xl font-black text-white">
                  {loading
                    ? "..."
                    : userData?.firstName?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                {loading
                  ? "Loading Profile..."
                  : `${userData?.firstName} ${userData?.lastName}`}
              </h1>
              <p className="text-slate-500 font-medium">{userData?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* PERSONAL DATA SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <User size={18} className="text-blue-600" />
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                Personal Details
              </h2>
            </div>
            <div className="grid gap-3">
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => <SkeletonField key={i} />)
              ) : (
                <>
                  <DataField label="First Name" value={userData?.firstName} />
                  <DataField label="Last Name" value={userData?.lastName} />
                  <DataField
                    label="Mobile Number"
                    value={userData?.mobileNumber}
                    icon={Phone}
                  />
                  <DataField
                    label="Location"
                    value={formatLocation()}
                    icon={MapPin}
                  />
                  <DataField label="Full Address" value={userData?.address} />
                </>
              )}
            </div>
          </div>

          {/* BUSINESS DATA SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <Briefcase size={18} className="text-indigo-600" />
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                Business Info
              </h2>
            </div>
            <div className="grid gap-3">
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => <SkeletonField key={i} />)
              ) : (
                <>
                  <DataField label="Company Name" value={userData?.company} />
                  <DataField
                    label="Business Category"
                    value={userData?.buisnessCategory}
                  />
                  <DataField
                    label="Business Type"
                    value={userData?.buisnessType}
                  />
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mt-2">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">
                      About Company
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                      {userData?.description ||
                        "No business description provided yet."}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProfilePage;
