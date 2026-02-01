import { Eye, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";

function UserListingsComponent() {
  const [selectedNavTab, setSelectedNavTab] = useState("all-ads");
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
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
      img: "/assets/profile.jpg",
      title: "Samsung Galaxy S25 Ultra",
      category: "Mobile Phones",
      price: "500000",
      status: "featured",
      createdAt: "2022-04-02",
    },
    {
      id: 2,
      img: "/assets/profile.jpg",
      title: "iPhone 14 Pro",
      category: "Mobile Phones",
      price: "300000",
      status: "active",
      createdAt: "2023-02-02",
    },
    {
      id: 3,
      img: "/assets/profile.jpg",
      title: "OnePlus 11",
      category: "Mobile Phones",
      price: "200000",
      status: "inactive",
      createdAt: "2026-07-02",
    },
    {
      id: 4,
      img: "/assets/profile.jpg",
      title: "Nokia 3310",
      category: "Mobile Phones",
      price: "100000",
      status: "sold",
      createdAt: "2024-09-02",
    },
    {
      id: 5,
      img: "/assets/profile.jpg",
      title: "Motorola Edge",
      category: "Mobile Phones",
      price: "50000",
      status: "expired",
      createdAt: "2025-01-02",
    },
    {
      id: 6,
      img: "/assets/profile.jpg",
      title: "Samsung Note 20",
      category: "Mobile Phones",
      price: "350000",
      status: "featured",
      createdAt: "2022-11-15",
    },
    {
      id: 7,
      img: "/assets/profile.jpg",
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

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* ==================== LISTING HEADER ==================== */}
      <div className="border-b border-gray-300 p-6 md:flex md:justify-between md:space-y-0 space-y-5 items-center">
        {/* -------------------- SEARCHBAR -------------------- */}
        <div className="relative">
          <Search className="absolute text-[#7f7f7f] top-2 left-2" />
          <input
            type="text"
            placeholder="Search Listing"
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
      {/* ==================== LISTING CONTAINER ==================== */}
      <div className="bg-white py-3">
        {/* -------------------- LOADER -------------------- */}
        {loading && (
          <p className="text-center text-sm text-gray-700">
            Loading your ads...
          </p>
        )}
        {/* -------------------- LISTING TABLE -------------------- */}
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
                      className={`font-semibold text-[#495057] py-3 px-6 ${i < 2 ? "text-start" : "text-center"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ads
                  .filter((ad) =>
                    selectedNavTab === "all-ads"
                      ? true
                      : ad.status === selectedNavTab,
                  )
                  .sort((a, b) => {
                    if (selectedSort === "by-date") {
                      return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                    if (selectedSort === "by-name") {
                      return a.title.localeCompare(b.title);
                    }
                    if (selectedSort === "by-year") {
                      return (
                        new Date(b.createdAt).getFullYear() -
                        new Date(a.createdAt).getFullYear()
                      );
                    }
                    return 0;
                  })
                  .map((ad, i, arr) => (
                    <tr
                      key={ad.id}
                      className={`border-b ${i === arr.length - 1 ? "border-transparent" : "border-gray-300"}`}
                    >
                      <td className="py-4 px-6 text-[15px] text-gray-700">
                        {ad.title}
                      </td>
                      <td className="py-4 px-6 text-[15px] text-gray-700">
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
                        <div className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-blue-800 transition-all duration-300 ease-in-out cursor-pointer">
                          <Eye strokeWidth={1.9} size={18} />
                        </div>
                        <div className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-red-800 transition-all duration-300 ease-in-out cursor-pointer">
                          <Trash2 strokeWidth={1.9} size={18} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-700">No ads available</p>
        )}
      </div>
    </div>
  );
}

export default UserListingsComponent;
