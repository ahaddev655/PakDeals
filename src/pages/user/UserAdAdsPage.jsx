import { ChevronDown, ArrowLeft, LayoutGrid, CheckCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import addAd_data from "../../data/addAd_data.json";
import { useNavigate } from "react-router-dom";

// Import your Category Components
import MobileCategory from "../../components/main/categories/MobileCategory";
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

function UserAdAdsPage() {
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken || !userId) {
      const timer = setTimeout(() => navigate("/signup"), 500);
      return () => clearTimeout(timer);
    }
  }, [userToken, userId, navigate]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);

  const categoryMap = {
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

  const SelectedComponent = categoryMap[selectedMainCategory];

  return (
    <div className="min-h-screen bg-[#f8fafc] sm:px-6 px-4 py-10">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-montserrat">
              Post Your Ad
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Fill in the details below to list your item on PakDeals.
            </p>
          </div>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${selectedMainCategory ? "bg-green-500 text-white" : "bg-blue-600 text-white"}`}
              >
                {selectedMainCategory ? <CheckCircle2 size={14} /> : "1"}
              </span>
              <span className="text-xs font-bold text-slate-600">Category</span>
            </div>
            <div className="w-8 h-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${selectedMainCategory ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}
              >
                2
              </span>
              <span
                className={`text-xs font-bold ${selectedMainCategory ? "text-slate-600" : "text-slate-400"}`}
              >
                Details
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {!selectedMainCategory ? (
          /* CATEGORY SELECTION GRID */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {addAd_data.mainCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedMainCategory(item.id)}
                className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                  <LayoutGrid size={28} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-black text-slate-700 group-hover:text-blue-700 tracking-tight">
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        ) : (
          /* ACTIVE FORM CONTAINER */
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedMainCategory(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Change Category
              </button>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Selected:
                </span>
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                  {
                    addAd_data.mainCategories.find(
                      (c) => c.id === selectedMainCategory,
                    )?.text
                  }
                </span>
              </div>
            </div>

            <div className="p-8">
              {SelectedComponent && (
                <SelectedComponent
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  addAd_data={addAd_data}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserAdAdsPage;
