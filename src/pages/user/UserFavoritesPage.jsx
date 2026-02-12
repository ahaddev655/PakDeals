import { Heart, MapPin, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function UserFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
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
                      <td className="py-4 px-6 text-[15px] text-gray-700">
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
                You haven’t added any ads to favorites yet.
              </p>
            </div>
          </div>
        )}

        {/* -------------------- ADS POPUP -------------------- */}
        <div
          className={`fixed top-0 left-0 bg-black/50 backdrop-blur-md w-full h-full flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            selectedAd ? "opacity-100 z-10" : "opacity-0 -z-10"
          }`}
          onClick={() => setSelectedAd(null)}
        >
          <div
            className={`bg-white w-md rounded-lg border border-gray-400 shadow-lg py-4 px-6 transition-all duration-300 ease-in-out ${
              selectedAd
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedAd && (
              <div>
                {/* -------------------- AD IMAGE -------------------- */}
                <div className="w-full h-50 rounded-lg">
                  <img
                    src={selectedAd.image}
                    alt="IMG"
                    className="w-full h-full rounded-lg"
                  />
                </div>
                <div className="mt-3 space-y-3">
                  {/* -------------------- TITLE -------------------- */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <h5 className="text-lg font-medium">Title:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.title}
                    </h5>
                  </div>
                  {/* -------------------- CATEGORY -------------------- */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <h5 className="text-lg font-medium">Category:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.category}
                    </h5>
                  </div>
                  {/* -------------------- PRICE -------------------- */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <h5 className="text-lg font-medium">Price:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.price}
                    </h5>
                  </div>
                  {/* -------------------- LOCATION -------------------- */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <h5 className="text-lg font-medium">Location:</h5>
                    <h5 className="text-lg font-medium text-blue-700">
                      {selectedAd.location}
                    </h5>
                  </div>
                </div>
                {/* -------------------- BUTTONS -------------------- */}
                <div className="flex items-center gap-6 mt-3">
                  <button
                    type="button"
                    className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 transition-colors ease-in-out duration-300 text-white rounded-sm"
                    onClick={() => setSelectedAd(null)}
                  >
                    Cancel
                  </button>

                  <Link
                    to={`/${formatCategory(selectedAd.category)}/${selectedAd.id}`}
                    className="w-full"
                  >
                    <button
                      type="button"
                      className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out duration-300 text-white rounded-sm"
                    >
                      View
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
