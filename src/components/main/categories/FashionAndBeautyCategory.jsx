import {
  ChevronDown,
  Plus,
  X,
  Shirt,
  Camera,
  Sparkles,
  MapPin,
  Palette,
} from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function FashionAndBeautyCategory({
  openDropdown,
  setOpenDropdown,
  addAd_data,
}) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const DEFAULT_FILTER = (label) => ({ id: "", label });

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    brand: DEFAULT_FILTER("Select Brand"),
    gender: DEFAULT_FILTER("Select Sex/Gender"),
    size: DEFAULT_FILTER("Select Size"),
    material: DEFAULT_FILTER("Select Material"),
    condition: DEFAULT_FILTER("Select Condition"),
    type: DEFAULT_FILTER("Select Type"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    color: "#000000",
    features: [],
    price: "",
    sellerName: "",
    sellerContact: "",
    images: [],
  });

  const FEATURES_LIST = [
    "Designer",
    "Branded",
    "Handmade",
    "Embroidered",
    "Printed",
    "Plain",
    "Formal",
    "Casual",
    "Party Wear",
    "Wedding Wear",
    "Summer Collection",
    "Winter Collection",
  ];

  // ==================== HANDLERS ====================
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    if (name === "sellerContact" && value.length > 13) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (key, item) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { id: item.id, label: item.text },
    }));
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
        `https://pak-deals-backend.vercel.app/api/ads/add-fashion-ad/${userId}`,
        form,
      )
      .then((res) => {
        toast.success(res?.data?.message || "Fashion Ad Posted!");
        localStorage.setItem("table_name", "fashion_ads");
        localStorage.setItem("ad_id", res?.data?.ad_id);
        setTimeout(() => {
          navigate("/pricing");
        }, 2000);
      })
      .catch((err) => toast.error("Submission failed"))
      .finally(() => setLoading(false));
  };

  // ==================== UI HELPERS ====================
  const renderDropdown = (label, key, dataKey, scrollable = false) => (
    <div className="w-full relative">
      <label className="text-sm font-bold text-blue-900 ml-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpenDropdown(openDropdown === key ? "" : key)}
        className={`w-full flex justify-between items-center mt-1 py-3 px-4 border-2 rounded-xl transition-all
          ${openDropdown === key ? "border-blue-800 ring-4 ring-blue-50" : "border-gray-100 bg-gray-50"}
          ${formData[key]?.id ? "text-gray-900 font-semibold" : "text-gray-400"}`}
      >
        {formData[key]?.label}
        <ChevronDown
          size={18}
          className={`transition-transform ${openDropdown === key ? "rotate-180" : ""}`}
        />
      </button>
      {openDropdown === key && (
        <div
          className={`absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-y-auto animate-in fade-in slide-in-from-top-2 ${scrollable ? "h-60" : "max-h-60"}`}
        >
          {(
            addAd_data.fashionAndBeauty.find((i) => i[dataKey])?.[dataKey] || []
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

  const renderInput = (label, name, type, value, placeholder) => (
    <div className="w-full">
      <label className="text-sm font-bold text-blue-900 ml-1">{label}</label>
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

      {/* --- SECTION 1: STYLE IDENTITY --- */}
      <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-wider text-sm">
          <Shirt size={18} /> Essential Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDropdown(
            "Sub Category",
            "subCategory",
            "fashionAndBeautySubCategory",
            true,
          )}
          {renderDropdown("Brand", "brand", "fashionAndBeautyBrand", true)}
        </div>
        {renderInput(
          "Ad Title",
          "adTitle",
          "text",
          formData.adTitle,
          "e.g. Elegant Silk Jora - Wedding Collection",
        )}
        <textarea
          rows={4}
          name="description"
          placeholder="Describe the fabric, stitch type, and occasion..."
          value={formData.description}
          onChange={handleDetailChange}
          className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all resize-none"
        />
      </div>

      {/* --- SECTION 2: ATTRIBUTES --- */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-wider text-sm">
          <Sparkles size={18} /> Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDropdown("Sex/Gender", "gender", "fashionAndBeautyGender")}
          {renderDropdown("Size", "size", "fashionAndBeautySize", true)}

          <div className="w-full">
            <label className="text-sm font-bold text-blue-900 ml-1 flex items-center gap-2">
              <Palette size={14} /> Color
            </label>
            <div className="flex items-center gap-3 mt-1 bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleDetailChange}
                className="w-10 h-10 border-none bg-transparent cursor-pointer"
              />
              <span className="text-sm font-mono text-gray-500 uppercase">
                {formData.color}
              </span>
            </div>
          </div>

          {renderDropdown(
            "Material",
            "material",
            "fashionAndBeautyMaterial",
            true,
          )}
          {renderDropdown(
            "Condition",
            "condition",
            "fashionAndBeautyCondition",
          )}
          {renderDropdown("Item Type", "type", "fashionAndBeautyType", true)}
        </div>
      </div>

      {/* --- SECTION 3: FEATURES --- */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-blue-900 ml-1 uppercase tracking-tighter">
          Collection Tags
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES_LIST.map((feature) => (
            <label
              key={feature}
              className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-[10px] font-black uppercase text-center
                ${
                  formData.features.includes(feature)
                    ? "border-blue-800 bg-blue-800 text-white shadow-lg shadow-blue-100"
                    : "border-gray-100 bg-gray-50 text-gray-500 hover:border-blue-200"
                }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      {/* --- SECTION 4: PRICING & SELLER --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        {renderDropdown("Location", "location", "fashionAndBeautyLocation")}
        {renderInput(
          "Price (Rs)",
          "price",
          "number",
          formData.price,
          "Price in Rupees",
        )}
        {renderInput(
          "Seller Name",
          "sellerName",
          "text",
          formData.sellerName,
          "Your Name",
        )}
        {renderInput(
          "Contact Info",
          "sellerContact",
          "tel",
          formData.sellerContact,
          "+92 3XX XXXXXXX",
        )}
      </div>

      {/* --- SECTION 5: GALLERY --- */}
      <div className="space-y-4">
        <label className="text-sm font-black text-blue-900 uppercase tracking-tighter flex items-center gap-2">
          <Camera size={18} /> Lookbook (Max 5)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative aspect-3/4 group">
              <img
                src={URL.createObjectURL(img)}
                alt="fashion-preview"
                className="w-full h-full object-cover rounded-2xl border-2 border-blue-100 shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:rotate-90 transition-all"
              >
                <X size={14} />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 right-2 bg-blue-900/80 text-[10px] text-white text-center py-1.5 rounded-lg backdrop-blur-md font-bold uppercase">
                  Main Look
                </div>
              )}
            </div>
          ))}
          {formData.images.length < 4 && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="aspect-3/4 border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center text-blue-800 hover:bg-blue-100 transition-all group"
            >
              <Plus
                size={32}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-black uppercase mt-2">
                Add Photo
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
        className="w-full md:w-auto bg-blue-900 text-white font-black px-16 py-4 rounded-2xl shadow-2xl shadow-blue-100 hover:bg-blue-800 hover:-translate-y-1 transition-all disabled:opacity-50"
      >
        {loading ? "Posting Your Style..." : "Submit Fashion Ad"}
      </button>
    </form>
  );
}

export default FashionAndBeautyCategory;
