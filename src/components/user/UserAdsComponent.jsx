import { Eye, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAdsComponent() {
  // ==================== USESTATES ====================
  const [selectedNavTab, setSelectedNavTab] = useState("all-ads");
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);

  // ==================== ARRAYS ====================
  const tabs = [
    { key: "all-ads", label: "All Ads" },
    { key: "featured", label: "Featured" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "sold", label: "Sold" },
    { key: "expired", label: "Expired" },
  ];
  const sortTabs = [
    { key: "by-year", label: "Sort By Year" },
    { key: "by-name", label: "Sort By Name" },
  ];

  const statusStyles = {
    featured: "text-yellow-600 bg-yellow-100",
    active: "bg-green-100 text-green-600",
    inactive: "bg-red-100 text-red-600",
    sold: "bg-gray-100 text-gray-600",
    expired: "bg-red-100 text-red-600",
  };

  // ==================== REMOVE AD FUNCTION ====================
  const removeAd = (id) => {
    axios
      .get(`http://localhost:5000/api/ads/delete-user-ad/${id}`)
      .then((response) => {
        console.log(response.data);
        toast.success(response?.data?.message || "Ad deleted successfully");
      })
      .catch((error) => {
        toast.error(error?.data?.error || "Internal Server Error");
        console.log("FETCH USER ADS API ERROR: ", error);
      });
  };

  // ==================== API CONFIGURATION ====================
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/ads/all-user-ads/${userId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("FETCH USER ADS API ERROR: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* ==================== ADS HEADER ==================== */}
      <div className="p-6 lg:flex md:justify-between md:space-y-0 space-y-5 items-center">
        {/* -------------------- SEARCHBAR -------------------- */}
        <div className="relative">
          <Search className="absolute text-[#7f7f7f] top-2 left-2" />
          <input
            type="text"
            placeholder="Search Ad"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-200 rounded-md p-2 text-[15px] w-53 pl-10"
          />
        </div>
        {/* -------------------- SORT DROPDOWN -------------------- */}
        <div className="relative sm:mt-0 mt-4">
          <button
            type="button"
            onClick={() => setSortDropdownToggle(!sortDropdownToggle)}
            className="py-2 px-4 border border-gray-200 focus:border-blue-700 rounded-md w-35.25"
          >
            {sortTabs.find((s) => s.key === selectedSort)?.label || "Sort"}
          </button>
          <div
            className={`absolute top-full mt-2 left-0 w-40 bg-white shadow-lg border border-gray-200 p-1 rounded-md transition-all duration-300 origin-top transform ${
              sortDropdownToggle
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            }`}
          >
            {sortTabs.map((sort, i) => (
              <div
                key={i}
                className="cursor-pointer p-2 hover:bg-blue-50 rounded-md hover:text-blue-700"
                onClick={() => {
                  setSelectedSort(sort.key);
                  setSortDropdownToggle(false);
                }}
              >
                {sort.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* -------------------- NAVIGATION TABS -------------------- */}
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1 px-6 md:w-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedNavTab(tab.key)}
            className={`font-medium py-2 px-4 rounded-md transition-colors duration-300 ${
              selectedNavTab === tab.key
                ? "border-b-2 border-blue-500 text-blue-700"
                : "hover:bg-blue-50 text-gray-500 hover:text-blue-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <hr className="border-b border-gray-200 my-4" />
      {/* ==================== ADS CONTAINER ==================== */}
      <div className="bg-white">
        {/* -------------------- LOADER -------------------- */}
        {loading ? (
          <p className="text-center text-sm text-gray-700 py-3">
            Loading your ads...
          </p>
        ) : ads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  {[
                    "Title",
                    "Category",
                    "Status",
                    "Price",
                    "Date",
                    "Action",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`font-semibold text-[#495057] py-3 px-6 ${i < 2 ? "text-start" : "text-center"} ${h === "Category" ? "hidden md:table-cell" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ads
                  .filter(
                    (ad) =>
                      (selectedNavTab === "all-ads" ||
                        ad.status === selectedNavTab) &&
                      ad.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .sort((a, b) => {
                    if (selectedSort === "by-name") {
                      return a.title.localeCompare(b.title);
                    }
                    if (selectedSort === "by-year") {
                      return (
                        new Date(a.createdAt).getFullYear() -
                        new Date(b.createdAt).getFullYear()
                      );
                    }
                    return 0;
                  })
                  .map((ad, i, arr) => (
                    <tr
                      key={ad.id}
                      className={`border-b hover:bg-gray-100 transition-colors ease-in-out duration-200 ${i === arr.length - 1 ? "border-transparent" : "border-gray-300"}`}
                    >
                      <td className="py-4 px-6 text-[15px] text-gray-700">
                        <span className="hidden md:inline">{ad.title}</span>
                        <span className="md:hidden">
                          {ad.title.slice(0, 7) + "..."}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 hidden md:table-cell">
                        {ad.category}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span
                          className={`text-xs capitalize font-medium px-3 py-1 rounded-full ${statusStyles[ad.status]}`}
                        >
                          {ad.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 text-center">
                        PKR {Number(ad.price).toLocaleString()}
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 text-center">
                        {ad.createdAt.replaceAll("-", "/")}
                      </td>

                      <td className="py-4 px-6 flex items-center justify-center gap-4">
                        <div
                          className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-blue-800 transition-all duration-300 ease-in-out cursor-pointer"
                          onClick={() => setSelectedAd(ad)}
                        >
                          <Eye strokeWidth={1.9} size={18} />
                        </div>
                        <div
                          className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-red-800 transition-all duration-300 ease-in-out cursor-pointer"
                          onClick={() => removeAd(ad.id)}
                        >
                          <Trash2 strokeWidth={1.9} size={18} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-700 py-3">
            No ads available
          </p>
        )}
        {/* -------------------- ADS TABLE -------------------- */}

        {/* -------------------- ADS POPUP -------------------- */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${
            selectedAd ? "opacity-100 z-50" : "opacity-0 -z-10"
          }`}
          onClick={() => setSelectedAd(null)}
        >
          <div
            className={`bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl p-6 transition-all duration-300 ${
              selectedAd
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedAd && (
              <div className="space-y-4">
                {/* IMAGE */}
                <div className="w-full h-56 rounded-xl overflow-hidden border border-gray-200 shadow-md">
                  <img
                    src={selectedAd.img}
                    alt="IMG"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* DETAILS */}
                <div className="space-y-3">
                  {[
                    ["Title", selectedAd.title],
                    ["Category", selectedAd.category],
                    [
                      "Price",
                      `PKR ${Number(selectedAd.price).toLocaleString()}`,
                    ],
                    ["Status", selectedAd.status],
                    ["Created On", selectedAd.createdAt.replaceAll("-", "/")],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center">
                      <h5 className="text-sm font-semibold text-gray-500 uppercase">
                        {label}
                      </h5>
                      <p className="text-sm font-semibold text-blue-700 text-right">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
                    onClick={() => setSelectedAd(null)}
                  >
                    Cancel
                  </button>

                  {(selectedAd.status === "active" ||
                    selectedAd.status === "featured") && (
                    <button
                      type="button"
                      className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
                      onClick={() => {
                        setAds((prev) =>
                          prev.map((ad) =>
                            ad.id === selectedAd.id
                              ? { ...ad, status: "inactive" }
                              : ad,
                          ),
                        );
                        setSelectedAd((prev) => ({
                          ...prev,
                          status: "inactive",
                        }));
                        setSelectedAd(null);
                      }}
                    >
                      Inactive
                    </button>
                  )}

                  {selectedAd.status === "inactive" && (
                    <button
                      type="button"
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
                      onClick={() => {
                        setAds((prev) =>
                          prev.map((ad) =>
                            ad.id === selectedAd.id
                              ? { ...ad, status: "active" }
                              : ad,
                          ),
                        );
                        setSelectedAd((prev) => ({
                          ...prev,
                          status: "active",
                        }));
                        setSelectedAd(null);
                      }}
                    >
                      Active
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdsComponent;
