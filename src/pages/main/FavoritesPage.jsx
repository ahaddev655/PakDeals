import { Heart, MapPin, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favoriteAds")) || [];
    setFavorites([]);

    saved.forEach((ad) => {
      axios
        .get(
          `https://pak-deals-backend.vercel.app/api/ads/fetch-ad-details/${ad.table_name}/${ad.id}`,
        )
        .then((response) => {
          const adData = response.data.ad_details;
          const imageArray = JSON.parse(adData.images);
          const displayImage = imageArray[0];

          const formattedAd = {
            id: adData.id,
            table_name: adData.table_name,
            source_table: adData.source_table,
            image: displayImage,
            title: adData.adTitle,
            category: adData.subCategory,
            price: Number(adData.price).toLocaleString(),
            location: adData.location,
          };

          console.log(formattedAd);

          setFavorites((prevFavorites) => [...prevFavorites, formattedAd]);
        })
        .catch((error) => {
          console.log("Error fetching ad:", error);
        });
    });
  }, []);

  const handleFavorite = (ad) => {
    // Filter by ID to remove
    const updatedFavorites = favorites.filter((item) => item.id !== ad.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteAds", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="page py-12 min-h-[80vh]">
      {/* -------------------- HEADER -------------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-4xl font-black text-blue-900 tracking-tighter">
            My Favorites<span className="text-blue-400">.</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Manage the items you've saved for later.
          </p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-full">
          <p className="text-blue-800 font-bold text-sm">
            {favorites.length} {favorites.length === 1 ? "Item" : "Items"} Saved
          </p>
        </div>
      </div>

      {/* -------------------- CONTENT -------------------- */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
            <Heart size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">
            Looks like you haven't found any deals to save yet. Start exploring
            our marketplace!
          </p>
          <Link to="/">
            <button className="mt-8 bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center gap-2 mx-auto">
              <ShoppingBag size={18} />
              Browse Ads
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {favorites.map((ad) => (
            <Link
              key={ad.id}
              to={`/ad/${ad.table_name || ad.source_table || "_tableName"}/${ad.id}`}
              className="group"
            >
              <div className="bg-white border-2 border-blue-800/10 rounded-2xl p-2 hover:border-blue-800 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl aspect-4/3">
                  <img
                    src={ad.image || ad.images || ad.img}
                    alt={ad.title || ad.adTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Un-favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleFavorite(ad);
                    }}
                    className="absolute top-3 right-3 grid place-items-center w-9 h-9 
                      bg-white text-red-500 shadow-xl z-10 cursor-pointer rounded-full hover:bg-red-50 hover:scale-110 transition-all"
                  >
                    <Heart fill="currentColor" size={20} />
                  </button>
                </div>

                {/* Info Container */}
                <div className="mt-4 px-2 pb-2 grow flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest font-black text-blue-500 bg-blue-50 px-2 py-1 rounded w-fit mb-2">
                    {ad.category || ad.subCategory || "General"}
                  </span>

                  <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-900 transition-colors">
                    {ad.title || ad.adTitle}
                  </h3>

                  <div className="mt-auto">
                    <div className="mt-4 flex items-center gap-2 text-gray-500">
                      <MapPin size={16} className="text-blue-800" />
                      <span className="text-xs font-semibold truncate">
                        {ad.location || "Pakistan"}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <h2 className="text-blue-900 font-black text-xl">
                        <span className="text-sm font-medium mr-1 text-blue-400">
                          Rs
                        </span>
                        {ad.price ? ad.price : "0"}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
