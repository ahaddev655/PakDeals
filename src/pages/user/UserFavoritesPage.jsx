import { Heart, MapPin, Eye, Trash2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken || !userId) {
      const timer = setTimeout(() => navigate("/signup"), 500);
      return () => clearTimeout(timer);
    }
  }, [userToken, userId, navigate]);

  // ==================== FETCH FAVORITES LOGIC ====================
  useEffect(() => {
    const fetchFavoriteDetails = async () => {
      const saved = JSON.parse(localStorage.getItem("favoriteAds")) || [];

      if (saved.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const promises = saved.map((ad) =>
          axios.get(
            `https://pak-deals-backend.vercel.app/api/ads/fetch-ad-details/${ad.table_name}/${ad.id}`,
          ),
        );

        const results = await Promise.allSettled(promises);

        const fetchedAds = results
          .filter((res) => res.status === "fulfilled")
          .map((res) => {
            const adData = res.value.data.ad_details;
            const imageArray = JSON.parse(adData.images || "[]");

            return {
              id: adData.id,
              table_name: adData.table_name,
              source_table: adData.source_table,
              image: imageArray[0],
              title: adData.adTitle,
              category: adData.subCategory,
              price: Number(adData.price),
              location: adData.location,
            };
          });

        setFavorites(fetchedAds);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteDetails();
  }, []);

  // ==================== HANDLE REMOVE FAVORITE ====================
  const handleFavorite = (ad) => {
    const updatedFavorites = favorites.filter((item) => item.id !== ad.id);
    setFavorites(updatedFavorites);

    const localData = JSON.parse(localStorage.getItem("favoriteAds")) || [];
    const filteredLocal = localData.filter((item) => item.id !== ad.id);
    localStorage.setItem("favoriteAds", JSON.stringify(filteredLocal));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] sm:px-8 px-4 py-8">
      {/* -------------------- HEADING SECTION -------------------- */}
      <div className="mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
            Wishlist
          </span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight font-montserrat">
            My Favorites
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Items you've saved to review or purchase later.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-bold animate-pulse">
              Loading your wishlist...
            </p>
          </div>
        ) : favorites.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  {[
                    "Ad ID",
                    "Item Details",
                    "Category",
                    "Price",
                    "Actions",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {favorites.map((favorite) => (
                  <tr
                    key={favorite.id}
                    className="group hover:bg-slate-50/80 transition-all duration-200"
                  >
                    <td className="py-5 px-6">
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                        #{favorite.id}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div>
                        <div className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          {favorite.title?.length > 40
                            ? favorite.title.slice(0, 40) + "..."
                            : favorite.title}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">
                          <MapPin size={12} className="text-blue-500" />
                          {favorite.location}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {favorite.category}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="text-sm font-black text-slate-900">
                        <span className="text-blue-600 text-[10px] mr-1">
                          Rs
                        </span>
                        {favorite.price?.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedAd(favorite)}
                          className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleFavorite(favorite)}
                          className="p-2.5 bg-white border border-slate-200 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
              <Heart size={40} className="text-slate-200" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 font-medium mt-2 max-w-xs">
              Save items you're interested in to track price drops and updates.
            </p>
            <Link
              to="/"
              className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
            >
              Browse Marketplace
            </Link>
          </div>
        )}

        {/* -------------------- ADS PREVIEW POPUP -------------------- */}
        <div
          className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-500 ${selectedAd ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedAd(null)}
          />
          <div
            className={`relative bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl transition-all duration-500 transform ${selectedAd ? "scale-100 translate-y-0" : "scale-95 translate-y-12"}`}
          >
            {selectedAd && (
              <div className="flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedAd.image}
                    alt="Ad"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-blue-600 tracking-widest shadow-lg">
                    {selectedAd.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight mb-2">
                      {selectedAd.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                      <MapPin size={14} className="text-blue-600" />
                      {selectedAd.location}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 uppercase mb-1">
                        Price Tag
                      </span>
                      <p className="text-xl font-black text-blue-600">
                        <span className="text-xs mr-1">Rs</span>
                        {selectedAd.price?.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 uppercase mb-1">
                        Ad Reference
                      </span>
                      <p className="text-xl font-black text-slate-800">
                        #{selectedAd.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedAd(null)}
                      className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                      Close Preview
                    </button>
                    <Link
                      to={`/ad/${selectedAd.source_table || selectedAd.table_name}/${selectedAd.id}`}
                      className="flex-2"
                    >
                      <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all">
                        View Full Listing
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFavoritesPage;
