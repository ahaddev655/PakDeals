import { ChevronDown } from "lucide-react";
import { useState } from "react";

function ElectronicsAndHomeAppliancesCategory({
  openDropdown,
  setOpenDropdown,
  addAd_data,
}) {
  const FEATURES_LIST = [
    "Wifi Enabled",
    "Bluetooth",
    "4K Resolution",
    "Smart Features",
    "Energy Efficient",
    "Remote Control",
    "USB Ports",
    "HDMI Ports",
    "Touch Screen",
    "Voice Control",
    "Fast Charging",
    "Wireless Charging",
  ];

  const DEFAULT_FILTER = (label) => ({ id: "", label });
  const [filters, setFilters] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    brand: DEFAULT_FILTER("Select Brand"),
    condition: DEFAULT_FILTER("Select Condition"),
    warranty: DEFAULT_FILTER("Select Warranty"),
    location: DEFAULT_FILTER("Select Location"),
  });

  const [otherDetails, setOtherDetails] = useState({
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    type: "",
    model: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      category: "electronics-and-home-appliances",
      ...otherDetails,
      subCategory: filters.subCategory?.label || "",
      brand: filters.brand?.label || "",
      condition: filters.condition?.label || "",
      warranty: filters.warranty?.label || "",
      location: filters.location?.label || "",
      features: JSON.stringify(otherDetails.features),
    };
    console.log("PROPERTY FOR RENT FORM SUBMITTED:", payload);

    setOtherDetails({
      adTitle: "",
      description: "",
      price: "",
      sellerName: "",
      sellerContact: "",
      features: [],
      type: "",
      model: "",
    });

    setFilters({
      subCategory: DEFAULT_FILTER("Select Sub Category"),
      brand: DEFAULT_FILTER("Select Brand"),
      condition: DEFAULT_FILTER("Select Condition"),
      warranty: DEFAULT_FILTER("Select Warranty"),
      location: DEFAULT_FILTER("Select Location"),
    });
  };

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
            addAd_data.electronicsAndHomeAppliances.find((i) => i[dataKey])?.[
              dataKey
            ] || []
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
            "electronicsAndHomeAppliancesSubCategories",
            true,
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

        {/* ====================== TYPE & BRAND ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- TYPE -------- */}
          {renderInput("Type", "type", "text", otherDetails.type)}
          {/* -------- BRAND -------- */}
          {renderDropdown(
            "Brand",
            "brand",
            "electronicsAndHomeAppliancesBrand",
            true,
          )}
        </div>
        {/* ====================== MODEL & CONDITION ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- MODEL -------- */}
          {renderInput("Model", "model", "text", otherDetails.model)}
          {/* -------- CONDITION -------- */}
          {renderDropdown(
            "Condition",
            "condition",
            "electronicsAndHomeAppliancesCondition",
          )}
        </div>

        {/* ====================== WARRANTY STATUS ====================== */}
        {renderDropdown(
          "Warranty Status",
          "warranty",
          "electronicsAndHomeAppliancesWarranty",
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

        {/* ====================== LOCATION & PRICE ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- LOCATION -------- */}
          {renderDropdown(
            "Location",
            "location",
            "electronicsAndHomeAppliancesLocation",
          )}
          {/* -------- PRICE -------- */}
          {renderInput("Price", "price", "number", otherDetails.price)}
        </div>

        {/* ====================== SELLER NAME & CONTACT ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- SELLER NAME -------- */}
          {renderInput(
            "Seller Name",
            "sellerName",
            "text",
            otherDetails.sellerName,
          )}
          {/* -------- SELLER CONTACT -------- */}
          {renderInput(
            "Seller Contact",
            "sellerContact",
            "tel",
            otherDetails.sellerContact,
          )}
        </div>
      </div>

      {/* ====================== SUBMIT BUTTON ====================== */}
      <button
        type="submit"
        className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
        transition-all duration-300 font-medium rounded-lg"
      >
        Submit Electronics Ad
      </button>
    </form>
  );
}

export default ElectronicsAndHomeAppliancesCategory;
