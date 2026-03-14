import React, { useEffect, useState } from "react";
import { MapPin, Search, FilterX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function CategoryPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const normalizedSearch = search.trim().toLowerCase();
  const categoryName = location.pathname.split("/")[2]?.replace(/_/g, " ");

  const fetchAdsByCategory = () => {
    setLoading(true);
    const tableName = location.pathname.split("/")[2];
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/ads/category-ads/${tableName}`,
      )
      .then((res) => {
        setAds(res.data.data || []);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdsByCategory();
  }, [location.pathname]);

  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(normalizedSearch),
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HEADER SECTION --- */}
      <div className="bg-white border-b border-gray-200 mb-8 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:flex items-center justify-between gap-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 capitalize tracking-tight">
              {categoryName}
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Showing {filteredAds.length} listings in this category
            </p>
          </div>

          <div className="relative group sm:w-96 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-800 transition-colors"
              size={20}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 focus:bg-white focus:border-blue-800 focus:ring-4 focus:ring-blue-50 transition-all outline-none"
              placeholder={`Search in ${categoryName}...`}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          /* --- SKELETON LOADING STATE --- */
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-100 animate-pulse border border-gray-100"
              />
            ))}
          </div>
        ) : filteredAds.length > 0 ? (
          /* --- AD GRID --- */
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {filteredAds.map((ad) => (
              <Link
                key={ad.id}
                to={`/ad/${ad.table_name || ad.source_table}/${ad.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-900">
                      {ad.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-2 min-h-14 group-hover:text-blue-900 transition-colors">
                    {ad.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-gray-400">
                    <MapPin size={16} className="text-orange-600" />
                    <span className="text-xs font-bold tracking-tight uppercase">
                      {ad.location}
                    </span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-black uppercase">
                        Price
                      </span>
                      <span className="text-xl font-black text-blue-900">
                        PKR {Number(ad.price).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all">
                      <Search size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FilterX className="text-gray-300" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No ads found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              We couldn't find any listings matching "{search}". Try checking
              your spelling or using different keywords.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-6 text-blue-900 font-black uppercase tracking-widest text-xs hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
