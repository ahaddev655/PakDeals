import React, { useEffect, useRef, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Phone,
  Check,
  MoveRight,
  MessageCircle,
  Share2,
  ShieldCheck,
} from "lucide-react";
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
  const [activeImg, setActiveImg] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const [, , tableName, adId] = pathname.split("/");
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/ads/fetch-ad-details/${tableName}/${adId}`,
      )
      .then(({ data }) => {
        const ad = data?.ad_details;
        if (!ad) return;

        let parsedFeatures = [];
        if (ad.features) {
          try {
            parsedFeatures = JSON.parse(ad.features);
          } catch (e) {
            parsedFeatures = ad.features.split(",").map((f) => f.trim());
          }
        }

        setAdDetails({
          ...ad,
          _tableName: tableName,
          title: ad.adTitle || "",
          amount: ad.price
            ? `Rs ${Number(ad.price).toLocaleString()}`
            : "Rs 0",
          type: ad.subCategory || "",
          postDate: ad.created_at ? ad.created_at.slice(0, 10) : "",
          number: ad.sellerContact || "",
          images: ad.images
            ? typeof ad.images === "string"
              ? JSON.parse(ad.images)
              : ad.images
            : [],
          features: parsedFeatures,
          name: ad.sellerName || "",
        });
      })
      .catch((err) => console.error("Error fetching ad details:", err));
  }, [pathname]);

  const formatKey = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* --- TOP BREADCRUMB / ACTION BAR --- */}
      <div className="bg-white border-b border-gray-200 py-3 mb-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <span className="text-gray-400 font-medium tracking-tight uppercase">
            PakDeals {">"} {adDetails._tableName?.replace(/-/g, " ")}
          </span>
          <button className="flex items-center gap-2 text-blue-900 font-bold hover:text-orange-600 transition-colors">
            <Share2 size={16} /> Share Ad
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:flex gap-8">
        {/* ==================== MAIN CONTENT AREA ==================== */}
        <div className="lg:w-[70%] space-y-6">
          {/* 1. Header & Pricing */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {adDetails.title}
              </h1>
              <div className="flex gap-4 mt-3 text-gray-500 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-orange-600" />{" "}
                  {adDetails.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={16} /> {adDetails.postDate}
                </div>
              </div>
            </div>
            <div className="bg-orange-50 px-6 py-4 rounded-xl border border-orange-100">
              <p className="text-orange-600 text-xs font-black uppercase tracking-widest mb-1">
                Total Price
              </p>
              <h2 className="text-3xl font-black text-orange-600">
                {adDetails.amount}
              </h2>
            </div>
          </div>

          {/* 2. Professional Image Gallery */}
          {adDetails.images?.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={adDetails.images[activeImg]}
                  alt="Listing"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {adDetails.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative w-24 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all 
                      ${activeImg === i ? "border-orange-600 scale-95" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      alt="Thumb"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Specs & Ad Details */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldCheck className="text-blue-900" size={20} /> Item
              Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
              {Object.entries(adDetails)
                .filter(([key, value]) => !EXCLUDED_KEYS.includes(key) && value)
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-gray-50 pb-2"
                  >
                    <span className="text-gray-400 font-medium text-sm">
                      {formatKey(key)}
                    </span>
                    <span className="text-slate-900 font-bold text-sm">
                      {key === "price"
                        ? `Rs ${Number(value).toLocaleString()}`
                        : value}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* 4. Features */}
          {adDetails.features?.length > 0 && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6">
                Included Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {adDetails.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50"
                  >
                    <Check
                      size={16}
                      className="text-blue-900 bg-white rounded-full p-0.5"
                      strokeWidth={4}
                    />
                    <span className="text-sm font-bold text-slate-700">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Description */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4">
              Seller Description
            </h2>
            <p className="text-slate-600 leading-relaxed text-base whitespace-pre-wrap">
              {adDetails.description}
            </p>
          </div>
        </div>

        {/* ==================== SELLER SIDEBAR ==================== */}
        <div className="lg:w-[30%] mt-8 lg:mt-0">
          <div className="sticky top-6 space-y-4">
            {/* Seller Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center text-3xl font-black mb-4 shadow-inner">
                  {adDetails.name?.[0]}
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {adDetails.name}
                </h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter mt-1">
                  Verified Seller
                </p>

                <div className="w-full h-px bg-gray-100 my-6" />

                <div className="w-full space-y-3">
                  <div
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between
                    ${toggleNumber ? "bg-white border-blue-900" : "bg-gray-50 border-transparent"}`}
                  >
                    <Phone size={18} className="text-blue-900" />
                    <span className="font-mono font-black text-slate-800 tracking-wider">
                      {toggleNumber ? adDetails.number : "03XX XXXXXXX"}
                    </span>
                  </div>

                  <button
                    onClick={() => setToggleNumber(!toggleNumber)}
                    className="w-full text-[10px] font-black uppercase tracking-widest text-blue-900 hover:underline"
                  >
                    {toggleNumber ? "Hide Number" : "Show Number"}
                  </button>

                  <Link
                    to={`https://wa.me/${adDetails.number?.replace(/\D/g, "")}`}
                    target="_blank"
                    className="flex items-center w-full gap-3 justify-center py-4 bg-green-600 rounded-xl text-white hover:bg-green-700 transition-all font-black shadow-lg shadow-green-100"
                  >
                    <MessageCircle size={20} /> WHATSAPP CHAT
                  </Link>
                </div>
              </div>
            </div>

            {/* Safety Tips Card */}
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h4 className="text-orange-800 font-black text-xs uppercase tracking-widest flex items-center gap-2 mb-3">
                <ShieldCheck size={16} /> Safety Tips
              </h4>
              <ul className="text-orange-700 text-xs font-bold space-y-2 leading-tight">
                <li>• Always meet in a public place.</li>
                <li>• Never pay in advance before inspection.</li>
                <li>• Inspect the item thoroughly.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsDetailPage;
