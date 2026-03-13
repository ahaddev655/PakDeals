import axios from "axios";
import { Heart, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecentAds() {
  const [favorites, setFavorites] = useState([]);
  const [tabToggle, setTabToggle] = useState("all");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("id");

  // ==================== ADS ====================
  const [ads, setAds] = useState([]);

  const fetchUserAds = () => {
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/ads/all-user-ads/${userId}`)
      .then((response) => {
        const data = response?.data;
        const res = data?.data || {};

        const formatAd = (ad) => ({
          id: ad.id,
          title: ad.adTitle,
          category: ad.subCategory,
          price: ad.price ? Number(ad.price).toLocaleString() : "0",
          location: ad.location || "Location Unknown",
          table_name: ad.table_name || ad.source_table || "undefined",
          createdAt: ad.created_at
            ? ad.created_at.slice(5, 16).replaceAll("-", "/")
            : "",
          img: JSON.parse(ad.images || "[]")[0] || "",
        });

        setAds((res.ads || []).map(formatAd));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ==================== FAVORITES ====================
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteAds")) || [];
    setFavorites(stored);
    fetchUserAds();
  }, []);

  const handleFavorite = (ad) => {
    let updatedFavorites = favorites;

    if (favorites.find((item) => item.id === ad.id)) {
      updatedFavorites = favorites.filter((item) => item.id !== ad.id);
    } else {
      updatedFavorites = [...favorites, ad];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteAds", JSON.stringify(updatedFavorites));
  };

  // ==================== TABS ====================
  const filteredAds = ads.filter((item) => {
    if (tabToggle === "all") return true;

    if (tabToggle === "punjab")
      return item.location.toLowerCase().includes("punjab");

    if (tabToggle === "kpk")
      return item.location.toLowerCase().includes("khyber pakhtunkhwa");

    if (tabToggle === "sindh")
      return item.location.toLowerCase().includes("sindh");

    if (tabToggle === "balochistan")
      return item.location.toLowerCase().includes("balochistan");

    return true;
  });
  return (
    <section className="section">
      <div className="mb-6">
        <h1 className="sm:text-3xl text-2xl underline font-medium text-[#202020]">
          Recently Posted Ads
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 sm:flex items-center sm:space-y-0 space-y-3 sm:mx-0 mx-auto justify-center w-fit bg-white shadow-lg p-2 border border-blue-800 rounded-4xl gap-3">
        <div
          className={`cursor-pointer rounded-full py-2 px-3 text-center sm:mx-0 mx-auto sm:w-auto w-full transition-all duration-300 ${
            tabToggle === "all"
              ? "bg-blue-900 shadow-md shadow-blue-900 text-white"
              : "hover:bg-blue-50"
          }`}
          onClick={() => setTabToggle("all")}
        >
          <h1 className="font-medium">All</h1>
        </div>
        <div
          className={`cursor-pointer rounded-full py-2 px-3 text-center sm:mx-0 mx-auto sm:w-auto w-full transition-all duration-300 ${
            tabToggle === "kpk"
              ? "bg-blue-900 shadow-md shadow-blue-900 text-white"
              : "hover:bg-blue-50"
          }`}
          onClick={() => setTabToggle("kpk")}
        >
          <h1 className="font-medium">Khyber Pakhtunkhwa</h1>
        </div>
        <div
          className={`cursor-pointer rounded-full py-2 px-3 text-center sm:mx-0 mx-auto sm:w-auto w-full transition-all duration-300 ${
            tabToggle === "punjab"
              ? "bg-blue-900 shadow-md shadow-blue-900 text-white"
              : "hover:bg-blue-50"
          }`}
          onClick={() => setTabToggle("punjab")}
        >
          <h1 className="font-medium">Punjab</h1>
        </div>
        <div
          className={`cursor-pointer rounded-full py-2 px-3 text-center sm:mx-0 mx-auto sm:w-auto w-full transition-all duration-300 ${
            tabToggle === "sindh"
              ? "bg-blue-900 shadow-md shadow-blue-900 text-white"
              : "hover:bg-blue-50"
          }`}
          onClick={() => setTabToggle("sindh")}
        >
          <h1 className="font-medium">Sindh</h1>
        </div>
        <div
          className={`cursor-pointer rounded-full py-2 px-3 text-center sm:mx-0 mx-auto sm:w-auto w-full transition-all duration-300 ${
            tabToggle === "balochistan"
              ? "bg-blue-900 shadow-md shadow-blue-900 text-white"
              : "hover:bg-blue-50"
          }`}
          onClick={() => setTabToggle("balochistan")}
        >
          <h1 className="font-medium">Balochistan</h1>
        </div>
      </div>

      {/* Ads */}
      {loading ? (
        <p className="text-center text-sm text-gray-700 py-3">
          Loading your ads...
        </p>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {filteredAds.map((ad) => {
            const isFav = favorites.some((item) => item.id === ad.id);

            return (
              <Link key={ad.id} to={`/ad/${ad.table_name}/${ad.id}`}>
                <div className="border-2 border-blue-800 rounded-lg p-1">
                  <div className="relative">
                    <img src={ad.img} alt="IMG" className="w-full rounded-md" />

                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavorite(ad);
                      }}
                      className={`absolute top-2 right-2 grid place-items-center w-10 h-10 
                      backdrop-blur-md z-10 cursor-pointer rounded-full transition-all duration-300
                      ${
                        isFav
                          ? "bg-blue-900 text-white"
                          : "bg-white/50 text-gray-700 hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-blue-900/50 hover:-translate-y-0.5"
                      }
                    `}
                    >
                      <Heart fill={isFav ? "currentColor" : "none"} />
                    </div>
                  </div>

                  <div className="mt-3 px-2">
                    <h5 className="font-medium text-gray-400">{ad.category}</h5>

                    <h3 className="text-lg font-medium text-gray-700 line-clamp-2">
                      {ad.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="grid place-items-center w-8.75 h-8.75 bg-orange-100/40 rounded-full text-blue-800">
                        <MapPin size={18} />
                      </div>
                      <h1 className="sm:text-sm text-xs text-gray-400 font-medium">
                        {ad.location}
                      </h1>
                    </div>

                    <hr className="my-3 border border-gray-300" />

                    <h2 className="text-center text-blue-800 font-semibold text-2xl">
                      PKR {ad.price}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RecentAds;
