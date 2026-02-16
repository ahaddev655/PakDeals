import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function CategoryPage() {
  const ads = [
    {
      id: 1,
      category: "Property For Rent",
      title: "10-Marla Brand New House For Rent",
      location: "Punjab, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 2,
      category: "Property For Sale",
      title: "10-Marla Brand New House For Sale",
      location: "Sindh, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 3,
      category: "Mobiles",
      title: "iPhone 13 Pro Max PTA Approved",
      location: "Balochistan, Pakistan",
      price: "PKR 250,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 4,
      category: "Cars",
      title: "Toyota Corolla 2020",
      location: "KPK, Pakistan",
      price: "PKR 3,000,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 5,
      category: "Motorcycles",
      title: "Honda 125 2022 Model",
      location: "KPK, Pakistan",
      price: "PKR 180,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 6,
      category: "Electronics & Appliances",
      title: "LED TV 42 Inch",
      location: "Punjab, Pakistan",
      price: "PKR 45,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 7,
      category: "Animals",
      title: "Healthy Persian Cat",
      location: "Sindh, Pakistan",
      price: "PKR 30,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 8,
      category: "Furniture & Home Decor",
      title: "Wooden Sofa Set 7 Seater",
      location: "Punjab, Pakistan",
      price: "PKR 85,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 9,
      category: "Fashion & Beauty",
      title: "Branded Ladies Handbag",
      location: "Sindh, Pakistan",
      price: "PKR 8,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 10,
      category: "Books & Sports Items",
      title: "Cricket Kit Full Set",
      location: "Punjab, Pakistan",
      price: "PKR 12,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
    {
      id: 11,
      category: "Kids",
      title: "Kids Bicycle",
      location: "Punjab, Pakistan",
      price: "PKR 10,000",
      image: "/assets/k5lf638szuebxt02cpab.jpg",
    },
  ];

  const [search, setSearch] = useState("");
  const location = useLocation();

  const normalizedSearch = search.trim().toLowerCase();
  const currentCategorySlug = location.pathname.split("/category/")[1];

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(normalizedSearch);
    const adCategorySlug = ad.category
      .toLowerCase()
      .replace(/ & /g, "-and-")
      .replace(/\s+/g, "-");

    const matchesCategory =
      !currentCategorySlug || adCategorySlug === currentCategorySlug;

    return matchesSearch && matchesCategory;
  });

  const formatLink = (adTable, id) => `/ad/${adTable}/${id}`;

  const formatCategory = (category) =>
    category.toLowerCase().split(" ").join("-");

  return (
    <div className="page">
      <div className="flex items-center justify-between gap-3.5 mb-6">
        <h1 className="text-[32px] font-semibold text-gray-700 capitalize">
          {currentCategorySlug
            ? currentCategorySlug.split("-and-").join(" & ").replace("-", " ")
            : "All Categories"}
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-75 border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
          focus:border-blue-800 focus:ring-2 focus:ring-blue-800
          transition-colors ease-in-out duration-300"
          placeholder="Search..."
        />
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {filteredAds.map((ad) => (
          <Link key={ad.id} to={formatLink(formatCategory(ad.category), ad.id)}>
            <div className="border-2 border-blue-800 rounded-lg p-1">
              <img src={ad.image} alt="Ad" className="w-full rounded-md" />

              <div className="mt-3 px-2">
                <h5 className="font-medium text-gray-400">{ad.category}</h5>

                <h3 className="text-lg font-medium text-gray-700 line-clamp-2">
                  {ad.title}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <div className="grid place-items-center w-8.75 h-8.75 bg-orange-100/40 rounded-full text-blue-800">
                    <MapPin size={18} />
                  </div>
                  <span className="sm:text-sm text-xs text-gray-400 font-medium">
                    {ad.location}
                  </span>
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
    </div>
  );
}

export default CategoryPage;
