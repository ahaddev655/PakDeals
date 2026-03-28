import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, MapPin, Search, ShoppingBag, ArrowRight } from "lucide-react";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchQuery = searchParams.get("search");

  // Placeholder for favorite logic
  const [favorites, setFavorites] = useState([]);
  const handleFavorite = (adId) => {
    setFavorites((prev) =>
      prev.includes(adId) ? prev.filter((id) => id !== adId) : [...prev, adId],
    );
  };

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(
          `https://pak-deals-backend.vercel.app/api/ads/search-ads?search=${searchQuery}`,
        )
        .then((response) => {
          setSearchResults(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching ads:", error);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {searchQuery ? (
          <section className="search-results">
            {/* Enhanced Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  Search Results
                </h2>
                <p className="text-gray-500 mt-1">
                  Showing matches for{" "}
                  <span className="text-blue-600 font-semibold">
                    "{searchQuery}"
                  </span>
                </p>
              </div>
              {!loading && (
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                  {searchResults.length} items found
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 8].map((n) => (
                  <div
                    key={n}
                    className="border-2 border-gray-100 rounded-2xl p-2 bg-white animate-pulse"
                  >
                    <div className="bg-gray-200 aspect-4/3 rounded-xl w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((ad) => {
                  const adImages = ad.images ? JSON.parse(ad.images) : [];
                  const displayImage =
                    adImages[0] || "https://via.placeholder.com/400x300";
                  const isFav = favorites.includes(ad.id);

                  return (
                    <Link
                      key={ad.id}
                      to={`/ad/${ad.table_name}/${ad.id}`}
                      className="group"
                    >
                      <div className="border-2 border-blue-800 rounded-2xl p-2 bg-white hover:shadow-xl transition-all duration-300 relative">
                        {ad.featured && (
                          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-amber-200/50 py-1 px-3 rounded-full shadow-md">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-700">
                              Featured
                            </span>
                          </div>
                        )}

                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={displayImage}
                            alt={ad.adTitle}
                            className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              handleFavorite(ad.id);
                            }}
                            className={`absolute top-2 right-2 w-9 h-9 flex items-center justify-center backdrop-blur-md rounded-full transition-all duration-300 cursor-pointer border ${
                              isFav
                                ? "bg-blue-800 text-white border-blue-800"
                                : "bg-white/70 text-gray-700 border-white/50 hover:bg-blue-800 hover:text-white"
                            }`}
                          >
                            <Heart
                              size={18}
                              fill={isFav ? "currentColor" : "none"}
                            />
                          </div>
                        </div>

                        <div className="mt-4 px-2 pb-2">
                          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                            {ad.table_name?.replace("_", " ")}
                          </span>
                          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mt-1">
                            {ad.adTitle}
                          </h3>

                          <div className="mt-4 flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full text-blue-800">
                              <MapPin size={16} />
                            </div>
                            <span className="text-xs text-gray-500 font-semibold truncate">
                              {ad.location}
                            </span>
                          </div>

                          <hr className="my-4 border-gray-100" />

                          <h2 className="text-center text-blue-800 font-extrabold text-2xl tracking-tight">
                            Rs {Number(ad.price).toLocaleString()}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Enhanced Empty State */}
            {!loading && searchResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-white p-6 rounded-full shadow-sm border border-gray-100 mb-6">
                  <Search size={48} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  No results found
                </h3>
                <p className="text-gray-500 max-w-xs mt-2">
                  We couldn't find anything matching your search. Try different
                  keywords or check your spelling.
                </p>
              </div>
            )}
          </section>
        ) : (
          /* Enhanced Hero Section */
          <section className="relative overflow-hidden rounded-3xl bg-blue-900 py-24 px-8 text-center shadow-2xl">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-800 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-30"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700/50 rounded-full px-4 py-1.5 mb-6">
                <ShoppingBag size={14} className="text-blue-300" />
                <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">
                  Premium Marketplace
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Discover Your <span className="text-blue-400">Next Big</span>{" "}
                Find.
              </h1>
              <p className="text-blue-100/80 mt-6 text-lg md:text-xl font-medium leading-relaxed">
                Join thousands of buyers and sellers. Find the best deals on
                mobiles, electronics, and daily essentials.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <button className="bg-white text-blue-900 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                  Browse All Categories <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
