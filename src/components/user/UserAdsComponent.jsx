import {
  Eye,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function UserAdsComponent() {
  // ==================== USESTATES ====================
  const [selectedNavTab, setSelectedNavTab] = useState("all-ads");
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const userId = localStorage.getItem("id");

  // ==================== PAGINATION STATES ====================
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const [perPage] = useState(20);

  // ==================== ARRAYS ====================
  const tabs = [
    { key: "all-ads", label: "All Ads" },
    { key: "featured", label: "Featured" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "pending", label: "Pending " },
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
    pending: "bg-red-100 text-red-600",
    sold: "bg-gray-100 text-gray-600",
    expired: "bg-red-100 text-red-600",
  };

  const getStatus = (ad) =>
    ad.isSold
      ? "sold"
      : ad.isExpired
        ? "expired"
        : ad.isFeatured
          ? "featured"
          : ad.isActive
            ? "active"
            : ad.isPending
              ? "pending"
              : "inactive";

  const formatAd = (ad) => ({
    id: ad.id,
    title: ad.adTitle,
    category: ad.subCategory,
    price: ad.price,
    table_name: ad.table_name || source_table,
    createdAt: ad.created_at
      ? ad.created_at.slice(5, 16).replaceAll(" ", "/")
      : "",
    status: getStatus(ad),
    img: JSON.parse(ad.images || "[]")[0] || "",
  });

  // ==================== REMOVE AD FUNCTION ====================
  const removeAd = (id, category) => {
    const tableName = categoryToTableMap[category];

    if (!tableName) {
      toast.error(`Invalid category: ${category}. Cannot delete ad.`);
      return;
    }

    const loadingToast = toast.loading("Deleting ad...");

    axios
      .delete(
        `https://pak-deals-backend.vercel.app/api/ads/delete-user-ad/${Number(id)}/${tableName}`,
      )
      .then((response) => {
        const data = response?.data;

        toast.update(loadingToast, {
          render: data?.message || "Ad deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        ads.length === 1 && currentPage > 1
          ? setCurrentPage((p) => p - 1)
          : fetchUserAds(currentPage);

        if (selectedAd?.id === id) setSelectedAd(null);
      })
      .catch((error) => {
        toast.update(loadingToast, {
          render: error?.response?.data?.error || "Internal Server Error",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      });
  };

  // ==================== FETCH USER ADS WITH PAGINATION ====================
  const fetchUserAds = (page = 1) => {
    setLoading(true);

    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/ads/all-user-ads-paginated/${userId}?page=${page}&per_page=${perPage}`,
      )
      .then((response) => {
        const data = response?.data;
        const res = data?.data || {};

        setAds((res.ads || []).map(formatAd));
        setTotalPages(res.total_pages || 1);
        setTotalAds(res.total || 0);
        setCurrentPage(res.page || page);

        toast.success(data?.message || "Ads Fetched Successfully");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ==================== PAGINATION HANDLERS ====================
  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    fetchUserAds(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= delta)
        pages.push(i);
    }

    return pages.reduce((acc, page, i) => {
      if (i && page - pages[i - 1] > 1) acc.push("...");
      acc.push(page);
      return acc;
    }, []);
  };

  useEffect(() => {
    if (userId) fetchUserAds(1);
  }, [userId]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <ToastContainer position="top-right" autoClose={1500} theme="light" />
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

      {/* ==================== NAVIGATION TABS ==================== */}
      <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-1 px-6 md:w-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setSelectedNavTab(tab.key);
              setCurrentPage(1);
              fetchUserAds(1);
            }}
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
          <>
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
                    .filter((ad) => {
                      const matchesSearch = ad.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());

                      return (
                        (selectedNavTab === "all-ads" ||
                          ad.status === selectedNavTab) &&
                        matchesSearch
                      );
                    })
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
                            onClick={() => removeAd(ad.id, ad.category)}
                          >
                            <Trash2 strokeWidth={1.9} size={18} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* ==================== PAGINATION ==================== */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * perPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * perPage, totalAds)}
                  </span>{" "}
                  of <span className="font-medium">{totalAds}</span> results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md border ${
                      currentPage === 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {getVisiblePages().map((page, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        typeof page === "number" && handlePageChange(page)
                      }
                      disabled={page === "..."}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        page === currentPage
                          ? "bg-blue-800 text-white shadow-md"
                          : page === "..."
                            ? "cursor-default text-gray-600"
                            : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md border ${
                      currentPage === totalPages
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-gray-700 py-3">
            No ads available
          </p>
        )}

        {/* -------------------- ADS POPUP -------------------- */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${
            selectedAd ? "opacity-100 z-50" : "opacity-0 -z-10"
          }`}
          onClick={() => setSelectedAd(null)}
        >
          <div
            className={`bg-white relative w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl p-6 transition-all duration-300 ${
              selectedAd
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-8 h-8 rounded-full bg-black grid place-items-center absolute -top-1 -right-2 cursor-pointer"
              onClick={() => setSelectedAd(null)}
            >
              <X className="text-white" size={20} strokeWidth={3} />
            </div>
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
                  <Link
                    to={`/ad/${selectedAd.table_name}/${selectedAd.id}`}
                    className="w-1/2"
                  >
                    <button
                      type="button"
                      className="flex-1 py-3 w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
                    >
                      View Ad
                    </button>
                  </Link>

                  {(selectedAd.status === "active" ||
                    selectedAd.status === "featured") && (
                    <button
                      type="button"
                      className="flex-1 w-1/2 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
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

                  {(selectedAd.status === "pending" ||
                    selectedAd.status === "inactive") && (
                    <button
                      type="button"
                      className="flex-1 py-3 w-1/2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
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
