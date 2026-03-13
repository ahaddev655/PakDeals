import React, { useEffect, useRef, useState } from "react";
import { MapPin, CalendarDays, Phone, Check, MoveRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function AdsDetailPage() {
  const imageRef = useRef(null);

  const handleImageChange = (index) => {
    if (imageRef.current && adDetails.images && adDetails.images[index]) {
      imageRef.current.src = adDetails.images[index];
    }
  };

  const [toggleNumber, setToggleNumber] = useState(false);
  const [adDetails, setAdDetails] = useState({
    id: "",
    title: "",
    amount: 0,
    type: "",
    category: "",
    location: "",
    postDate: "",
    number: "",
    images: [],
    features: [],
    description: "",
    name: "",
  });

  const sidebarRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current) return;

      if (window.scrollY > 225) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathLocation = useLocation();

  const categoryFields = {
    animal_ads: [
      { label: "Type", key: "type" },
      { label: "Sex", key: "sex" },
      { label: "Breed", key: "breed" },
      { label: "Age", key: "age" },
      { label: "Color", key: "color" },
      { label: "Vaccination Status", key: "vaccinationStatus" },
    ],
    bikes_ads: [
      { label: "Make", key: "make" },
      { label: "Model", key: "model" },
      { label: "Year", key: "year" },
      { label: "Engine Type", key: "engineType" },
      { label: "Engine Capacity", key: "engineCapacity" },
      { label: "KM Driven", key: "kmDriven" },
      { label: "Condition", key: "condition" },
      { label: "Ignition Type", key: "ignitionType" },
      { label: "Origin", key: "origin" },
      { label: "Registration City", key: "registrationCity" },
    ],
    books_ads: [
      { label: "Item Type", key: "itemType" },
      { label: "Genre", key: "genre" },
      { label: "Author", key: "author" },
      { label: "Language", key: "language" },
      { label: "Format", key: "format" },
      { label: "Condition", key: "condition" },
    ],
    electronics_ads: [
      { label: "Type", key: "type" },
      { label: "Brand", key: "brand" },
      { label: "Model", key: "model" },
      { label: "Condition", key: "condition" },
      { label: "Warranty", key: "warranty" },
    ],
    fashion_ads: [
      { label: "Type", key: "type" },
      { label: "Brand", key: "brand" },
      { label: "Gender", key: "gender" },
      { label: "Size", key: "size" },
      { label: "Color", key: "color" },
      { label: "Material", key: "material" },
      { label: "Condition", key: "condition" },
    ],
    furniture_ads: [
      { label: "Item Type", key: "itemType" },
      { label: "Brand", key: "brand" },
      { label: "Material", key: "material" },
      { label: "Dimensions", key: "dimensions" },
      { label: "Condition", key: "condition" },
    ],
    kids_ads: [
      { label: "Item Type", key: "itemType" },
      { label: "Brand", key: "brand" },
      { label: "Age Group", key: "ageGroup" },
      { label: "Condition", key: "condition" },
    ],
    mobile_ads: [
      { label: "Brand", key: "brand" },
      { label: "Condition", key: "condition" },
    ],
    motors_ads: [
      { label: "Make", key: "make" },
      { label: "Year", key: "carYear" },
      { label: "Color", key: "carColor" },
      { label: "Condition", key: "condition" },
      { label: "Body/Fuel", key: "bodyFuel" },
      { label: "Transmission", key: "transmission" },
      { label: "Body Type", key: "bodyType" },
      { label: "Assembly", key: "assembly" },
      { label: "Document Status", key: "documentStatus" },
      { label: "Owners", key: "owners" },
      { label: "Seats", key: "seats" },
    ],
    property_rent_ads: [
      { label: "Area Unit", key: "areaUnit" },
      { label: "Area Size", key: "areaSize" },
      { label: "Bedrooms", key: "bedrooms" },
      { label: "Bathrooms", key: "bathrooms" },
      { label: "Number of Storeys", key: "numberOfStoreys" },
      { label: "Furnished Status", key: "furnishedStatus" },
      { label: "Construction State", key: "constructionState" },
    ],
    property_sale_ads: [
      { label: "Area Unit", key: "areaUnit" },
      { label: "Area Type", key: "areaType" },
      { label: "Area", key: "area" },
    ],
  };

  const formatFieldKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const fetchAdDetails = () => {
    const path = pathLocation.pathname.slice(4);
    const formattedPath = path.split("/");
    const tableName = formattedPath[0];
    const adId = formattedPath[1];

    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/ads/fetch-ad-details/${tableName}/${adId}`,
      )
      .then((res) => {
        const data = res?.data;
        const response = data?.ad_details;

        const formatAds = (ad) => {
          const baseFields = {
            id: ad.id || "",
            title: ad.adTitle || "",
            amount: Number(ad.price) || 0,
            type: ad.subCategory || "",
            category: ad.subCategory || "",
            location: ad.location || "",
            postDate: ad.created_at
              ? ad.created_at.slice(5, 16).replace(/-/g, "/")
              : "",
            number: ad.sellerContact || "",
            images: ad.images ? JSON.parse(ad.images) : [],
            features: ad.features ? JSON.parse(ad.features) : [],
            description: ad.description || "",
            name: ad.sellerName || "",
            _tableName: tableName,
          };
          const dynamicFields = {};
          Object.keys(ad).forEach((key) => {
            if (
              !baseFields.hasOwnProperty(key) &&
              ![
                "id",
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
              ].includes(key)
            ) {
              dynamicFields[key] = ad[key];
            }
          });

          return { ...baseFields, ...dynamicFields };
        };

        if (response) {
          const formattedAd = formatAds(response);
          setAdDetails(formattedAd);
        }
      })
      .catch((error) => {
        console.error("Error fetching ad details:", error);
      });
  };

  useEffect(() => {
    fetchAdDetails();
  }, [pathLocation]);

  const currentFields = categoryFields[adDetails._tableName] || [];

  const renderDynamicFields = () => {
    const fields = [];

    currentFields.forEach((field) => {
      if (adDetails[field.key] && adDetails[field.key] !== "") {
        fields.push(
          <div
            key={field.key}
            className="flex items-center justify-between gap-3 w-full border-b border-gray-200 pb-1.5"
          >
            <p className="text-gray-500">{field.label}:</p>
            <p className="font-medium">{adDetails[field.key]}</p>
          </div>,
        );
      }
    });

    Object.keys(adDetails).forEach((key) => {
      const isBaseField = [
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
      ].includes(key);

      const isInCurrentFields = currentFields.some(
        (field) => field.key === key,
      );

      if (
        !isBaseField &&
        !isInCurrentFields &&
        adDetails[key] &&
        adDetails[key] !== ""
      ) {
        fields.push(
          <div
            key={key}
            className="flex items-center justify-between gap-3 w-full border-b border-gray-200 pb-1.5"
          >
            <p className="text-gray-500">{formatFieldKey(key)}:</p>
            <p className="font-medium">{adDetails[key]}</p>
          </div>,
        );
      }
    });

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {fields.map((field, index) => (
          <div key={index} className="w-full">
            {field}
          </div>
        ))}
      </div>
    );
  };

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
              PKR {adDetails.amount?.toLocaleString()}
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
          {adDetails.images && adDetails.images.length > 0 && (
            <div className="w-full rounded-lg p-3 bg-white shadow-lg">
              <div>
                <img
                  src={adDetails.images[0] || "/assets/profile.jpg"}
                  alt="IMG"
                  className="h-72 sm:h-96 w-full object-cover rounded-lg"
                  ref={imageRef}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 mt-3.5 gap-3.5">
                {adDetails.images.map((img, index) => (
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
          )}

          {/* -------------------- DETAILS SECTION -------------------- */}
          <div className="mt-6 p-3 bg-white shadow-lg w-full rounded-lg">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-700">
                Ad Details
              </h1>
            </div>

            {renderDynamicFields()}
          </div>

          {/* -------------------- AMENITIES / FEATURES -------------------- */}
          {adDetails.features && adDetails.features.length > 0 && (
            <div className="mt-6 p-3 bg-white shadow-lg w-full rounded-lg">
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-700">
                  Features
                </h1>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {adDetails.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-500 mb-3"
                  >
                    <Check
                      strokeWidth={2.3}
                      size={18}
                      className="text-blue-800"
                    />
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------- DESCRIPTION -------------------- */}
          {adDetails.description && (
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
          )}
        </div>

        {/* ==================== SELLER DETAILS ==================== */}
        <div className="w-full lg:w-1/4 relative">
          <div
            ref={sidebarRef}
            className={`p-3 bg-white shadow-lg w-full rounded-lg ${
              isFixed
                ? "lg:fixed lg:top-5 lg:w-[calc(25%-1.25rem)] max-h-[calc(100vh-2.5rem)] overflow-y-auto"
                : "relative mt-6 h-fit"
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
                {toggleNumber
                  ? adDetails.number
                  : "*".repeat(adDetails.number?.length || 0)}
              </h6>
            </div>
            <div className="text-center">
              <button
                className="mt-4 text-gray-500 text-sm font-medium"
                onClick={() => setToggleNumber(!toggleNumber)}
              >
                {toggleNumber ? "Hide Number" : "Show Number"}
              </button>
            </div>
            {/* -------------------- WHATSAPP BUTTON -------------------- */}
            {adDetails.number && (
              <Link
                to={`https://api.whatsapp.com/send/?phone=${adDetails.number.replace(/\D/g, "")}&text=Hello, I'm interested in your ad: ${adDetails.title}&app_absent=0`}
                target="_blank"
              >
                <button
                  type="button"
                  className="flex group items-center w-full gap-1 justify-center py-3 bg-blue-900 rounded-md text-white mt-3"
                >
                  Let's Chat
                  <MoveRight className="group-hover:translate-x-1 transition-all" />
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
