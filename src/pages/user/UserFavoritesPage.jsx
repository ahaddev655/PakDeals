import { Heart, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function UserFavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // ==================== AUTH CHECK ====================
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (userToken && userId) {
  //       return;
  //     }
  //     setTimeout(() => {
  //       navigate("/signup");
  //     }, 500);
  //   }, []);
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
      {favorites.length > 0 ? (
        favorites.map((favorite) => {
          const isFav = favorites.some((item) => item.id === favorite.id);
          return (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
              <Link
                key={favorite.id}
                to={`/${formatCategory(favorite.category)}/${favorite.id}`}
              >
                <div className="border-2 border-blue-800 rounded-lg p-1">
                  <div className="relative">
                    <img
                      src={favorite.image}
                      alt="IMG"
                      className="w-full rounded-md"
                    />

                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavorite(favorite);
                      }}
                      className={`absolute top-2 right-2 grid place-items-center w-10 h-10 backdrop-blur-md z-10 cursor-pointer rounded-full transition-all duration-300 ${
                        isFav
                          ? "bg-blue-900 text-white"
                          : "bg-white/50 text-gray-700 hover:bg-blue-900 hover:text-white"
                      }`}
                    >
                      <Heart fill={isFav ? "currentColor" : "none"} />
                    </div>
                  </div>

                  <div className="mt-3 px-2">
                    <h5 className="font-medium text-gray-400">
                      {favorite.category}
                    </h5>

                    <h3 className="text-lg font-medium text-gray-700 line-clamp-2">
                      {favorite.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="grid place-items-center w-8.75 h-8.75 bg-orange-100/40 rounded-full text-blue-800">
                        <MapPin size={18} />
                      </div>
                      <h1 className="sm:text-sm text-xs text-gray-400 font-medium">
                        {favorite.location}
                      </h1>
                    </div>

                    <hr className="my-3 border border-gray-300" />

                    <h2 className="text-center text-blue-800 font-semibold text-2xl">
                      {favorite.price}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
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
    </div>
  );
}

export default UserFavoritesPage;
