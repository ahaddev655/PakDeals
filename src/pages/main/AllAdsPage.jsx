import { useState, useEffect, useRef, useMemo } from "react";
import {
  ChevronDown,
  Heart,
  MapPin,
  Search,
  FilterX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

function AllAdsPage() {
  // ==================== STATE ====================
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Pagination States (Initialized for Dummy Data)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Dummy total pages
  const perPage = 20;

  const dropdownRef = useRef(null);

  const categories = [
    "All",
    "Motors",
    "Mobiles",
    "Property For Sale",
    "Property For Rent",
    "Electronics & Appliances",
    "Bikes",
    "Animals",
    "Furniture & Home Decor",
    "Fashion & Beauty",
    "Books & Sports Items",
    "Kids",
  ];

  const ads = [
    {
      id: 1,
      category: "Property For Rent",
      subCategory: "Property For Rent",
      title: "10-Marla Brand New Lush HOUSE For SALE Faisalabad.",
      location: "Punjab, Pakistan",
      price: 3000000,
      image: "/assets/k5lf638szuebxt02cpab.jpg",
      table_name: "property_rent_ads",
      source_table: "property_rent_ads",
    },
    {
      id: 2,
      category: "Property For Sale",
      subCategory: "Property For Sale",
      title: "Luxury Apartment in Karachi.",
      location: "Sindh, Pakistan",
      price: 15000000,
      image: "/assets/k5lf638szuebxt02cpab.jpg",
      table_name: "property_sale_ads",
      source_table: "property_sale_ads",
    },
    {
      id: 3,
      category: "Mobiles",
      subCategory: "Mobiles",
      title: "Samsung S25 Ultra Phantom Black.",
      location: "Balochistan, Pakistan",
      price: 200000,
      image: "/assets/k5lf638szuebxt02cpab.jpg",
      table_name: "mobiles_ads",
      source_table: "mobiles_ads",
    },
    {
      id: 4,
      category: "Motors",
      subCategory: "Motors",
      title: "Honda Civic RS 2024 Model.",
      location: "Khyber Pakhtunkhwa, Pakistan",
      price: 8500000,
      image: "/assets/k5lf638szuebxt02cpab.jpg",
      table_name: "motors_ads",
      source_table: "motors_ads",
    },
  ];

  // ==================== EFFECTS ====================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    const stored = JSON.parse(localStorage.getItem("favoriteAds")) || [];
    setFavorites(stored);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==================== LOGIC ====================
  const handleFavorite = (ad) => {
    let updated = favorites.some((f) => f.id === ad.id)
      ? favorites.filter((f) => f.id !== ad.id)
      : [...favorites, ad];
    setFavorites(updated);
    localStorage.setItem("favoriteAds", JSON.stringify(updated));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // When API is ready: fetchAds(page);
  };

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const matchesCategory = selected === "All" || ad.category === selected;
      const matchesSearch = ad.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selected, search]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-gray-200 mb-8 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Browse All Ads
            </h1>
            <p className="text-gray-500 font-medium">
              Find the best deals across Pakistan
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Category Dropdown */}
            <div ref={dropdownRef} className="relative w-full sm:w-64">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-200 hover:border-blue-600 focus:ring-4 focus:ring-blue-50 font-bold text-slate-700 transition-all"
              >
                <span className="truncate">{selected}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelected(cat);
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-900 text-sm font-bold text-slate-600 transition"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80 group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-900"
                size={18}
              />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:border-blue-800 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {filteredAds.length > 0 ? (
          <>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
              {filteredAds.map((ad) => {
                const isFav = favorites.some((item) => item.id === ad.id);
                return (
                  <Link
                    key={ad.id}
                    to={`/ad/${ad.table_name || ad.source_table}/${ad.id}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 relative"
                  >
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavorite(ad);
                      }}
                      className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 ${
                        isFav
                          ? "bg-blue-900 text-white shadow-lg"
                          : "bg-white/80 backdrop-blur text-gray-700 hover:bg-white hover:text-red-500 shadow-sm"
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={isFav ? "currentColor" : "none"}
                        strokeWidth={2.5}
                      />
                    </button>

                    {/* Image */}
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img
                        src={ad.image || ad.img}
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">
                        {ad.subCategory}
                      </span>
                      <h3 className="text-md font-bold text-slate-800 mt-1 line-clamp-2 h-12">
                        {ad.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-2 text-gray-400">
                        <MapPin size={14} className="text-orange-600" />
                        <span className="text-xs font-bold uppercase tracking-tighter">
                          {ad.location}
                        </span>
                      </div>

                      <div className="mt-5 pt-4 border-t border-gray-50">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">
                          Price
                        </p>
                        <h2 className="text-xl font-black text-blue-900">
                          Rs {ad.price.toLocaleString()}
                        </h2>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-3 disabled:opacity-30 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all active:scale-90"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                        currentPage === idx + 1
                          ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20"
                          : "bg-white border border-gray-100 text-slate-400 hover:border-gray-300"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-3 disabled:opacity-30 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all active:scale-90"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
            <FilterX className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-800">
              No matches found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllAdsPage;
