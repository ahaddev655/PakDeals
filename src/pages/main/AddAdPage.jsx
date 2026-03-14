import { ChevronDown, LayoutGrid } from "lucide-react";
import React, { useEffect, useState } from "react";
import addAd_data from "../../data/addAd_data.json";
import { useNavigate } from "react-router-dom";

// Category Imports
import MobileCategory from "./../../components/main/categories/MobileCategory";
import MotorsCategory from "../../components/main/categories/MotorsCategory";
import PropertyForSaleCategory from "../../components/main/categories/PropertyForSaleCategory";
import PropertyForRentCategory from "../../components/main/categories/PropertyForRentCategory";
import ElectronicsAndHomeAppliancesCategory from "../../components/main/categories/ElectronicsAndHomeAppliancesCategory";
import BikeCategory from "../../components/main/categories/BikeCategory";
import AnimalCategory from "../../components/main/categories/AnimalCategory";
import FurnitureAndHomeDecorCategory from "../../components/main/categories/FurnitureAndHomeDecorCategory";
import FashionAndBeautyCategory from "../../components/main/categories/FashionAndBeautyCategory";
import BooksAndSportsCategory from "../../components/main/categories/BooksAndSportsCategory";
import KidsCategory from "../../components/main/categories/KidsCategory";

function AddAdPage() {
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  // ====================== AUTH CHECK ======================
  useEffect(() => {
    if (!userToken || !userId) {
      const timer = setTimeout(() => navigate("/signup"), 500);
      return () => clearTimeout(timer);
    }
  }, [userToken, userId, navigate]);

  // ====================== STATE ======================
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mainCategoryLabel, setMainCategoryLabel] = useState("Select Category");
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);

  // Helper to map IDs to Components
  const categoryComponents = {
    mobiles: MobileCategory,
    motors: MotorsCategory,
    "property-for-sale": PropertyForSaleCategory,
    "property-for-rent": PropertyForRentCategory,
    "electronics-and-home-appliances": ElectronicsAndHomeAppliancesCategory,
    bike: BikeCategory,
    animals: AnimalCategory,
    "furniture-and-home": FurnitureAndHomeDecorCategory,
    "fashion-and-beauty": FashionAndBeautyCategory,
    "book-and-sports": BooksAndSportsCategory,
    kids: KidsCategory,
  };

  const SelectedCategoryForm = selectedMainCategory
    ? categoryComponents[selectedMainCategory]
    : null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          {/* Header Section */}
          <div className="mb-10 text-center md:text-left border-b border-gray-100 pb-8">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-montserrat">
              Post Your Ad
            </h1>
            <p className="text-gray-500 text-lg mt-2 font-medium">
              Choose a category to start reaching thousands of buyers across
              Pakistan.
            </p>
          </div>

          {/* ====================== MAIN CATEGORY SELECTOR ====================== */}
          <div className="max-w-2xl">
            <label className="block text-sm font-bold text-blue-900 uppercase tracking-wider mb-2 ml-1">
              Primary Category
            </label>
            <div className="relative mb-10">
              <button
                type="button"
                className={`w-full flex justify-between items-center py-4 px-5 border-2 rounded-xl transition-all duration-300 group
                  ${
                    openDropdown === "mainCategory"
                      ? "border-blue-800 ring-4 ring-blue-50 bg-white"
                      : "border-gray-100 bg-gray-50 hover:border-gray-300"
                  }
                  ${selectedMainCategory ? "text-slate-900 font-bold" : "text-gray-400 font-medium"}`}
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "mainCategory" ? null : "mainCategory",
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <LayoutGrid
                    size={20}
                    className={
                      selectedMainCategory ? "text-blue-800" : "text-gray-400"
                    }
                  />
                  {mainCategoryLabel}
                </div>
                <ChevronDown
                  className={`transition-transform duration-300 text-gray-400 group-hover:text-blue-800 ${
                    openDropdown === "mainCategory" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {openDropdown === "mainCategory" && (
                <div className="absolute z-50 top-[calc(100%+8px)] left-0 w-full bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-100 overflow-y-auto custom-scrollbar">
                    {addAd_data.mainCategories.map((item) => (
                      <div
                        key={item.id}
                        className="px-5 py-4 cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between group border-b border-gray-50 last:border-0"
                        onClick={() => {
                          setMainCategoryLabel(item.text);
                          setSelectedMainCategory(item.id);
                          setOpenDropdown(null);
                        }}
                      >
                        <span className="font-semibold text-slate-700 group-hover:text-blue-900">
                          {item.text}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ====================== DYNAMIC CATEGORY FORM ====================== */}
          {SelectedCategoryForm ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-8 text-blue-800 font-bold text-sm uppercase tracking-widest bg-blue-50 w-fit px-4 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Listing Details for {mainCategoryLabel}
              </div>
              <SelectedCategoryForm
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                addAd_data={addAd_data}
              />
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="text-gray-300" size={32} />
              </div>
              <p className="text-gray-400 font-medium">
                Select a category above to display the listing form
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddAdPage;
