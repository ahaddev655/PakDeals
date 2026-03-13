import { Heart, MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const categoryToTableMap = {
    // -------------------- MOBILE TABLES --------------------
    "Mobile Phones": "mobile_ads",
    Tablets: "mobile_ads",
    Accessories: "mobile_ads",
    // -------------------- MOTORS TABLES --------------------
    Cars: "motors_ads",
    "Car Accessories": "motors_ads",
    "Spare Parts": "motors_ads",
    "Buses, Vans & Trucks": "motors_ads",
    "Rickshaw & Chingchi": "motors_ads",
    "Tractors & Trailers": "motors_ads",
    Boats: "motors_ads",
    "Other Vehicles": "motors_ads",
    // -------------------- PROPERTY SALE TABLES --------------------
    Houses: "property_sale_ads",
    Plots: "property_sale_ads",
    Flats: "property_sale_ads",
    Commercial: "property_sale_ads",
    "Farm Houses": "property_sale_ads",
    Rooms: "property_sale_ads",
    "Other Property": "property_sale_ads",
    // -------------------- PROPERTY RENT TABLES --------------------
    Houses: "property_rent_ads",
    Flats: "property_rent_ads",
    Commercial: "property_rent_ads",
    Rooms: "property_rent_ads",
    "Portions & Floors": "property_rent_ads",
    "Vacation Rentals": "property_rent_ads",
    Other: "property_rent_ads",
    // -------------------- ELECTRONICS TABLES --------------------
    "Computers & Accessories": "electronics_ads",
    "TV - Home Audio & Video": "electronics_ads",
    "Cameras & Accessories": "electronics_ads",
    "Games & Entertainment": "electronics_ads",
    "Other Home Appliances": "electronics_ads",
    "Kitchen Appliances": "electronics_ads",
    "AC & Coolers": "electronics_ads",
    "Washing Machines & Dryers": "electronics_ads",
    "Generators, UPS & Power Solutions": "electronics_ads",
    "Solar Panels & Inverters": "electronics_ads",
    // -------------------- BIKES TABLES --------------------
    Motorcycles: "bikes_ads",
    Scooters: "bikes_ads",
    Bicycles: "bikes_ads",
    "ATV & Quads": "bikes_ads",
    // -------------------- ANIMALS TABLES --------------------
    Birds: "animal_ads",
    Cats: "animal_ads",
    Dogs: "animal_ads",
    "Fishs & Aquariums": "animal_ads",
    Horses: "animal_ads",
    Livestock: "animal_ads",
    // -------------------- FURNITURE TABLES --------------------
    "Sofa & Chairs": "furniture_ads",
    "Beds & Wardrobes": "furniture_ads",
    "Home Decor": "furniture_ads",
    "Table & Dining": "furniture_ads",
    "Office Furniture": "furniture_ads",
    "Other Household Items": "furniture_ads",
    // -------------------- FASHION TABLES --------------------
    Clothes: "fashion_ads",
    Footwear: "fashion_ads",
    Watches: "fashion_ads",
    Jewellery: "fashion_ads",
    Sunglasses: "fashion_ads",
    "Bags & Luggages": "fashion_ads",
    Wedding: "fashion_ads",
    "Skin & Care": "fashion_ads",
    Makeup: "fashion_ads",
    Perfumes: "fashion_ads",
    "Other Fashion": "fashion_ads",
    // -------------------- BOOKS TABLES --------------------
    "Books & Magazines": "books_ads",
    "Musical Instruments": "books_ads",
    "Sports Equipments": "books_ads",
    "Gym & Fitness": "books_ads",
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favoriteAds")) || []);
  }, []);

  const handleFavorite = (ad) => {
    const updatedFavorites = favorites.filter((item) => item.id !== ad.id);

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteAds", JSON.stringify(updatedFavorites));
  };

  const formatLink = (category, id) => {
    const tableName = categoryToTableMap[category] || "all-ads";
    return `/ad/${tableName}/${id}`;
  };

  return (
    <div className="page">
      <div className="flex items-center justify-between gap-5 mb-6">
        <h1 className="text-[32px] font-semibold text-gray-700">
          My Favorites
        </h1>
        <p className="text-[#303030] font-light">
          Lorem ipsum dolor sit amet, consectetur
        </p>
      </div>
      {favorites.length === 0 ? (
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
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {favorites.map((ad) => (
            <Link
              key={ad.id}
              to={formatLink(ad.category, ad.id)}
            >
              <div className="border-2 border-blue-800 rounded-lg p-1">
                <div className="relative">
                  <img src={ad.image} alt="IMG" className="w-full rounded-md" />

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavorite(ad);
                    }}
                    className="absolute top-2 right-2 grid place-items-center w-10 h-10 
                      bg-blue-900 text-white backdrop-blur-md z-10 cursor-pointer rounded-full"
                  >
                    <Heart fill="currentColor" />
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
                    {ad.price}
                  </h2>
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
