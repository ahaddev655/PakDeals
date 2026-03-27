import { useState, useEffect, useRef, useMemo } from "react";
import {
  Heart,
  MapPin,
  Search,
  FilterX,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function AllAdsPage() {
  // ==================== STATE ====================
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [ads, setAds] = useState([]);

  // ==================== EFFECTS ====================

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://pak-deals-backend.vercel.app/api/ads/all-ads")
      .then((response) => {
        const fetchedAds = response.data.data.ads;
        setAds(fetchedAds);
        setTotalPages(response.data.data.total_pages || 1);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // ==================== LOGIC ====================
  const handleFavorite = (ad) => {
    const currentFavs = JSON.parse(localStorage.getItem("favoriteAds")) || [];

    const isAlreadyFav = currentFavs.some(
      (item) => item.id === ad.id && item.table_name === ad.table_name,
    );

    let updated;
    if (isAlreadyFav) {
      updated = currentFavs.filter(
        (i) => !(i.id === ad.id && i.table_name === ad.table_name),
      );
    } else {
      const leanAd = {
        id: ad.id,
        table_name: ad.table_name,
        source_table: ad.source_table,
      };
      updated = [...currentFavs, leanAd];
    }

    setFavorites(updated);
    localStorage.setItem("favoriteAds", JSON.stringify(updated));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const matchesSearch = (ad.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [ads, search]);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-gray-200 mb-8 py-10 shadow-sm">
        <div className="page flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Browse All Ads
            </h1>
            <p className="text-gray-500 font-medium">
              Find the best deals across Pakistan
            </p>
          </div>

          <div className="relative w-full sm:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:border-blue-800 focus:ring-4 focus:ring-blue-50 outline-none font-medium"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {!isLoading ? (
          filteredAds.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {filteredAds.map((ad) => {
                  const isFav = favorites.some(
                    (item) =>
                      item.id === ad.id && item.table_name === ad.table_name,
                  );
                  return (
                    <Link
                      key={`${ad.table_name}-${ad.id}`}
                      to={`/ad/${ad.table_name || ad.source_table}/${ad.id}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 relative"
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleFavorite(ad);
                        }}
                        className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all ${
                          isFav
                            ? "bg-blue-900 text-white"
                            : "bg-white/80 text-gray-700"
                        }`}
                      >
                        <Heart
                          size={18}
                          fill={isFav ? "currentColor" : "none"}
                        />
                      </button>

                      <div className="h-48 overflow-hidden bg-gray-100">
                        <img
                          src={ad.image || ad.img}
                          alt={ad.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="p-5">
                        <span className="text-[10px] font-black text-blue-900 uppercase">
                          {ad.category}
                        </span>
                        <h3 className="text-md font-bold text-slate-800 mt-1 line-clamp-2 h-12">
                          {ad.title}
                        </h3>
                        <div className="mt-4 flex items-center gap-2 text-gray-400">
                          <MapPin size={14} className="text-orange-600" />
                          <span className="text-xs font-bold uppercase">
                            {ad.location}
                          </span>
                        </div>
                        <div className="mt-5 pt-4 border-t border-gray-50">
                          <h2 className="text-xl font-black text-blue-900">
                            Rs {Number(ad.price).toLocaleString()}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* --- FIXED PAGINATION CONTROLS --- */}
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
                    {/* FIXED: Array check to prevent crash if totalPages is 0 */}
                    {Array.from({ length: totalPages }, (_, idx) => (
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
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCw className="animate-spin text-blue-800" size={42} />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
              Syncing Ads...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllAdsPage;
