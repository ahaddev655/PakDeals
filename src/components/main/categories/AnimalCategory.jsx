import { ChevronDown, Plus, X, Camera, Info } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AnimalCategory({ openDropdown, setOpenDropdown, addAd_data }) {
  const DEFAULT_FILTER = (label) => ({ id: "", label });
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    type: DEFAULT_FILTER("Select Type"),
    sex: DEFAULT_FILTER("Select Sex"),
    vaccinationStatus: DEFAULT_FILTER("Select Vaccination Status"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    breed: "",
    age: "",
    color: "#1e40af",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const FEATURES_LIST = [
    "Trained",
    "Friendly",
    "Playful",
    "Healthy",
    "Pure Breed",
    "Registered",
    "Microchipped",
    "Neutered/Spayed",
    "Good with Kids",
    "Good with Other Pets",
    "Show Quality",
    "Farm Raised",
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
    setFormData((prev) => {
      const updatedImages = [...prev.images, ...files].slice(0, 4);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.adTitle || !formData.price || !formData.sellerContact) {
      toast.error("Please fill in the required fields");
      return;
    }

    setLoading(true);
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => form.append("images", image));
      } else if (typeof formData[key] === "object" && formData[key].label) {
        form.append(key, formData[key].label);
      } else if (key === "features") {
        form.append(key, formData.features.join(", "));
      } else {
        form.append(key, formData[key]);
      }
    });

    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/ads/add-animal-ad/${userId}`,
        form,
      )
      .then((res) => {
        toast.success(res?.data?.message || "Ad Posted Successfully!");
        localStorage.setItem("table_name", "animal_ads");
        localStorage.setItem("ad_id", res?.data?.ad_id);
        setTimeout(() => {
          navigate("/pricing");
        }, 2000);
      })
      .catch((err) =>
        toast.error(err?.response?.data?.error || "Submission failed"),
      )
      .finally(() => setLoading(false));
  };

  // ==================== UI COMPONENTS ====================
  const renderDropdown = (label, key, dataKey) => (
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
        <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          {(addAd_data.animal.find((i) => i[dataKey])?.[dataKey] || []).map(
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

      {/* --- Section 1: Basic Info --- */}
      <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-wider text-sm">
          <Info size={18} /> Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDropdown("Sub Category", "subCategory", "animalSubCategories")}
          {renderInput(
            "Ad Title",
            "adTitle",
            "text",
            formData.adTitle,
            "e.g. Persian Cat for Sale",
          )}
        </div>
        <div className="w-full">
          <label className="text-sm font-bold text-blue-900 ml-1">
            Detailed Description
          </label>
          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe the animal's health, behavior, and history..."
            className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 mt-1 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all resize-none"
          />
        </div>
      </div>

      {/* --- Section 2: Animal Specifications --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderDropdown("Animal Species", "type", "animalType")}
        {renderInput("Breed", "breed", "text", formData.breed, "e.g. Siamese")}
        {renderDropdown("Sex", "sex", "animalSex")}
        {renderInput("Age", "age", "text", formData.age, "e.g. 2 Years")}

        <div className="w-full">
          <label className="text-sm font-bold text-blue-900 ml-1">
            Color Theme
          </label>
          <div className="flex items-center gap-3 mt-1">
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleDetailChange}
              className="w-14 h-14 p-1 rounded-xl bg-gray-50 border-2 border-gray-100 cursor-pointer"
            />
            <span className="text-gray-500 text-sm font-mono uppercase font-bold">
              {formData.color}
            </span>
          </div>
        </div>
        {renderDropdown(
          "Vaccination",
          "vaccinationStatus",
          "animalVaccinationStatus",
        )}
      </div>

      {/* --- Section 3: Features --- */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-blue-900 ml-1">
          Key Features & Temperament
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES_LIST.map((feature) => (
            <label
              key={feature}
              className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-xs font-bold
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

      {/* --- Section 4: Pricing & Contact --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        {renderDropdown("Location", "location", "animalLocation")}
        {renderInput(
          "Asking Price (Rs)",
          "price",
          "number",
          formData.price,
          "5000",
        )}
        {renderInput(
          "Seller Name",
          "sellerName",
          "text",
          formData.sellerName,
          "Full Name",
        )}
        {renderInput(
          "Contact Number",
          "sellerContact",
          "tel",
          formData.sellerContact,
          "+92 XXX XXXXXXX",
        )}
      </div>

      {/* --- Section 5: Media Upload --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-black text-blue-900 uppercase tracking-tighter flex items-center gap-2">
            <Camera size={18} /> Media Upload (Max 5)
          </label>
          <span className="text-xs font-bold text-gray-400">
            {formData.images.length}/5 Images
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <X size={16} />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 right-2 bg-blue-900/80 text-[10px] text-white text-center py-1 rounded-lg backdrop-blur-sm font-bold uppercase">
                  Thumbnail
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
                className="group-hover:rotate-90 transition-transform"
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

      {/* --- Final Submit --- */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-blue-900 text-white font-black px-12 py-4 rounded-2xl shadow-2xl shadow-blue-200 hover:bg-blue-800 hover:-translate-y-1 transition-all disabled:opacity-50"
        >
          {loading ? "Processing Your Ad..." : "Publish Animal Advertisement"}
        </button>
      </div>
    </form>
  );
}

export default AnimalCategory;
