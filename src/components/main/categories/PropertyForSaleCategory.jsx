import axios from "axios";
import {
  ChevronDown,
  Plus,
  X,
  MapPin,
  Maximize2,
  Tag,
  User,
  Camera,
  Check,
} from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function PropertyForSaleCategory({
  openDropdown,
  setOpenDropdown,
  addAd_data,
}) {
  const navigate = useNavigatez();
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const FEATURES_LIST = [
    "Electric Connection",
    "Gas Connection",
    "Water Supply",
    "Sewerage System",
    "Road Access",
    "Boundary Wall",
    "Corner Plot",
    "Park Facing",
  ];

  const DEFAULT_FILTER = (label) => ({ id: "", label });

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    areaType: DEFAULT_FILTER("Select Area Type"),
    areaUnit: DEFAULT_FILTER("Select Area Unit"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    area: "",
    images: [],
  });

  // ==================== HANDLERS ====================
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    if (name === "sellerContact" && value.length > 13) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (key, item) => {
    setFormData((p) => ({ ...p, [key]: { id: item.id, label: item.text } }));
    setOpenDropdown("");
  };

  const handleFeatureChange = (feature) => {
    setFormData((prev) => {
      const isSelected = prev.features.includes(feature);
      return {
        ...prev,
        features: isSelected
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, 4),
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((img) => form.append("images", img));
      } else if (formData[key]?.label) {
        form.append(key, formData[key].label);
      } else if (key === "features") {
        form.append(key, formData.features.join(", "));
      } else {
        form.append(key, formData[key]);
      }
    });

    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/ads/add-property-sale-ad/${userId}`,
        form,
      )
      .then((res) => {
        toast.success(res?.data?.message || "Property listed successfully!");
        localStorage.setItem("table_name", "property_sale_ads");
        localStorage.setItem("ad_id", res?.data?.ad_id);
        setTimeout(() => {
          navigate("/pricing");
        }, 2000);
      })
      .catch(() => toast.error("Submission failed"))
      .finally(() => setLoading(false));
  };

  // ==================== UI HELPERS ====================
  const renderDropdown = (label, key, dataKey, icon) => (
    <div className="w-full relative">
      <label className="text-sm font-bold text-blue-900 ml-1 flex items-center gap-1">
        {icon} {label}
      </label>
      <button
        type="button"
        onClick={() => setOpenDropdown(openDropdown === key ? "" : key)}
        className={`w-full flex justify-between items-center mt-1 py-3 px-4 border-2 rounded-xl transition-all
          ${openDropdown === key ? "border-blue-800 ring-4 ring-blue-50 bg-white" : "border-gray-100 bg-gray-50"}
          ${formData[key]?.id ? "text-gray-900 font-semibold" : "text-gray-400"}`}
      >
        {formData[key]?.label}
        <ChevronDown
          size={18}
          className={`transition-transform ${openDropdown === key ? "rotate-180" : ""}`}
        />
      </button>
      {openDropdown === key && (
        <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          {(
            addAd_data.propertyForSale.find((i) => i[dataKey])?.[dataKey] || []
          ).map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium transition-colors border-b last:border-0 border-gray-50"
              onClick={() => handleSelect(key, item)}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderInput = (label, name, type, value, placeholder, icon) => (
    <div className="w-full">
      <label className="text-sm font-bold text-blue-900 ml-1 flex items-center gap-1">
        {icon} {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleDetailChange}
        placeholder={placeholder}
        className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 mt-1 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
      />
    </div>
  );

  return (
    <form className="space-y-8 bg-white" onSubmit={handleSubmit}>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      {/* --- BASICS SECTION --- */}
      <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-wider text-xs">
          <Tag size={16} /> Sale Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDropdown(
            "Sub Category",
            "subCategory",
            "propertySaleSubCategories",
          )}
          {renderDropdown("Area Type", "areaType", "propertySaleAreaType")}
        </div>
        {renderInput(
          "Ad Title",
          "adTitle",
          "text",
          formData.adTitle,
          "e.g. 10 Marla Residential Plot in Bahria Town",
        )}
        <textarea
          name="description"
          rows={4}
          placeholder="Mention key selling points like nearby landmarks, development status, or payment plans..."
          value={formData.description}
          onChange={handleDetailChange}
          className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all resize-none"
        />
      </div>

      {/* --- AREA & PRICE SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderDropdown(
          "Area Unit",
          "areaUnit",
          "propertySaleAreaUnit",
          <Maximize2 size={14} />,
        )}
        {renderInput(
          "Area Size",
          "area",
          "number",
          formData.area,
          "Total Area",
          <Maximize2 size={14} />,
        )}
        {renderInput(
          "Total Price (Rs)",
          "price",
          "number",
          formData.price,
          "Price",
          <Tag size={14} />,
        )}
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-blue-900 ml-1 uppercase tracking-tight">
          Available Utilities & Features
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES_LIST.map((feature) => (
            <label
              key={feature}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer text-[11px] font-bold
                ${
                  formData.features.includes(feature)
                    ? "border-blue-800 bg-blue-800 text-white shadow-md shadow-blue-100"
                    : "border-gray-100 bg-gray-50 text-gray-500 hover:border-blue-200"
                }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
              />
              {formData.features.includes(feature) && <Check size={12} />}
              {feature}
            </label>
          ))}
        </div>
      </div>

      {/* --- LOCATION & SELLER SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        <div className="md:col-span-2">
          {renderDropdown(
            "Location",
            "location",
            "propertySaleLocation",
            <MapPin size={14} />,
          )}
        </div>
        {renderInput(
          "Seller Name",
          "sellerName",
          "text",
          formData.sellerName,
          "Full name",
          <User size={14} />,
        )}
        {renderInput(
          "Contact Number",
          "sellerContact",
          "tel",
          formData.sellerContact,
          "+92 3XX XXXXXXX",
        )}
      </div>

      {/* --- IMAGE SECTION --- */}
      <div className="space-y-4">
        <label className="text-sm font-black text-blue-900 uppercase tracking-tighter flex items-center gap-2">
          <Camera size={18} /> Media Gallery (Max 5)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square group">
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-full h-full object-cover rounded-2xl border-2 border-blue-100 shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-all"
              >
                <X size={14} />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 right-2 bg-blue-900/80 text-[10px] text-white text-center py-1 rounded-lg backdrop-blur-md font-bold uppercase tracking-widest">
                  Cover
                </div>
              )}
            </div>
          ))}
          {formData.images.length < 4 && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="aspect-square border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center text-blue-800 hover:bg-blue-100 transition-all group"
            >
              <Plus
                size={32}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-black uppercase mt-2">
                Upload
              </span>
            </button>
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

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto bg-blue-900 text-white font-black px-16 py-4 rounded-2xl shadow-xl hover:bg-blue-800 hover:-translate-y-1 transition-all disabled:opacity-50"
      >
        {loading ? "Publishing listing..." : "Submit Property Sale Ad"}
      </button>
    </form>
  );
}

export default PropertyForSaleCategory;
