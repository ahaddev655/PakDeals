import React, { useEffect, useState, useMemo } from "react";
import {
  Eye,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// ==================== CONSTANTS & HELPERS ====================
const API_BASE_URL = "https://pak-deals-backend.vercel.app/api/ads";

const TABS = [
  { key: "all-ads", label: "All Ads" },
  { key: "featured", label: "Featured" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "pending", label: "Pending" },
  { key: "sold", label: "Sold" },
  { key: "expired", label: "Expired" },
];

const SORT_OPTIONS = [
  { key: "by-year", label: "Sort By Year" },
  { key: "by-name", label: "Sort By Name" },
];

const STATUS_STYLES = {
  featured: "text-yellow-600 bg-yellow-100",
  active: "bg-green-100 text-green-600",
  inactive: "bg-red-100 text-red-600",
  pending: "bg-red-100 text-red-600",
  sold: "bg-gray-100 text-gray-600",
  expired: "bg-red-100 text-red-600",
};

const CATEGORY_MAP = {
  "Mobile Phones": "mobile_ads",
  Tablets: "mobile_ads",
  Accessories: "mobile_ads",
  Cars: "motors_ads",
  "Car Accessories": "motors_ads",
  "Spare Parts": "motors_ads",
  Houses: "property_sale_ads",
  Plots: "property_sale_ads",
  Flats: "property_sale_ads",
  "Computers & Accessories": "electronics_ads",
  Motorcycles: "bikes_ads",
  Birds: "animal_ads",
  Cats: "animal_ads",
  "Sofa & Chairs": "furniture_ads",
  Clothes: "fashion_ads",
  Footwear: "fashion_ads",
  "Books & Magazines": "books_ads",
  // ... (Keep your full mapping here)
};

const getStatus = (ad) => {
  if (ad.isSold) return "sold";
  if (ad.isExpired) return "expired";
  if (ad.isFeatured) return "featured";
  if (ad.isActive) return "active";
  if (ad.isPending) return "pending";
  return "inactive";
};

function AdminAdsComponent() {
  // ==================== STATES ====================
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNavTab, setSelectedNavTab] = useState("all-ads");
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const perPage = 20;

  const userId = localStorage.getItem("id");

  // ==================== API ACTIONS ====================
  const fetchUserAds = async (page = 1) => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/all-user-ads-paginated/${userId}?page=${page}&per_page=${perPage}`,
      );
      const res = data?.data || {};

      const formatted = (res.ads || []).map((ad) => ({
        id: ad.id,
        title: ad.adTitle,
        category: ad.subCategory,
        price: ad.price,
        createdAt: ad.created_at
          ? ad.created_at.slice(5, 16).replace(/ /g, "/")
          : "",
        status: getStatus(ad),
        img: JSON.parse(ad.images || "[]")[0] || "",
      }));

      setAds(formatted);
      setTotalPages(res.total_pages || 1);
      setTotalAds(res.total || 0);
      setCurrentPage(res.page || page);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch ads");
    } finally {
      setLoading(false);
    }
  };

  const removeAd = async (id, category) => {
    const tableName = CATEGORY_MAP[category];
    if (!tableName) return toast.error("Invalid category table mapping.");

    const loadingToast = toast.loading("Deleting ad...");
    try {
      await axios.delete(`${API_BASE_URL}/delete-user-ad/${id}/${tableName}`);
      toast.update(loadingToast, {
        render: "Ad deleted",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });

      // Refresh or go back a page if last item deleted
      ads.length === 1 && currentPage > 1
        ? setCurrentPage((p) => p - 1)
        : fetchUserAds(currentPage);
      if (selectedAd?.id === id) setSelectedAd(null);
    } catch (error) {
      toast.update(loadingToast, {
        render: "Delete failed",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  // ==================== LOGIC ====================
  useEffect(() => {
    fetchUserAds(1);
  }, [userId]);

  const filteredAndSortedAds = useMemo(() => {
    return ads
      .filter((ad) => {
        const matchesTab =
          selectedNavTab === "all-ads" || ad.status === selectedNavTab;
        const matchesSearch = ad.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
      })
      .sort((a, b) => {
        if (selectedSort === "by-name") return a.title.localeCompare(b.title);
        if (selectedSort === "by-year")
          return new Date(a.createdAt) - new Date(b.createdAt);
        return 0;
      });
  }, [ads, selectedNavTab, searchQuery, selectedSort]);

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    fetchUserAds(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==================== UI COMPONENTS ====================
  const StatusBadge = ({ status }) => (
    <span
      className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <ToastContainer position="top-right" autoClose={1500} theme="light" />

      {/* HEADER SECTION */}
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50">
        <div className="relative flex-1 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search ads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setSortDropdownToggle(!sortDropdownToggle)}
            className="px-4 py-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 min-w-40 justify-between"
          >
            {SORT_OPTIONS.find((s) => s.key === selectedSort)?.label}
          </button>
          {sortDropdownToggle && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg z-20 overflow-hidden animate-in fade-in zoom-in duration-200">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors text-sm"
                  onClick={() => {
                    setSelectedSort(opt.key);
                    setSortDropdownToggle(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="px-6 pt-4 flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setSelectedNavTab(tab.key);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-all ${
              selectedNavTab === tab.key
                ? "border-blue-600 text-blue-600 bg-blue-50/30"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="min-h-100">
        {loading ? (
          <div className="py-20 text-center text-gray-500 animate-pulse">
            Loading your listings...
          </div>
        ) : filteredAndSortedAds.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Listing</th>
                  <th className="px-6 py-4 font-semibold hidden lg:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold text-center">Price</th>
                  <th className="px-6 py-4 font-semibold text-center hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAndSortedAds.map((ad) => (
                  <tr
                    key={ad.id}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 line-clamp-1">
                        {ad.title}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell text-gray-500 text-sm">
                      {ad.category}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={ad.status} />
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-gray-700 text-sm">
                      PKR {Number(ad.price).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400 text-sm hidden sm:table-cell">
                      {ad.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelectedAd(ad)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => removeAd(ad.id, ad.category)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400">
            No ads found matching your criteria.
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {(currentPage - 1) * perPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-700">
              {Math.min(currentPage * perPage, totalAds)}
            </span>{" "}
            of {totalAds}
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 rounded-md border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {/* Simple range logic or full logic as before */}
            <span className="px-4 text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 rounded-md border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="relative h-56 group">
              <img
                src={selectedAd.img}
                alt={selectedAd.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedAd(null)}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Status
                  </span>
                  <StatusBadge status={selectedAd.status} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedAd.title}
                </h3>
                <p className="text-2xl font-black text-blue-600">
                  PKR {Number(selectedAd.price).toLocaleString()}
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setSelectedAd(null)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Close
                </button>
                {selectedAd.status === "active" ? (
                  <button className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg shadow-red-200 transition-all">
                    Deactivate
                  </button>
                ) : (
                  <button className="flex-1 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg shadow-green-200 transition-all">
                    Activate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAdsComponent;
