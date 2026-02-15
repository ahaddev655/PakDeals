import { useState, useEffect, useRef } from "react";
import { ChevronDown, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function AllAdsPage() {
  // ==================== CATEGORY DROPDOWN JS ====================
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const dropdownRef = useRef(null);

  const categories = [
    "All",
    "Cars",
    "Mobiles",
    "Property For Sale",
    "Property For Rent",
    "Electronics & Appliances",
    "Motorcycles",
    "Animals",
    "Furniture & Home Decor",
    "Fashion & Beauty",
    "Books & Sports Items",
    "Kids",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==================== SEARCHBAR JS ====================
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  // ==================== ADS JS ====================
  const ads = [
    {
      id: 1,
      category: "Property for rent",
      title:
        "10-Marla Brand New Lush HOUSE (A++) For SALE CITIHOUSING samundri road Faisalabad.",
      location: "Punjab, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 2,
      category: "Property for sale",
      title:
        "10-Marla Brand New Lush HOUSE (A++) For SALE CITIHOUSING samundri road Faisalabad.",
      location: "Sindh, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 3,
      category: "Mobile",
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

  const formatCategory = (category) =>
    category.toLowerCase().split(" ").join("-");

  const filteredAds = ads.filter((ad) => {
    const matchesCategory = selected === "All" || ad.category === selected;
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page">
      {/* ==================== CATEGORY DROPDOWN & SEARCHBAR ==================== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* -------------------- CATEGORY DROPDOWN -------------------- */}
        <div ref={dropdownRef} className="relative w-full max-w-xs">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md border-2 border-gray-300 hover:border-blue-600 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500 font-semibold transition"
          >
            <span>{selected}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl z-20 max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelected(cat);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium border-b border-gray-100 last:border-b-0 transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* -------------------- SEARCHBAR -------------------- */}
        <div className="max-[520px]:w-full w-[30%]">
          <input
            type="text"
            placeholder="Search an ad..."
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
          focus:border-blue-800 focus:ring-2 focus:ring-blue-800
          transition-colors ease-in-out duration-300"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>
      {/* ==================== ADS ==================== */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-5">
        {filteredAds.map((ad) => {
          const isFav = favorites.some((item) => item.id === ad.id);

          return (
            <Link key={ad.id} to={`/${formatCategory(ad.category)}/${ad.id}`}>
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
    </div>
  );
}

export default AllAdsPage;
