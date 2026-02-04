import { ChevronDown } from "lucide-react";
import { useState } from "react";

function PropertyForRentCategory({
  openDropdown,
  setOpenDropdown,
  addAd_data,
}) {
  const FEATURES_LIST = [
    "Electricity Backup",
    "Water Disposal",
    "Sewerage",
    "Water Supply",
    "Broadband Internet Access",
    "Satellite/Cable TV Ready",
    "Intercom",
    "Lawn",
    "Balcony",
    "Parking Space",
    "Swimming Pool",
    "Gym",
    "Kids Play Area",
    "Mosque",
    "Community Center",
    "Security Staff",
  ];
  const DEFAULT_FILTER = (label) => ({ id: "", label });
  const [filters, setFilters] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    areaUnit: DEFAULT_FILTER("Select Area Unit"),
    furnishedStatus: DEFAULT_FILTER("Select Furnished Status"),
    bedrooms: DEFAULT_FILTER("Select Bedrooms"),
    bathrooms: DEFAULT_FILTER("Select Bathrooms"),
    numberOfStoreys: DEFAULT_FILTER("Select No. of Storeys"),
    constructionState: DEFAULT_FILTER("Select Constructioin State"),
    location: DEFAULT_FILTER("Select Location"),
  });

  const [otherDetails, setOtherDetails] = useState({
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    areaSize: "",
  });

  const renderDropdown = (label, key, dataKey, scrollable = false) => (
    <div className="w-full">
      <label className="font-semibold text-slate-600">{label}</label>
      <div className="relative mt-1">
        <button
          type="button"
          className={`w-full flex justify-between py-2 px-3 border-2 border-gray-300 rounded-lg 
        transition-colors duration-300 focus:ring-2 focus:ring-blue-800 ${
          filters[key]?.id ? "text-black" : "text-gray-400"
        }`}
          onClick={() => setOpenDropdown(openDropdown === key ? "" : key)}
        >
          {filters[key]?.label}
          <ChevronDown />
        </button>

        <div
          className={`absolute z-10 bg-white top-11.75 shadow-xl w-full origin-top transition-all
        ${scrollable ? "h-70 overflow-auto" : ""}
        ${
          openDropdown === key
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0"
        }`}
        >
          {(
            addAd_data.propertyForRent.find((i) => i[dataKey])?.[dataKey] || []
          ).map((item) => (
            <h4
              key={item.id}
              className="p-2 cursor-pointer hover:bg-blue-50"
              onClick={() => handleSelect(key, item)}
            >
              {item.text}
            </h4>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInput = (label, name, type, value) => (
    <div className="w-full">
      <label className="font-semibold text-slate-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleDetailChange}
        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
      focus:border-blue-800 focus:ring-2 focus:ring-blue-800
      transition-colors ease-in-out duration-300"
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      category: "property-for-rent",
      ...otherDetails,
      features: JSON.stringify(otherDetails.features),
      subCategory: filters.subCategory?.label || "",
      areaUnit: filters.areaUnit?.label || "",
      furnishedStatus: filters.furnishedStatus?.label || "",
      bedrooms: filters.bedrooms?.label || "",
      bathrooms: filters.bathrooms?.label || "",
      numberOfStoreys: filters.numberOfStoreys?.label || "",
      constructionState: filters.constructionState?.label || "",
      location: filters.location?.label || "",
    };
    // FILTERS

    console.log("PROPERTY FOR RENT FORM SUBMITTED:", payload);

    setOtherDetails({
      adTitle: "",
      description: "",
      price: "",
      sellerName: "",
      sellerContact: "",
      features: [],
      areaSize: "",
    });

    setFilters({
      subCategory: DEFAULT_FILTER("Select Sub Category"),
      areaUnit: DEFAULT_FILTER("Select Area Unit"),
      furnishedStatus: DEFAULT_FILTER("Select Furnished Status"),
      bedrooms: DEFAULT_FILTER("Select Bedrooms"),
      bathrooms: DEFAULT_FILTER("Select Bathrooms"),
      numberOfStoreys: DEFAULT_FILTER("Select No. of Storeys"),
      constructionState: DEFAULT_FILTER("Select Constructioin State"),
      location: DEFAULT_FILTER("Select Location"),
    });
  };

  const handleDetailChange = (e) =>
    setOtherDetails((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSelect = (key, item) => {
    setFilters((p) => ({ ...p, [key]: { id: item.id, label: item.text } }));
    setOpenDropdown("");
  };

  const handleFeatureChange = (feature) => {
    setOtherDetails((prev) => {
      const alreadySelected = prev.features.includes(feature);

      return {
        ...prev,
        features: alreadySelected
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* ====================== SUB CATEGORY & AD TITLE ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- SUB CATEGORY -------- */}
          {renderDropdown(
            "Sub Category",
            "subCategory",
            "propertyRentSubCategories",
          )}

          {/* -------- AD TITLE -------- */}
          {renderInput("Ad Title", "adTitle", "text", otherDetails.adTitle)}
        </div>

        {/* ====================== DESCRIPTION ====================== */}
        <div className="w-full">
          <label className="font-semibold text-slate-600">Description</label>
          <textarea
            type="text"
            className="w-full border-2 border-gray-300 resize-none rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300"
            rows={6}
            value={otherDetails.description}
            onChange={(e) =>
              setOtherDetails({
                ...otherDetails,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>

        {/* ====================== FURNISHED & BEDROOMS ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- FURNISHED -------- */}
          {renderDropdown(
            "Furnished",
            "furnishedStatus",
            "propertyRentFurnishedStatus",
          )}
          {/* -------- BEDROOMS -------- */}
          {renderDropdown("Bedrooms", "bedrooms", "propertyRentBedrooms")}
        </div>
        {/* ====================== BATHROOMS & NO.OF STOREYS ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- BATHROOMS -------- */}
          {renderDropdown("Bathrooms", "bathrooms", "propertyRentBathrooms")}
          {/* -------- NO OF STOREYS -------- */}
          {renderDropdown(
            "No. Of Storeys",
            "numberOfStoreys",
            "propertyRentStoreys",
          )}
        </div>

        {/* ====================== CONSTRUCTION STATUS ====================== */}
        {renderDropdown(
          "Construction Status",
          "constructionState",
          "propertyRentConstructionStatus",
        )}

        {/* ====================== FEATURES ====================== */}
        <div className="w-full">
          <label className="font-semibold text-slate-600">Features</label>

          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-2 gap-3">
            {FEATURES_LIST.map((feature) => (
              <label
                key={feature}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  value={feature}
                  checked={otherDetails.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] relative checked:after:content-['✔'] checked:after:absolute checked:after:left-0.75 checked:after:top-[-0.5px] checked:after:text-white checked:after:text-sm focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none"
                />
                <span className="font-medium text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ====================== AREA UNIT & AREA SIZE ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- AREA SIZE -------- */}
          {renderDropdown("Area Unit", "areaUnit", "propertyRentAreaUnit")}
          {/* -------- AREA -------- */}
          {renderInput("Area Size", "areaSize", "text", otherDetails.areaSize)}
        </div>

        {/* ====================== LOCATION & PRICE ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- LOCATION -------- */}
          {renderDropdown("Location", "location", "propertyRentLocation")}

          <div className="w-full">
            <label className="font-semibold text-slate-600">Price</label>
            <input
              type="number"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300"
              value={otherDetails.price}
              onChange={(e) =>
                setOtherDetails({
                  ...otherDetails,
                  price: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* ====================== SELLER NAME & CONTACT ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          <div className="w-full">
            <label className="font-semibold text-slate-600">Seller Name</label>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300"
              value={otherDetails.sellerName}
              onChange={(e) =>
                setOtherDetails({
                  ...otherDetails,
                  sellerName: e.target.value,
                })
              }
            />
          </div>

          <div className="w-full">
            <label className="font-semibold text-slate-600">
              Seller Contact
            </label>
            <input
              type="tel"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300"
              value={otherDetails.sellerContact}
              onChange={(e) =>
                setOtherDetails({
                  ...otherDetails,
                  sellerContact: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* ====================== SUBMIT BUTTON ====================== */}
      <button
        type="submit"
        className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
        transition-all duration-300 font-medium rounded-lg"
      >
        Submit Property Rent Ad
      </button>
    </form>
  );
}

export default PropertyForRentCategory;
