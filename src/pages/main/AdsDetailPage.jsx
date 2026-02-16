import React, { useRef, useState } from "react";
import { MapPin, CalendarDays, Phone } from "lucide-react";
import { replace } from "react-router-dom";

function AdsDetailPage() {
  const imageRef = useRef(null);
  const images = [
    "/assets/profile.jpg",
    "/assets/profile.jpg",
    "/assets/profile.jpg",
    "/assets/profile.jpg",
    "/assets/k5lf638szuebxt02cpab.jpg",
  ];

  const handleImageChange = (index) => {
    imageRef.current.src = images[index];
  };
  const [toggleNumber, setToggleNumber] = useState(false);
  const [number, setNumber] = useState("0316-5837272");
  const formatedNumber = number.trim().replace("-", "");
  const encryptedNumber = "*".repeat(formatedNumber.length);

  return (
    <div className="page">
      {/* ==================== HEADING & DETAILS ==================== */}
      <div className="mb-5">
        {/* -------------------- HEADING -------------------- */}
        <div className="md:flex justify-between gap-4 h-10">
          <h1 className="text-xl md:text-3xl font-semibold">
            5 Marla Plot in Rawat Residential Colony
          </h1>
          <div className="space-y-1.5 md:mt-0 mt-3">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
              PKR 500,000
            </h1>
            <p className="text-orange-600 text-end text-sm">
              Residential Plots
            </p>
          </div>
        </div>
        {/* -------------------- DETAILS -------------------- */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <MapPin strokeWidth={1.2} size={14} className="text-gray-500" />
            <h6 className="text-gray-500 text-sm">Punjab</h6>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays
              strokeWidth={1.2}
              size={14}
              className="text-gray-500"
            />
            <h6 className="text-gray-500 text-sm">12/18/2025</h6>
          </div>
        </div>
      </div>
      {/* ==================== AD DETAILS ==================== */}
      <div className="md:flex gap-5">
        {/* -------------------- AD IMAGES -------------------- */}
        <div className="md:w-[75%] rounded-lg p-3 bg-white shadow-lg">
          <div>
            <img
              src="/assets/profile.jpg"
              alt="IMG"
              className="h-100 w-full rounded-lg"
              ref={imageRef}
              onClick={handleImageChange}
            />
          </div>
          <div className="grid grid-cols-4 mt-3.5 gap-3.5">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="IMG"
                className="h-20 w-full rounded-lg cursor-pointer"
                onClick={() => handleImageChange(index)}
              />
            ))}
          </div>
        </div>
        {/* ==================== AD DETAILS ==================== */}
        <div className="w-[25%] mt-6 p-3 bg-white shadow-lg rounded-lg h-fit">
          {/* -------------------- NAME & DATE -------------------- */}
          <div className="flex justify-between gap-5">
            <h1 className="font-semibold text-lg">Faheem Shafique</h1>
            <h1 className="text-sm text-gray-500 text-end">
              Posted on 12/18/2025
            </h1>
          </div>
          {/* -------------------- LOCATION -------------------- */}
          <div className="flex items-center gap-1 mt-2">
            <MapPin strokeWidth={2.4} size={16} className="text-gray-500" />
            <h6 className="text-gray-500 text-sm">Punjab</h6>
          </div>
          {/* -------------------- NUMBER -------------------- */}
          <div className="flex items-center gap-1 mt-2">
            <Phone strokeWidth={2.4} size={16} className="text-gray-500" />
            <h6 className="text-gray-500 text-sm">
              {toggleNumber ? number : encryptedNumber}
            </h6>
          </div>
          {/* -------------------- SHOW NUMBER BUTTON -------------------- */}
          <div className="text-center">
          <button
            className="mt-4 text-gray-500 text-sm font-medium"
            onClick={() =>  setToggleNumber(!toggleNumber)}
          >
            {toggleNumber ? "Hide Number" : "Show Number"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsDetailPage;
