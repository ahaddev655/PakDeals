import { Heart, MapPin, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function UserFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken && userId) {
      return;
    }
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  }, []);
  // ==================== TOGGLE FAVORITES ====================
  useEffect(() => {
    const raw = localStorage.getItem("favoriteAds");
    setFavorites(raw ? JSON.parse(raw) : []);
  }, []);

  // ==================== CATEGORY FORMAT ====================
  const formatCategory = (category) =>
    category.toLowerCase().split(" ").join("-");

  // ==================== HANDLE FAVORITES ====================
  const handleFavorite = (ad) => {
    const updatedFavorites = favorites.some((item) => item.id === ad.id)
      ? favorites.filter((item) => item.id !== ad.id)
      : [...favorites, ad];

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteAds", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="sm:px-6 px-2.5 py-6">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-center justify-between gap-5 py-4 px-7">
          <h1 className="text-[32px] font-semibold text-gray-700">
            My Favorites
          </h1>
          <p className="text-[#303030] font-light">
            Lorem ipsum dolor sit amet, consectetur
          </p>
        </div>
        {favorites.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  {["ID", "Title", "Category", "Price", "Action"].map(
                    (h, i) => (
                      <th
                        key={i}
                        className={`font-semibold text-[#495057] py-3 px-6 ${
                          i < 3 ? "text-start" : "text-center"
                        }`}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite, i, arr) => {
                  const isFav = favorites.some(
                    (item) => item.id === favorite.id,
                  );
                  return (
                    <tr
                      key={favorite.id}
                      className={`border-b hover:bg-gray-100 transition-colors ease-in-out duration-200 ${
                        i === arr.length - 1
                          ? "border-transparent"
                          : "border-gray-300"
                      }`}
                    >
                      <td className="py-4 px-6 text-[15px] text-gray-700 font-semibold">
                        #{favorite.id}
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700">
                        <div className="font-medium text-gray-700">
                          {favorite.title.slice(0, 35) + "..."}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <MapPin size={14} />
                          {favorite.location}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700">
                        {favorite.category}
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 text-center">
                        {favorite.price}
                      </td>

                      <td className="py-4 px-6 flex items-center justify-center gap-4">
                        <div
                          className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-blue-800 transition-all duration-300 ease-in-out cursor-pointer"
                          onClick={() => setSelectedAd(favorite)}
                        >
                          <Eye strokeWidth={1.9} size={18} />
                        </div>
                        <div
                          onClick={() => handleFavorite(favorite)}
                          className={`grid place-items-center hover:shadow-md w-10 h-10 rounded-md transition-all duration-300 ease-in-out cursor-pointer ${
                            isFav
                              ? "text-red-600 hover:text-red-800"
                              : "text-gray-600 hover:text-red-700"
                          }`}
                        >
                          <Heart
                            strokeWidth={1.9}
                            size={18}
                            fill={isFav ? "currentColor" : "none"}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[65vh]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-500">
                No favorites
              </h2>
              <p className="text-gray-400 mt-2">
                You haven't added any ads to favorites yet.
              </p>
            </div>
          </div>
        )}

        {/* -------------------- ADS POPUP -------------------- */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${
            selectedAd ? "opacity-100 z-50" : "opacity-0 -z-10"
          }`}
          onClick={() => setSelectedAd(null)}
        >
          <div
            className={`bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl p-6 md:p-8 transform transition-all duration-300 ${
              selectedAd
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-6"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedAd && (
              <div className="space-y-5">
                {/* -------------------- AD IMAGE -------------------- */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200 shadow-lg group">
                  <img
                    src={selectedAd.image}
                    alt="IMG"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* -------------------- DETAILS -------------------- */}
                <div className="space-y-4">
                  {/* TITLE */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Title
                    </h5>
                    <p className="text-xl font-bold text-gray-800 mt-1 leading-snug">
                      {selectedAd.title}
                    </p>
                  </div>

                  {/* CATEGORY */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </h5>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                      {selectedAd.category}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </h5>
                    <p className="text-3xl font-extrabold text-green-600 mt-1">
                      {selectedAd.price}
                    </p>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Location
                    </h5>
                    <div className="flex items-center gap-2 mt-1 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                      <MapPin size={16} className="text-blue-600" />
                      <p className="text-sm font-medium text-gray-700">
                        {selectedAd.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* -------------------- BUTTONS -------------------- */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 active:scale-[0.98] transition-all duration-200 text-white font-semibold rounded-xl shadow-md hover:shadow-lg"
                    onClick={() => setSelectedAd(null)}
                  >
                    Cancel
                  </button>

                  <Link
                    to={`/ad/${formatCategory(selectedAd.category)}/${selectedAd.id}`}
                    className="flex-1"
                  >
                    <button
                      type="button"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 text-white font-semibold rounded-xl shadow-md hover:shadow-lg"
                    >
                      View Details
                    </button>
                  </Link>
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
