import React, { useEffect, useRef, useState, useMemo } from "react";
import { MapPin, CalendarDays, Phone, Check, MoveRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import fields from "../../data/adDetails_data.json";

const EXCLUDED_KEYS = [
  "id",
  "title",
  "amount",
  "type",
  "category",
  "location",
  "postDate",
  "number",
  "images",
  "features",
  "description",
  "name",
  "_tableName",
  "user_id",
  "created_at",
  "isActive",
  "isSold",
  "isExpired",
  "isFeatured",
  "ad_due_at",
  "is_featured_due_at",
  "isPending",
  "table_name",
];

function AdsDetailPage() {
  const [adDetails, setAdDetails] = useState({});
  const [toggleNumber, setToggleNumber] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const CATEGORY_FIELDS = fields;

  const imageRef = useRef(null);
  const sidebarRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 225);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Data
  useEffect(() => {
    const [, , tableName, adId] = pathname.split("/");

    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/ads/fetch-ad-details/${tableName}/${adId}`,
      )
      .then(({ data }) => {
        const ad = data?.ad_details;
        if (!ad) return;

        setAdDetails({
          ...ad,
          _tableName: tableName,
          title: ad.adTitle || "",
          amount: ad.price
            ? `PKR ${Number(ad.price).toLocaleString()}`
            : "PKR 0",
          type: ad.subCategory || "",
          postDate: ad.created_at
            ? ad.created_at.slice(5, 16).replace(/-/g, "/")
            : "",
          number: ad.sellerContact || "",
          images: ad.images ? JSON.parse(ad.images) : [],
          features: ad.features ? JSON.parse(ad.features) : [],
          name: ad.sellerName || "",
        });
      })
      .catch((err) => console.error("Error fetching ad details:", err));
  }, [pathname]);

  const handleImageChange = (index) => {
    if (imageRef.current && adDetails.images?.[index]) {
      imageRef.current.src = adDetails.images[index];
    }
  };

  const formatKey = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  const renderSpecs = () => {
    const configKeys = CATEGORY_FIELDS[adDetails._tableName] || [];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {Object.entries(adDetails)
          .filter(([key, value]) => !EXCLUDED_KEYS.includes(key) && value)
          .map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between gap-3 w-full border-b border-gray-200 pb-1.5"
            >
              <p className="text-gray-500">
                {configKeys.find(
                  (k) =>
                    k.toLowerCase().replace(/\s/g, "") === key.toLowerCase(),
                ) || formatKey(key)}
                :
              </p>
              <p className="font-medium">
                {key === "price"
                  ? `PKR ${Number(value).toLocaleString()}`
                  : value}
              </p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="page p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-5">
        <div className="md:flex justify-between gap-4">
          <h1 className="text-xl md:text-3xl font-semibold">
            {adDetails.title}
          </h1>
          <div className="md:text-right mt-3 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
              {adDetails.amount}
            </h1>
            <p className="text-orange-600 text-sm">{adDetails.type}</p>
          </div>
        </div>
        <div className="flex gap-6 mt-2 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={14} /> {adDetails.location}
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={14} /> {adDetails.postDate}
          </div>
        </div>
      </div>

      <div className="lg:flex gap-5 relative">
        <div className="w-full lg:w-3/4 space-y-6">
          {/* Images */}
          {adDetails.images?.length > 0 && (
            <div className="p-3 bg-white shadow-lg rounded-lg">
              <img
                ref={imageRef}
                src={adDetails.images[0]}
                alt="Main"
                className="h-72 sm:h-96 w-full object-cover rounded-lg"
              />
              <div className="grid grid-cols-4 mt-3 gap-3">
                {adDetails.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Thumb"
                    className="h-20 w-full object-cover rounded-lg cursor-pointer"
                    onClick={() => handleImageChange(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Details */}
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ad Details
            </h2>
            {renderSpecs()}
          </div>

          {/* Features */}
          {adDetails.features?.length > 0 && (
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Features
              </h2>
              <div className="grid md:grid-cols-3 gap-3">
                {adDetails.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-gray-500 text-sm"
                  >
                    <Check
                      size={18}
                      className="text-blue-800"
                      strokeWidth={3}
                    />{" "}
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {adDetails.description && (
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {adDetails.description}
              </p>
            </div>
          )}
        </div>

        {/* ==================== SELLER DETAILS ==================== */}
        <div className="w-full lg:w-1/4">
          <div
            className="p-4 bg-white shadow-lg rounded-lg lg:sticky lg:top-5 lg:mb-10 relative mt-6 lg:mt-0 h-fit"
          >
            {/* -------------------- NAME & DATE -------------------- */}
            <div className="flex justify-between items-start gap-2">
              <h1 className="font-semibold text-lg leading-tight">
                {adDetails.name}
              </h1>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                Posted {adDetails.postDate}
              </span>
            </div>

            {/* -------------------- LOCATION -------------------- */}
            <div className="flex items-center gap-2 mt-4 text-gray-500">
              <MapPin size={16} strokeWidth={2.4} />
              <h6 className="text-sm">{adDetails.location}</h6>
            </div>

            {/* -------------------- NUMBER -------------------- */}
            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <Phone size={16} strokeWidth={2.4} />
              <h6 className="text-sm break-all font-mono">
                {toggleNumber ? adDetails.number : "************"}
              </h6>
            </div>

            <button
              onClick={() => setToggleNumber(!toggleNumber)}
              className="w-full text-center mt-4 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
            >
              {toggleNumber ? "Hide Number" : "Show Number"}
            </button>

            {/* -------------------- WHATSAPP BUTTON -------------------- */}
            {adDetails.number && (
              <Link
                to={`https://wa.me/${adDetails.number.replace(/\D/g, "")}`}
                target="_blank"
              >
                <button className="flex group items-center w-full gap-2 justify-center py-3 bg-blue-900 rounded-md text-white mt-5 hover:bg-blue-800 transition-all font-medium">
                  Let's Chat
                  <MoveRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsDetailPage;
