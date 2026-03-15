import axios from "axios";
import { Heart, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecentAds() {
  const [favorites, setFavorites] = useState([]);
  const [tabToggle, setTabToggle] = useState("all");
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);

  const fetchUserAds = () => {
    setLoading(true);
    axios
      .get("https://pak-deals-backend.vercel.app/api/ads/all-user-ads")
      .then((response) => {
        const res = response?.data?.data || {};
        const formatAd = (ad) => ({
          id: ad.id,
          title: ad.adTitle,
          category: ad.subCategory,
          price: ad.price ? Number(ad.price).toLocaleString() : "0",
          location: ad.location || "Location Unknown",
          table_name: ad.table_name || ad.source_table || "undefined",
          createdAt: ad.created_at?.slice(5, 16).replaceAll("-", "/") || "",
          img: JSON.parse(ad.images || "[]")[0] || "",
        });
        const formattedAds = (res.ads || []).map(formatAd);
        setAds(
          formattedAds
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 8),
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favoriteAds")) || []);
    fetchUserAds();
  }, []);

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

  const filteredAds = ads.filter((item) => {
    if (tabToggle === "all") return true;
    const loc = item.location.toLowerCase();
    if (tabToggle === "kpk") return loc.includes("khyber pakhtunkhwa");
    return loc.includes(tabToggle);
  });

  return (
    <section className="section py-8">
      <div className="mb-8">
        <h1 className="sm:text-3xl text-2xl font-bold text-[#202020] relative inline-block">
          Recently Posted Ads
          <span className="absolute bottom-0 left-0 w-full h-0.75 bg-blue-800 rounded-full"></span>
        </h1>
      </div>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 bg-white shadow-md p-2 border border-gray-200 rounded-4xl w-fit mx-auto sm:mx-0">
        {[
          { id: "all", label: "All" },
          { id: "kpk", label: "Khyber Pakhtunkhwa" },
          { id: "punjab", label: "Punjab" },
          { id: "sindh", label: "Sindh" },
          { id: "balochistan", label: "Balochistan" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTabToggle(tab.id)}
            className={`rounded-full py-2 px-5 font-semibold transition-all duration-300 text-sm sm:w-auto w-full ${
              tabToggle === tab.id
                ? "bg-blue-800 text-white shadow-lg shadow-blue-200"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center py-10 font-medium text-gray-500">
          Loading your ads...
        </p>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredAds.map((ad) => {
            const isFav = favorites.some(
              (item) => item.id === ad.id && item.table_name === ad.table_name,
            );
            return (
              <Link
                key={ad.id}
                to={`/ad/${ad.table_name}/${ad.id}`}
                className="group"
              >
                <div className="border-2 border-blue-800 rounded-2xl p-2 bg-white hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={ad.img}
                      alt="Ad"
                      className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavorite(ad);
                      }}
                      className={`absolute top-2 right-2 w-9 h-9 flex items-center justify-center backdrop-blur-md rounded-full transition-all duration-300 cursor-pointer border ${
                        isFav
                          ? "bg-blue-800 text-white border-blue-800"
                          : "bg-white/70 text-gray-700 border-white/50 hover:bg-blue-800 hover:text-white"
                      }`}
                    >
                      <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                    </div>
                  </div>

                  <div className="mt-4 px-2 pb-2">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      {ad.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mt-1">
                      {ad.title}
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
                      Rs {ad.price}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && filteredAds.length === 0 && (
        <div className="text-center py-16 text-gray-400 font-medium">
          No recent ads found in this location.
        </div>
      )}
    </section>
  );
}

export default RecentAds;
