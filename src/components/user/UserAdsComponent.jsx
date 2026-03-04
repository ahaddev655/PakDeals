import { Eye, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function UserAdsComponent() {
  // ==================== USESTATES ====================
  const [selectedNavTab, setSelectedNavTab] = useState("all-ads");
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [sortDropdownToggle, setSortDropdownToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const userId = localStorage.getItem("userId");

  // ==================== ARRAYS ====================
  const tabs = [
    { key: "all-ads", label: "All Ads" },
    { key: "featured", label: "Featured" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
    { key: "pending", label: "Pending " },
    { key: "sold", label: "Sold" },
    { key: "expired", label: "Expired" },
  ];
  const sortTabs = [
    { key: "by-year", label: "Sort By Year" },
    { key: "by-name", label: "Sort By Name" },
  ];

  const statusStyles = {
    featured: "text-yellow-600 bg-yellow-100",
    active: "bg-green-100 text-green-600",
    inactive: "bg-red-100 text-red-600",
    pending: "bg-red-100 text-red-600",
    sold: "bg-gray-100 text-gray-600",
    expired: "bg-red-100 text-red-600",
  };

  // ==================== COMPREHENSIVE CATEGORY TO TABLE MAPPING ====================
  const categoryToTableMap = {
    // Mobile Subcategories
    "Mobile Phones": "mobile_ads",
    Tablets: "mobile_ads",
    Accessories: "mobile_ads",

    // Motors Subcategories
    Cars: "motors_ads",
    "Car Accessories": "motors_ads",
    "Spare Parts": "motors_ads",
    "Buses, Vans & Trucks": "motors_ads",
    "Rickshaw & Chingchi": "motors_ads",
    "Tractors & Trailers": "motors_ads",
    Boats: "motors_ads",
    "Other Vehicles": "motors_ads",

    // Property for Sale Subcategories
    Houses: "property_sale_ads",
    Plots: "property_sale_ads",
    Flats: "property_sale_ads",
    Commercial: "property_sale_ads",
    "Farm Houses": "property_sale_ads",
    Rooms: "property_sale_ads",
    "Other Property": "property_sale_ads",

    // Property for Rent Subcategories
    Houses: "property_rent_ads",
    Flats: "property_rent_ads",
    Commercial: "property_rent_ads",
    Rooms: "property_rent_ads",
    "Portions & Floors": "property_rent_ads",
    "Vacation Rentals": "property_rent_ads",

    // Electronics & Home Appliances Subcategories
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

    // Bike Subcategories
    Motorcycles: "bikes_ads",
    Scooters: "bikes_ads",
    "Spare Parts": "bikes_ads",
    Bicycles: "bikes_ads",
    "ATV & Quads": "bikes_ads",

    // Animals Subcategories
    Birds: "animal_ads",
    Cats: "animal_ads",
    Dogs: "animal_ads",
    "Fishs & Aquariums": "animal_ads",
    Horses: "animal_ads",
    Livestock: "animal_ads",

    // Furniture & Home Decor Subcategories
    "Sofa & Chairs": "furniture_ads",
    "Beds & Wardrobes": "furniture_ads",
    "Home Decor": "furniture_ads",
    "Table & Dining": "furniture_ads",
    "Office Furniture": "furniture_ads",
    "Other Household Items": "furniture_ads",

    // Fashion & Beauty Subcategories
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

    // Books & Sports Subcategories
    "Books & Magazines": "books_ads",
    "Musical Instruments": "books_ads",
    "Sports Equipments": "books_ads",
    "Gym & Fitness": "books_ads",

    // Kids Subcategories
    "Kids Furniture": "kids_ads",
    "Toys & Games": "kids_ads",
    "Prams & Walkers": "kids_ads",
    "Swings & Bouncers": "kids_ads",
    "Car Seats": "kids_ads",
    "Kids Bikes & Scooters": "kids_ads",
    "Kids Accessories": "kids_ads",
    "Kids Clothing": "kids_ads",
    "Other Kids Items": "kids_ads",
  };

  // ==================== REMOVE AD FUNCTION ====================
  const removeAd = (id, category) => {
    const formattedId = Number(id);

    const tableName = categoryToTableMap[category];

    if (!tableName) {
      toast.error(`Invalid category: ${category}. Cannot delete ad.`);
      console.error("No table mapping found for category:", category);
      return;
    }

    const loadingToast = toast.loading("Deleting ad...");

    const url = `https://pak-deals-backend.vercel.app/api/ads/delete-user-ad/${formattedId}/${tableName}`;

    axios
      .delete(url)
      .then((response) => {
        toast.update(loadingToast, {
          render: response?.data?.message || "Ad deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));

        if (selectedAd?.id === id) {
          setSelectedAd(null);
        }
      })
      .catch((error) => {
        // Update the loading toast to error
        toast.update(loadingToast, {
          render: error?.response?.data?.error || "Internal Server Error",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
      });
  };

  // ==================== API CONFIGURATION ====================
  const fetchUserAds = () => {
    setLoading(true);

    axios
      .get(`https://pak-deals-backend.vercel.app/api/ads/all-user-ads/${userId}`)
      .then((response) => {
        const allAdsObj = response?.data?.all_ads || {};

        const mergedAds = Object.values(allAdsObj).flat();

        const formattedAds = mergedAds.map((ad) => {
          let status = "";

          if (ad.isSold) {
            status = "sold";
          } else if (ad.isExpired) {
            status = "expired";
          } else if (ad.isFeatured) {
            status = "featured";
          } else if (ad.isActive) {
            status = "active";
          } else if (ad.isPending) {
            status = "pending";
          } else {
            status = "inactive";
          }

          return {
            id: ad.id,
            title: ad.adTitle,
            category: ad.subCategory,
            price: ad.price,
            createdAt: ad.created_at.slice(5, 16).replaceAll(" ", "/"),
            status: status,
            img: JSON.parse(ad.images || "[]")[0] || "",
            isActive: ad.isActive,
            isExpired: ad.isExpired,
            isFeatured: ad.isFeatured,
            isSold: ad.isSold,
          };
        });

        setAds(formattedAds);
        toast.success(response?.data?.message || "Ads Fetched Successfully");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUserAds();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <ToastContainer position="top-right" autoClose={1500} theme="light" />
      {/* ==================== ADS HEADER ==================== */}
      <div className="p-6 lg:flex md:justify-between md:space-y-0 space-y-5 items-center">
        {/* -------------------- SEARCHBAR -------------------- */}
        <div className="relative">
          <Search className="absolute text-[#7f7f7f] top-2 left-2" />
          <input
            type="text"
            placeholder="Search Ad"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-200 rounded-md p-2 text-[15px] w-53 pl-10"
          />
        </div>
        {/* -------------------- SORT DROPDOWN -------------------- */}
        <div className="relative sm:mt-0 mt-4">
          <button
            type="button"
            onClick={() => setSortDropdownToggle(!sortDropdownToggle)}
            className="py-2 px-4 border border-gray-200 focus:border-blue-700 rounded-md w-35.25"
          >
            {sortTabs.find((s) => s.key === selectedSort)?.label || "Sort"}
          </button>
          <div
            className={`absolute top-full mt-2 left-0 w-40 bg-white shadow-lg border border-gray-200 p-1 rounded-md transition-all duration-300 origin-top transform ${
              sortDropdownToggle
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            }`}
          >
            {sortTabs.map((sort, i) => (
              <div
                key={i}
                className="cursor-pointer p-2 hover:bg-blue-50 rounded-md hover:text-blue-700"
                onClick={() => {
                  setSelectedSort(sort.key);
                  setSortDropdownToggle(false);
                }}
              >
                {sort.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ==================== NAVIGATION TABS ==================== */}
      <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-1 px-6 md:w-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedNavTab(tab.key)}
            className={`font-medium py-2 px-4 rounded-md transition-colors duration-300 ${
              selectedNavTab === tab.key
                ? "border-b-2 border-blue-500 text-blue-700"
                : "hover:bg-blue-50 text-gray-500 hover:text-blue-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <hr className="border-b border-gray-200 my-4" />

      {/* ==================== ADS CONTAINER ==================== */}
      <div className="bg-white">
        {/* -------------------- LOADER -------------------- */}
        {loading ? (
          <p className="text-center text-sm text-gray-700 py-3">
            Loading your ads...
          </p>
        ) : ads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200 border-b border-gray-300">
                <tr>
                  {[
                    "Title",
                    "Category",
                    "Status",
                    "Price",
                    "Date",
                    "Action",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`font-semibold text-[#495057] py-3 px-6 ${i < 2 ? "text-start" : "text-center"} ${h === "Category" ? "hidden md:table-cell" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ads
                  .filter((ad) => {
                    const matchesSearch = ad.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());

                    return (
                      (selectedNavTab === "all-ads" ||
                        ad.status === selectedNavTab) &&
                      matchesSearch
                    );
                  })
                  .sort((a, b) => {
                    if (selectedSort === "by-name") {
                      return a.title.localeCompare(b.title);
                    }
                    if (selectedSort === "by-year") {
                      return (
                        new Date(a.createdAt).getFullYear() -
                        new Date(b.createdAt).getFullYear()
                      );
                    }
                    return 0;
                  })
                  .map((ad, i, arr) => (
                    <tr
                      key={ad.id}
                      className={`border-b hover:bg-gray-100 transition-colors ease-in-out duration-200 ${i === arr.length - 1 ? "border-transparent" : "border-gray-300"}`}
                    >
                      <td className="py-4 px-6 text-[15px] text-gray-700">
                        <span className="hidden md:inline">{ad.title}</span>
                        <span className="md:hidden">
                          {ad.title.slice(0, 7) + "..."}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 hidden md:table-cell">
                        {ad.category}
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span
                          className={`text-xs capitalize font-medium px-3 py-1 rounded-full ${statusStyles[ad.status]}`}
                        >
                          {ad.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 text-center">
                        PKR {Number(ad.price).toLocaleString()}
                      </td>

                      <td className="py-4 px-6 text-[15px] text-gray-700 text-center">
                        {ad.createdAt.replaceAll("-", "/")}
                      </td>

                      <td className="py-4 px-6 flex items-center justify-center gap-4">
                        <div
                          className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-blue-800 transition-all duration-300 ease-in-out cursor-pointer"
                          onClick={() => setSelectedAd(ad)}
                        >
                          <Eye strokeWidth={1.9} size={18} />
                        </div>
                        <div
                          className="grid place-items-center hover:shadow-md w-10 h-10 rounded-md hover:text-red-800 transition-all duration-300 ease-in-out cursor-pointer"
                          onClick={() => removeAd(ad.id, ad.category)}
                        >
                          <Trash2 strokeWidth={1.9} size={18} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-sm text-gray-700 py-3">
            No ads available
          </p>
        )}
        {/* -------------------- ADS TABLE -------------------- */}

        {/* -------------------- ADS POPUP -------------------- */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 ${
            selectedAd ? "opacity-100 z-50" : "opacity-0 -z-10"
          }`}
          onClick={() => setSelectedAd(null)}
        >
          <div
            className={`bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-2xl p-6 transition-all duration-300 ${
              selectedAd
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-6 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedAd && (
              <div className="space-y-4">
                {/* IMAGE */}
                <div className="w-full h-56 rounded-xl overflow-hidden border border-gray-200 shadow-md">
                  <img
                    src={selectedAd.img}
                    alt="IMG"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* DETAILS */}
                <div className="space-y-3">
                  {[
                    ["Title", selectedAd.title],
                    ["Category", selectedAd.category],
                    [
                      "Price",
                      `PKR ${Number(selectedAd.price).toLocaleString()}`,
                    ],
                    ["Status", selectedAd.status],
                    ["Created On", selectedAd.createdAt.replaceAll("-", "/")],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between items-center">
                      <h5 className="text-sm font-semibold text-gray-500 uppercase">
                        {label}
                      </h5>
                      <p className="text-sm font-semibold text-blue-700 text-right">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
                    onClick={() => setSelectedAd(null)}
                  >
                    Cancel
                  </button>

                  {(selectedAd.status === "active" ||
                    selectedAd.status === "featured") && (
                    <button
                      type="button"
                      className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
                      onClick={() => {
                        // Update local state
                        setAds((prev) =>
                          prev.map((ad) =>
                            ad.id === selectedAd.id
                              ? { ...ad, status: "inactive" }
                              : ad,
                          ),
                        );
                        setSelectedAd((prev) => ({
                          ...prev,
                          status: "inactive",
                        }));

                        // Here you would also call an API to update the status in the database
                        // updateAdStatus(selectedAd.id, selectedAd.category, "inactive");

                        setSelectedAd(null);
                      }}
                    >
                      Inactive
                    </button>
                  )}

                  {(selectedAd.status === "pending" ||
                    selectedAd.status === "inactive") && (
                    <button
                      type="button"
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md"
                      onClick={() => {
                        // Update local state
                        setAds((prev) =>
                          prev.map((ad) =>
                            ad.id === selectedAd.id
                              ? { ...ad, status: "active" }
                              : ad,
                          ),
                        );
                        setSelectedAd((prev) => ({
                          ...prev,
                          status: "active",
                        }));

                        // Here you would also call an API to update the status in the database
                        // updateAdStatus(selectedAd.id, selectedAd.category, "active");

                        setSelectedAd(null);
                      }}
                    >
                      Active
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdsComponent;
