import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import addAd_data from "../../data/addAd_data.json";
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
import { useNavigate } from "react-router-dom";

function AdminAdAdsPage() {
  // ====================== AUTH CHECK ======================
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

  // ====================== GLOBAL DROPDOWN ======================
  const [openDropdown, setOpenDropdown] = useState(null);

  // ====================== MAIN CATEGORY ======================
  const [mainCategoryDropdown, setMainCategoryDropdown] =
    useState("Select Category");
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);

  return (
    <div className="sm:px-6 px-2.5 py-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="sm:text-4xl text-3xl font-black! font-montserrat">
          Post Your Ad
        </h1>
        <p className="text-lg mt-1 font-medium text-gray-600">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-xl">
        {/* ====================== MAIN CATEGORY ====================== */}
        <div
          className={`relative ${selectedMainCategory === null ? "" : "mb-6"}`}
        >
          <button
            type="button"
            className={`w-full flex justify-between py-2 px-3 border-2 border-gray-300 rounded-lg focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300 ${
              mainCategoryDropdown === "Select Category"
                ? "text-gray-400"
                : "text-black"
            }`}
            onClick={() =>
              setOpenDropdown(
                openDropdown === "mainCategory" ? null : "mainCategory",
              )
            }
          >
            {mainCategoryDropdown}
            <ChevronDown
              className={`transition-transform ${
                openDropdown === "mainCategory" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`absolute z-10 top-11.75 bg-white shadow-xl origin-top w-full transition-all transform h-70 overflow-auto ${
              openDropdown === "mainCategory"
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            }`}
          >
            {addAd_data.mainCategories.map((item) => (
              <h4
                key={item.id}
                className="p-2 cursor-pointer hover:bg-blue-50"
                onClick={() => {
                  setMainCategoryDropdown(item.text);
                  setSelectedMainCategory(item.id);
                  setOpenDropdown(null);
                }}
              >
                {item.text}
              </h4>
            ))}
          </div>
        </div>

        {/* ====================== CATEGORY FORMS ====================== */}
        {/* -------- MOBILE CATEGORY -------- */}
        {selectedMainCategory === "mobiles" && (
          <MobileCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- MOTORS CATEGORY -------- */}
        {selectedMainCategory === "motors" && (
          <MotorsCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- PROPERTY FOR SALE CATEGORY -------- */}
        {selectedMainCategory === "property-for-sale" && (
          <PropertyForSaleCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- PROPERTY FOR RENT CATEGORY -------- */}
        {selectedMainCategory === "property-for-rent" && (
          <PropertyForRentCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- ELECTRONICS & HOME APPLIANCES CATEGORY -------- */}
        {selectedMainCategory === "electronics-and-home-appliances" && (
          <ElectronicsAndHomeAppliancesCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- BIKE CATEGORY -------- */}
        {selectedMainCategory === "bike" && (
          <BikeCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- ANIMALS CATEGORY -------- */}
        {selectedMainCategory === "animals" && (
          <AnimalCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- FURNITURE & HOME DECOR CATEGORY -------- */}
        {selectedMainCategory === "furniture-and-home" && (
          <FurnitureAndHomeDecorCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- FASHION & BEAUTY CATEGORY -------- */}
        {selectedMainCategory === "fashion-and-beauty" && (
          <FashionAndBeautyCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- BOOKS & SPORTS ITEMS CATEGORY -------- */}
        {selectedMainCategory === "book-and-sports" && (
          <BooksAndSportsCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
        {/* -------- KIDS CATEGORY -------- */}
        {selectedMainCategory === "kids" && (
          <KidsCategory
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            addAd_data={addAd_data}
          />
        )}
      </div>
    </div>
  );
}

export default AdminAdAdsPage;
