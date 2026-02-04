import { Eye, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function UserAdsComponent() {
  const [selectedNavTab, setSelectedNavTab] = useState("all-ads");
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
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
  const [ads, setAds] = useState([
    {
      id: 1,
      img: "/assets/k5lf638szuebxt02cpab.jpg",
      title: "Samsung Galaxy S25 Ultra",
      category: "Mobile Phones",
      price: "500000",
      status: "featured",
      createdAt: "2022-04-02",
    },
    {
      id: 2,
      img: "/assets/k5lf638szuebxt02cpab.jpg",
      title: "iPhone 14 Pro",
      category: "Mobile Phones",
      price: "300000",
      status: "active",
      createdAt: "2023-02-02",
    },
    {
      id: 3,
      img: "/assets/k5lf638szuebxt02cpab.jpg",
      title: "OnePlus 11",
      category: "Mobile Phones",
      price: "200000",
      status: "inactive",
      createdAt: "2026-07-02",
    },
    {
      id: 4,
      img: "/assets/k5lf638szuebxt02cpab.jpg",
      title: "Nokia 3310",
      category: "Mobile Phones",
      price: "100000",
      status: "sold",
      createdAt: "2024-09-02",
    },
    {
      id: 5,
      img: "/assets/k5lf638szuebxt02cpab.jpg",
      title: "Motorola Edge",
      category: "Mobile Phones",
      price: "50000",
      status: "expired",
      createdAt: "2025-01-02",
    },
    {
      id: 6,
      img: "/assets/k5lf638szuebxt02cpab.jpg",
      title: "Samsung Note 20",
      category: "Mobile Phones",
      price: "350000",
      status: "featured",
      createdAt: "2022-11-15",
    },
    {
      id: 7,
      img: "/assets/k5lf638szuebxt02cpab.jpg",
      title: "iPhone 12",
      category: "Mobile Phones",
      price: "250000",
      status: "active",
      createdAt: "2023-05-10",
    },
  ]);

  const statusStyles = {
    featured: "text-yellow-600 bg-yellow-100",
    active: "bg-green-100 text-green-600",
    inactive: "bg-red-100 text-red-600",
    sold: "bg-gray-100 text-gray-600",
    expired: "bg-red-100 text-red-600",
  };

  const removeAd = (id) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* ==================== ADS HEADER ==================== */}
      <div className="border-b border-gray-300 p-6 md:flex md:justify-between md:space-y-0 space-y-5 items-center">
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
        {/* -------------------- NAVIGATION TABS -------------------- */}
        <div className="sm:flex items-center gap-3">
          <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-1">
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
          {/* -------------------- SORT DROPDOWN -------------------- */}
          <div className="relative sm:mt-0 mt-4">
            <button
              onClick={() => setSortDropdownToggle(!sortDropdownToggle)}
              className="py-2 px-4 border border-gray-200 focus:border-blue-700 rounded-md"
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
      </div>
      {/* ==================== ADS CONTAINER ==================== */}
      <div className="bg-white">
        {/* -------------------- LOADER -------------------- */}
        {loading && (
          <p className="text-center text-sm text-gray-700">
            Loading your ads...
          </p>
        )}
        {/* -------------------- ADS TABLE -------------------- */}
        {ads.length > 0 ? (
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
        {/* -------------------- ADS POPUP -------------------- */}
        <div
          className={`fixed top-0 left-0 bg-black/50 backdrop-blur-md w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out ${selectedAd ? "opacity-100 z-10" : "opacity-0 -z-10"}`}
          onClick={() => setSelectedAd(null)}
        >
          <div
            className={`bg-white w-md rounded-lg border border-gray-400 shadow-lg py-4 px-6 transition-all duration-300 ease-in-out ${selectedAd ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedAd && (
              <div>
                {/* -------------------- AD IMAGE -------------------- */}
                <div className="w-full h-50 rounded-lg">
                  <img
                    src={selectedAd.img}
                    alt="IMG"
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="mt-3 space-y-3">
                  {/* -------------------- TITLE -------------------- */}
                  <div className="flex items-center gap-1">
                    <h5 className="text-lg font-medium">Title:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.title}
                    </h5>
                  </div>
                  {/* -------------------- CATEGORY -------------------- */}
                  <div className="flex items-center gap-1">
                    <h5 className="text-lg font-medium">Category:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.category}
                    </h5>
                  </div>
                  {/* -------------------- PRICE -------------------- */}
                  <div className="flex items-center gap-1">
                    <h5 className="text-lg font-medium">Price:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      PKR {Number(selectedAd.price).toLocaleString()}
                    </h5>
                  </div>
                  {/* -------------------- STATUS -------------------- */}
                  <div className="flex items-center gap-1">
                    <h5 className="text-lg font-medium">Status:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.status}
                    </h5>
                  </div>
                  {/* -------------------- CREATED ON -------------------- */}
                  <div className="flex items-center gap-1">
                    <h5 className="text-lg font-medium">Created On:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.createdAt.replaceAll("-", "/")}
                    </h5>
                  </div>
                </div>
                {/* -------------------- BUTTONS -------------------- */}
                <div className="flex items-center gap-6 mt-3">
                  <button
                    type="button"
                    className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 transition-colors ease-in-out duration-300 text-white rounded-sm"
                    onClick={() => setSelectedAd(null)}
                  >
                    Cancel
                  </button>

                  {selectedAd.status === "active" ? (
                    <button
                      type="button"
                      className="w-full py-3 px-6 bg-red-500 hover:bg-red-600 transition-colors ease-in-out duration-300 text-white rounded-sm"
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
                  ) : selectedAd.status === "inactive" ? (
                    <button
                      type="button"
                      className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 transition-colors ease-in-out duration-300 text-white rounded-sm"
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
                  ) : (
                    ""
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
