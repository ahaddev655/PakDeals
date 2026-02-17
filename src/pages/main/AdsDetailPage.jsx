import React, { useEffect, useRef, useState } from "react";
import { MapPin, CalendarDays, Phone, Check } from "lucide-react";

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
  const [adDetails, setAdDetails] = useState({
    // USER DETAILS
    name: "Faheem Shafique",
    number: "0300-1234567",
    // AD DETAILS
    location: "Punjab",
    postDate: "12/18/2025",
    title: "5 Marla Plot in Rawat Residential Colony",
    type: "Residential Plots",
    category: "Plots",
    area: "5",
    areaUnit: "Marla",
    features: [
      "Electricity",
      "Gas",
      "Water Supply",
      "Sewerage",
      "Road Access",
      "Boundary Wall",
      "Corner Plot",
      "Park Facing",
    ],
    description: "5 Marla plot on main GT Road Rawat is available for sale.",
    amount: 500000,
  });
  const formatedNumber = adDetails.number.trim().replace("-", "");
  const encryptedNumber = "*".repeat(formatedNumber.length);

  const sidebarRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      if (window.scrollY > 225) {
        return setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page">
      {/* ==================== HEADING & DETAILS ==================== */}
      <div className="mb-5">
        {/* -------------------- HEADING -------------------- */}
        <div className="md:flex justify-between gap-4 min-h-10">
          <h1 className="text-xl md:text-3xl font-semibold">
            {adDetails.title}
          </h1>
          <div className="space-y-1.5 md:mt-0 mt-3">
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
              PKR {adDetails.amount.toLocaleString()}
            </h1>
            <p className="text-orange-600 md:text-end text-sm">
              {adDetails.type}
            </p>
          </div>
        </div>
        {/* -------------------- DETAILS -------------------- */}
        <div className="flex flex-wrap items-center gap-6 mt-2">
          <div className="flex items-center gap-1">
            <MapPin strokeWidth={1.2} size={14} className="text-gray-500" />
            <h6 className="text-gray-500 text-sm">{adDetails.location}</h6>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays
              strokeWidth={1.2}
              size={14}
              className="text-gray-500"
            />
            <h6 className="text-gray-500 text-sm">{adDetails.postDate}</h6>
          </div>
        </div>
      </div>

      {/* ==================== AD DETAILS ==================== */}
      <div className="lg:flex gap-5 relative space-y-4 lg:space-y-0">
        <div className="w-full lg:w-3/4">
          {/* -------------------- AD IMAGES -------------------- */}
          <div className="w-full rounded-lg p-3 bg-white shadow-lg">
            <div>
              <img
                src="/assets/profile.jpg"
                alt="IMG"
                className="h-72 sm:h-96 w-full object-cover rounded-lg"
                ref={imageRef}
                onClick={handleImageChange}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 mt-3.5 gap-3.5">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="IMG"
                  className="h-20 w-full object-cover rounded-lg cursor-pointer"
                  onClick={() => handleImageChange(index)}
                />
              ))}
            </div>
          </div>
          {/* -------------------- PROPERTY DETAILS -------------------- */}
          <div className="mt-6 p-3 bg-white shadow-lg w-full rounded-lg">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-700">
                Property Details
              </h1>
            </div>
            <div className="sm:flex items-center gap-6 mb-6">
              <div className="flex items-center justify-between gap-3 w-full border-b border-gray-200 pb-1.5">
                <p className="text-gray-500">Type:</p>
                <p className="font-medium">{adDetails.type}</p>
              </div>
              <div className="flex items-center justify-between gap-3 w-full border-b border-gray-200 pb-1.5 mt-5 sm:mt-0">
                <p className="text-gray-500">Category:</p>
                <p className="font-medium">{adDetails.category}</p>
              </div>
            </div>
            <div className="sm:flex items-center gap-6">
              <div className="flex items-center justify-between gap-3 w-full border-b border-gray-200 pb-1.5">
                <p className="text-gray-500">Area:</p>
                <p className="font-medium">
                  {Number(adDetails.area).toFixed(2)} {adDetails.areaUnit}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 w-full border-b border-gray-200 pb-1.5 mt-5 sm:mt-0">
                <p className="text-gray-500">Location:</p>
                <p className="font-medium">{adDetails.location}</p>
              </div>
            </div>
          </div>
          {/* -------------------- AMENITIES -------------------- */}
          <div className="mt-6 p-3 bg-white shadow-lg w-full rounded-lg">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-700">Amenities</h1>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {adDetails.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-500 mb-3"
                >
                  <Check
                    strokeWidth={1.4}
                    size={18}
                    className="text-blue-800"
                  />
                  <p className="text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          {/* -------------------- DESCRIPTION -------------------- */}
          <div className="mt-6 p-3 bg-white shadow-lg w-full rounded-lg">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-700">
                Description
              </h1>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {adDetails.description}
            </p>
          </div>
        </div>

        {/* ==================== PERSON DETAILS ==================== */}
        <div className="w-full lg:w-1/4 relative">
          <div
            ref={sidebarRef}
            className={`p-3 bg-white shadow-lg w-full rounded-lg h-fit ${
              isFixed ? "lg:fixed lg:top-5 lg:w-1/4" : "relative mt-6"
            }`}
          >
            {/* -------------------- NAME & DATE -------------------- */}
            <div className="flex justify-between gap-5">
              <h1 className="font-semibold text-lg">{adDetails.name}</h1>
              <h1 className="text-sm text-gray-500 text-end">
                Posted on {adDetails.postDate}
              </h1>
            </div>

            {/* -------------------- LOCATION -------------------- */}
            <div className="flex items-center gap-1 mt-2">
              <MapPin strokeWidth={2.4} size={16} className="text-gray-500" />
              <h6 className="text-gray-500 text-sm">{adDetails.location}</h6>
            </div>

            {/* -------------------- NUMBER -------------------- */}
            <div className="flex items-center gap-1 mt-2">
              <Phone strokeWidth={2.4} size={16} className="text-gray-500" />
              <h6 className="text-gray-500 text-sm break-all">
                {toggleNumber ? adDetails.number : encryptedNumber}
              </h6>
            </div>

            {/* -------------------- BUTTON -------------------- */}
            <div className="text-center">
              <button
                className="mt-4 text-gray-500 text-sm font-medium"
                onClick={() => setToggleNumber(!toggleNumber)}
              >
                {toggleNumber ? "Hide Number" : "Show Number"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsDetailPage;
