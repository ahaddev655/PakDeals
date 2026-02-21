import { ChevronDown, Plus, X } from "lucide-react";
import { useState, useRef } from "react";

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

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    brand: DEFAULT_FILTER("Select Brand"),
    condition: DEFAULT_FILTER("Select Condition"),
    warranty: DEFAULT_FILTER("Select Warranty"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    type: "",
    model: "",
    images: [],
  });

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      category: "electronics-and-home-appliances",
      ...formData,
      subCategory: formData.subCategory?.label || "",
      brand: formData.brand?.label || "",
      condition: formData.condition?.label || "",
      warranty: formData.warranty?.label || "",
      location: formData.location?.label || "",
      features: JSON.stringify(formData.features),
    };

    console.log("PROPERTY FOR RENT FORM SUBMITTED:", payload);

    setFormData({
      subCategory: DEFAULT_FILTER("Select Sub Category"),
      brand: DEFAULT_FILTER("Select Brand"),
      condition: DEFAULT_FILTER("Select Condition"),
      warranty: DEFAULT_FILTER("Select Warranty"),
      location: DEFAULT_FILTER("Select Location"),
      adTitle: "",
      description: "",
      price: "",
      sellerName: "",
      sellerContact: "",
      features: [],
      type: "",
      model: "",
      images: [],
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
          formData[key]?.id ? "text-black" : "text-gray-400"
        }`}
          onClick={() => setOpenDropdown(openDropdown === key ? "" : key)}
        >
          {formData[key]?.label}
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
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSelect = (key, item) => {
    setFormData((p) => ({
      ...p,
      [key]: { id: item.id, label: item.text },
    }));
    setOpenDropdown("");
  };

  const handleFeatureChange = (feature) => {
    setFormData((prev) => {
      const alreadySelected = prev.features.includes(feature);

      return {
        ...prev,
        features: alreadySelected
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => {
      const updatedImages = [...prev.images, ...files].slice(0, 5);
      return { ...prev, images: updatedImages };
    });
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
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
          {renderInput("Ad Title", "adTitle", "text", formData.adTitle)}
        </div>

        {/* ====================== DESCRIPTION ====================== */}
        <div className="w-full">
          <label className="font-semibold text-slate-600">Description</label>
          <textarea
            className="w-full border-2 border-gray-300 resize-none rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300"
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* ====================== TYPE & BRAND ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- TYPE -------- */}
          {renderInput("Type", "type", "text", formData.type)}
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
          {renderInput("Model", "model", "text", formData.model)}
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
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="checkbox"
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
          {renderInput("Price", "price", "number", formData.price)}
        </div>

        {/* ====================== SELLER NAME & CONTACT ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {/* -------- SELLER NAME -------- */}
          {renderInput(
            "Seller Name",
            "sellerName",
            "text",
            formData.sellerName,
          )}
          {/* -------- SELLER CONTACT -------- */}
          {renderInput(
            "Seller Contact",
            "sellerContact",
            "tel",
            formData.sellerContact,
          )}
        </div>

        {/* ====================== IMAGE UPLOAD ====================== */}
        <div className="flex gap-2 flex-wrap">
          {formData.images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden"
            >
              <img
                src={URL.createObjectURL(img)}
                alt={`upload-${idx}`}
                className="object-cover w-full h-full"
              />
              <div
                className="absolute top-0 right-0 p-1 cursor-pointer bg-white rounded-full"
                onClick={() => removeImage(idx)}
              >
                <X size={16} />
              </div>
            </div>
          ))}

          {formData.images.length < 5 && (
            <div
              className="w-20 h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer text-blue-800"
              onClick={() => fileInputRef.current.click()}
            >
              <Plus size={24} />
            </div>
          )}
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
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
