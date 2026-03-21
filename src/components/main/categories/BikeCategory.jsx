import axios from "axios";
import {
  ChevronDown,
  Plus,
  X,
  Bike,
  Camera,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function BikeCategory({ openDropdown, setOpenDropdown, addAd_data }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const DEFAULT_FILTER = (label) => ({ id: "", label });
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    make: DEFAULT_FILTER("Select Make"),
    engineType: DEFAULT_FILTER("Select Engine Type"),
    engineCapacity: DEFAULT_FILTER("Select Engine Capacity"),
    ignitionType: DEFAULT_FILTER("Select Ignition Type"),
    origin: DEFAULT_FILTER("Select Origin"),
    condition: DEFAULT_FILTER("Select Condition"),
    registrationCity: DEFAULT_FILTER("Select Registration City"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    model: "",
    year: "",
    kmDriven: "",
    images: [],
  });

  const FEATURES_LIST = [
    "Disc Brakes",
    "Alloy Rims",
    "Digital Meter",
    "LED Lights",
    "USB Charging Port",
    "Anti-Theft Alarm",
    "Fuel Gauge",
    "Speedometer",
    "Side Mirrors",
    "Tool Kit",
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
    // Append logic similar to AnimalCategory
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
        `https://pak-deals-backend.vercel.app/api/ads/add-bike-ad/${userId}`,
        form,
      )
      .then((res) => {
        toast.success(res?.data?.message || "Bike Ad Posted!");
        localStorage.setItem("table_name", "bikes_ads");
        localStorage.setItem("ad_id", res?.data?.ad_id);
        setTimeout(() => {
          navigate("/pricing");
        }, 2000);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.error || "Error posting ad"),
      )
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
          {(addAd_data.bike.find((i) => i[dataKey])?.[dataKey] || []).map(
            (item) => (
              <div
                key={item.id}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium transition-colors border-b last:border-0 border-gray-50"
                onClick={() => handleSelect(key, item)}
              >
                {item.text}
              </div>
            ),
          )}
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

      {/* SECTION 1: IDENTITY */}
      <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-wider text-sm">
          <Bike size={18} /> Basic Bike Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDropdown("Sub Category", "subCategory", "bikeSubCategories")}
          {renderDropdown("Brand / Make", "make", "bikeMake", true)}
        </div>
        {renderInput(
          "Ad Title",
          "adTitle",
          "text",
          formData.adTitle,
          "e.g. Honda CD 70 2023 for sale",
        )}
        <textarea
          rows={4}
          placeholder="Describe the condition, maintenance history, etc."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all resize-none"
        />
      </div>

      {/* SECTION 2: TECHNICAL SPECS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput(
          "Model Name",
          "model",
          "text",
          formData.model,
          "e.g. CG125",
        )}
        {renderInput("Year", "year", "number", formData.year, "2024")}
        {renderDropdown("Engine Type", "engineType", "bikeEngineType")}
        {renderDropdown(
          "Engine Capacity",
          "engineCapacity",
          "bikeEngineCapacity",
        )}
        {renderInput(
          "KM's Driven",
          "kmDriven",
          "number",
          formData.kmDriven,
          "15000",
        )}
        {renderDropdown("Ignition Type", "ignitionType", "bikeIgnitionType")}
      </div>

      {/* SECTION 3: CONDITION & REGISTRATION */}
      <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderDropdown("Origin", "origin", "bikeOrigin")}
        {renderDropdown("Condition", "condition", "bikeCondition")}
        {renderDropdown(
          "Registration City",
          "registrationCity",
          "bikeRegistrationCity",
          true,
        )}
      </div>

      {/* SECTION 4: FEATURES */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-blue-900 ml-1 flex items-center gap-2">
          <ClipboardList size={18} /> Bike Features
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {FEATURES_LIST.map((feature) => (
            <label
              key={feature}
              className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-[10px] font-black uppercase tracking-tight
                ${
                  formData.features.includes(feature)
                    ? "border-blue-800 bg-blue-800 text-white shadow-lg shadow-blue-200"
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

      {/* SECTION 5: PRICING & LOCATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        {renderDropdown("Location", "location", "bikeLocation")}
        {renderInput(
          "Asking Price (Rs)",
          "price",
          "number",
          formData.price,
          "Price in Rs",
        )}
        {renderInput(
          "Seller Name",
          "sellerName",
          "text",
          formData.sellerName,
          "Full Name",
        )}
        {renderInput(
          "Contact",
          "sellerContact",
          "tel",
          formData.sellerContact,
          "+92 3XX XXXXXXX",
        )}
      </div>

      {/* SECTION 6: MEDIA */}
      <div className="space-y-4">
        <label className="text-sm font-black text-blue-900 uppercase tracking-tighter flex items-center gap-2">
          <Camera size={18} /> Upload Photos (Up to 5)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square group">
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-full h-full object-cover rounded-2xl border-2 border-blue-100"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
              >
                <X size={16} />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 right-2 bg-blue-900/80 text-[10px] text-white text-center py-1 rounded-lg backdrop-blur-sm font-bold">
                  Main Photo
                </div>
              )}
            </div>
          ))}
          {formData.images.length < 4 && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="aspect-square border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center text-blue-800 hover:bg-blue-100 transition-all"
            >
              <Plus size={32} />
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
        className="w-full md:w-auto bg-blue-900 text-white font-black px-12 py-4 rounded-2xl shadow-2xl shadow-blue-200 hover:bg-blue-800 hover:-translate-y-1 transition-all disabled:opacity-50"
      >
        {loading ? "Posting Ad..." : "Publish Bike Advertisement"}
      </button>
    </form>
  );
}

export default BikeCategory;
