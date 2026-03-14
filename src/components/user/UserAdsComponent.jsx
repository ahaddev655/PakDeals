import {
  Eye,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  RefreshCw,
  PackageOpen,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function UserAdsComponent() {
  const [selectedNavTab, setSelectedNavTab] = useState("all-ads");
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const userId = localStorage.getItem("id");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const perPage = 20;

  const tabs = [
    { key: "all-ads", label: "All Ads" },
    { key: "featured", label: "Featured" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "pending", label: "Pending" },
    { key: "sold", label: "Sold" },
  ];

  const statusStyles = {
    featured: "text-amber-700 bg-amber-100 border border-amber-200",
    active: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    inactive: "bg-slate-100 text-slate-600 border border-slate-200",
    pending: "bg-rose-100 text-rose-700 border border-rose-200",
    sold: "bg-gray-100 text-gray-500 border border-gray-200",
  };

  const getStatus = (ad) => {
    if (ad.isSold) return "sold";
    if (ad.isFeatured) return "featured";
    if (ad.isActive) return "active";
    if (ad.isPending) return "pending";
    return "inactive";
  };

  const formatAd = useCallback(
    (ad) => ({
      id: ad.id,
      title: ad.adTitle,
      category: ad.subCategory,
      price: ad.price,
      table_name: ad.table_name,
      createdAt: ad.created_at
        ? new Date(ad.created_at).toLocaleDateString("en-GB")
        : "N/A",
      status: getStatus(ad),
      img:
        JSON.parse(ad.images || "[]")[0] || "https://via.placeholder.com/300",
    }),
    [],
  );

  const fetchUserAds = useCallback(
    (page = 1) => {
      setLoading(true);
      axios
        .get(
          `https://pak-deals-backend.vercel.app/api/ads/all-user-ads-paginated/${userId}?page=${page}&per_page=${perPage}`,
        )
        .then((res) => {
          const result = res?.data?.data || {};
          setAds((result.ads || []).map(formatAd));
          setTotalPages(result.total_pages || 1);
          setTotalAds(result.total || 0);
          setCurrentPage(result.page || page);
        })
        .catch(() => toast.error("Failed to load ads"))
        .finally(() => setLoading(false));
    },
    [userId, formatAd],
  );

  useEffect(() => {
    if (userId) fetchUserAds(1);
  }, [userId, fetchUserAds]);

  const updateAdStatus = (id, tableName, newStatus) => {
    const endpoint = `https://pak-deals-backend.vercel.app/api/status/${newStatus}/${tableName}/${id}`;
    axios
      .put(endpoint)
      .then(() => {
        toast.success(`Status updated to ${newStatus}`);
        setAds((prev) =>
          prev.map((ad) => (ad.id === id ? { ...ad, status: newStatus } : ad)),
        );
        setSelectedAd(null);
      })
      .catch(() => toast.error("Update failed"));
  };

  const removeAd = (id, tableName) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    const loadId = toast.loading("Removing ad...");
    axios
      .delete(
        `https://pak-deals-backend.vercel.app/api/ads/delete-user-ad/${id}/${tableName}`,
      )
      .then(() => {
        toast.update(loadId, {
          render: "Ad deleted",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchUserAds(currentPage);
      })
      .catch(() =>
        toast.update(loadId, {
          render: "Delete failed",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        }),
      );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />

      {/* HEADER CONTROLS */}
      <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
        <div className="relative group flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-medium text-slate-700"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setSortDropdownToggle(!sortDropdownToggle)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm"
          >
            Sort: {selectedSort === "by-name" ? "Name" : "Year"}
          </button>
          {sortDropdownToggle && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl z-30 p-1 animate-in fade-in slide-in-from-top-2">
              <button
                onClick={() => {
                  setSelectedSort("by-name");
                  setSortDropdownToggle(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-lg text-sm font-bold text-slate-600"
              >
                By Name
              </button>
              <button
                onClick={() => {
                  setSelectedSort("by-year");
                  setSortDropdownToggle(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-lg text-sm font-bold text-slate-600"
              >
                By Year
              </button>
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 px-6 overflow-x-auto no-scrollbar border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setSelectedNavTab(tab.key);
              setCurrentPage(1);
            }}
            className={`whitespace-nowrap py-4 px-4 text-sm font-black uppercase tracking-widest transition-all border-b-2 ${
              selectedNavTab === tab.key
                ? "border-blue-800 text-blue-800"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCw className="animate-spin text-blue-800" size={32} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
              Syncing Ads...
            </p>
          </div>
        ) : ads.length > 0 ? (
          <table className="w-full min-w-200">
            <thead className="bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-tighter">
              <tr>
                <th className="py-4 px-6 text-left">Listing Details</th>
                <th className="py-4 px-6 text-center">Category</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Price</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ads
                .filter(
                  (ad) =>
                    (selectedNavTab === "all-ads" ||
                      ad.status === selectedNavTab) &&
                    ad.title.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .sort((a, b) =>
                  selectedSort === "by-name"
                    ? a.title.localeCompare(b.title)
                    : new Date(b.createdAt) - new Date(a.createdAt),
                )
                .map((ad) => (
                  <tr
                    key={ad.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={ad.img}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                          alt=""
                        />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">
                            {ad.title}
                          </p>
                          <p className="text-xs text-slate-400 font-medium">
                            {ad.createdAt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-bold text-slate-600">
                      {ad.category}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusStyles[ad.status]}`}
                      >
                        {ad.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-black text-slate-900">
                      Rs {Number(ad.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedAd(ad)}
                          className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-700 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => removeAd(ad.id, ad.table_name)}
                          className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                          title="Delete Listing"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <PackageOpen size={48} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Ads Found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              You haven't posted any ads yet or no results match your search
              criteria.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {ads.length > 0 && (
        <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4 bg-slate-50/30">
          <p className="text-sm font-bold text-slate-500">
            Total: {totalAds} Listings
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchUserAds(currentPage - 1)}
              className="p-2 disabled:opacity-30 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg font-black text-sm text-blue-800 shadow-sm">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchUserAds(currentPage + 1)}
              className="p-2 disabled:opacity-30 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedAd && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedAd(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img
                src={selectedAd.img}
                className="w-full h-full object-cover"
                alt=""
              />
              <button
                onClick={() => setSelectedAd(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-black transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1 leading-tight">
                    {selectedAd.title}
                  </h2>
                  <p className="text-blue-700 font-black text-xl">
                    Rs {Number(selectedAd.price).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusStyles[selectedAd.status]}`}
                >
                  {selectedAd.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    Category
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedAd.category}
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                    Listed On
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {selectedAd.createdAt}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/ad/${selectedAd.table_name}/${selectedAd.id}`}
                  className="block"
                >
                  <button className="w-full py-4 bg-blue-900 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
                    View Public Listing
                  </button>
                </Link>
                {selectedAd.status !== "sold" && (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedAd.status === "inactive" || selectedAd.status === "pending" ? (
                      <button
                        onClick={() =>
                          updateAdStatus(
                            selectedAd.id,
                            selectedAd.table_name,
                            "active",
                          )
                        }
                        className="py-3 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-emerald-700"
                      >
                        Set Active
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          updateAdStatus(
                            selectedAd.id,
                            selectedAd.table_name,
                            "inactive",
                          )
                        }
                        className="py-3 bg-slate-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-slate-700"
                      >
                        Set Inactive
                      </button>
                    )}
                    <button
                      onClick={() =>
                        updateAdStatus(
                          selectedAd.id,
                          selectedAd.table_name,
                          "sold",
                        )
                      }
                      className="py-3 bg-amber-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-amber-700"
                    >
                      Mark Sold
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAdsComponent;
