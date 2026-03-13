import { Heart, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecentAds() {
  const [favorites, setFavorites] = useState([]);
  const [tabToggle, setTabToggle] = useState("all");

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

  const ad = [
    {
      id: 1,
      category: "Houses",
      title:
        "10-Marla Brand New Lush HOUSE (A++) For SALE CITIHOUSING samundri road Faisalabad.",
      location: "Punjab, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 2,
      category: "Plots",
      title:
        "10-Marla Brand New Lush HOUSE (A++) For SALE CITIHOUSING samundri road Faisalabad.",
      location: "Sindh, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 3,
      category: "Mobile Phones",
      title:
        "10-Marla Brand New Lush HOUSE (A++) For SALE CITIHOUSING samundri road Faisalabad.",
      location: "Balochistan, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 4,
      category: "Cars",
      title:
        "10-Marla Brand New Lush HOUSE (A++) For SALE CITIHOUSING samundri road Faisalabad.",
      location: "Khyber Pakhtunkhwa, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 5,
      category: "Motorcycles",
      title:
        "10-Marla Brand New Lush HOUSE (A++) For SALE CITIHOUSING samundri road Faisalabad.",
      location: "Khyber Pakhtunkhwa, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteAds")) || [];
    setFavorites(stored);
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

  const filteredAds = ad.filter((item) => {
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

  const formatLink = (category, id) => {
    const tableName = categoryToTableMap[category] || "all-ads";
    return `/ad/${tableName}/${id}`;
  };

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
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {filteredAds.map((ad) => {
          const isFav = favorites.some((item) => item.id === ad.id);

          return (
            <Link key={ad.id} to={formatLink(ad.category, ad.id)}>
              <div className="border-2 border-blue-800 rounded-lg p-1">
                <div className="relative">
                  <img src={ad.image} alt="IMG" className="w-full rounded-md" />

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
                    {ad.price}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default RecentAds;
