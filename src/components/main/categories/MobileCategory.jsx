import { ChevronDown } from "lucide-react";
import { useState } from "react";

function MobileCategory({ openDropdown, setOpenDropdown, addAd_data }) {
  const DEFAULT_FILTER = (label) => ({ id: "", label });
  const [filters, setFilters] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    brand: DEFAULT_FILTER("Select Brand"),
    condition: DEFAULT_FILTER("Select Condition"),
    location: DEFAULT_FILTER("Select Location"),
  });

  const [otherDetails, setOtherDetails] = useState({
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
  });

  const handleDetailChange = (e) =>
    setOtherDetails((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSelect = (key, item) => {
    setFilters((p) => ({ ...p, [key]: { id: item.id, label: item.text } }));
    setOpenDropdown("");
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
          {(addAd_data.mobile.find((i) => i[dataKey])?.[dataKey] || []).map(
            (item) => (
              <h4
                key={item.id}
                className="p-2 cursor-pointer hover:bg-blue-50"
                onClick={() => handleSelect(key, item)}
              >
                {item.text}
              </h4>
            ),
          )}
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
      category: "mobiles",
      ...otherDetails,
      subCategory: filters.subCategory.label,
      brand: filters.brand.label,
      condition: filters.condition.label,
      location: filters.location.label,
    };

    console.log("MOBILE FORM SUBMITTED:", payload);

    setDetails({
      adTitle: "",
      description: "",
      price: "",
      sellerName: "",
      sellerContact: "",
    });

    setFilters({
      subCategory: DEFAULT_FILTER("Select Sub Category"),
      brand: DEFAULT_FILTER("Select Brand"),
      condition: DEFAULT_FILTER("Select Condition"),
      location: DEFAULT_FILTER("Select Location"),
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* ====================== SUB CATEGORY & BRAND ====================== */}
      <div className="sm:flex gap-6">
        {/* -------- SUB CATEGORY -------- */}
        {renderDropdown("Sub Category", "subCategory", "mobileSubCategories")}
        {/* -------- BRAND -------- */}
        {renderDropdown("Brand", "brand", "mobileBrands", true)}
      </div>
      {/* ====================== AD TITLE ====================== */}
      {renderInput("Ad Title", "adTitle", "text", otherDetails.adTitle)}
      {/* ====================== DESCRIPTION ====================== */}
      <textarea
        name="description"
        rows={6}
        value={otherDetails.description}
        onChange={handleDetailChange}
        className="w-full border-2 rounded-lg px-3 py-2 border-gray-300 transition-colors duration-300 focus:ring-2 focus:ring-blue-800 resize-none"
      ></textarea>

      {/* ====================== CONDITION ====================== */}
      {renderDropdown("Condition", "condition", "mobileCondition")}

      {/* ====================== LOCATION & PRICE ====================== */}
      <div className="sm:flex gap-6">
        {/* -------- LOCATION -------- */}
        {renderDropdown("Location", "location", "mobileLocation")}
        {/* -------- PRICE -------- */}
        {renderInput("Price", "price", "number", otherDetails.price)}
      </div>

      {/* ====================== SELLER NAME & CONTACT ====================== */}
      <div className="sm:flex gap-6">
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

      <button
        className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
        transition-all duration-300 font-medium rounded-lg"
      >
        Submit Mobile Ad
      </button>
    </form>
  );
}

export default MobileCategory;
