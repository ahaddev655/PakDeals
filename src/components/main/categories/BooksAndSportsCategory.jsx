import {
  ChevronDown,
  Plus,
  X,
  BookOpen,
  Camera,
  MapPin,
  Tag,
} from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function BooksAndSportsCategory({ openDropdown, setOpenDropdown, addAd_data }) {
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const DEFAULT_FILTER = (label) => ({ id: "", label });

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    itemType: DEFAULT_FILTER("Select Item Type"),
    language: DEFAULT_FILTER("Select Language"),
    format: DEFAULT_FILTER("Select Format"),
    condition: DEFAULT_FILTER("Select Condition"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    genre: "",
    author: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    images: [],
  });

  const FEATURES_LIST = [
    "Original",
    "Reprint",
    "Limited Edition",
    "Signed Copy",
    "Hardcover",
    "Includes Accessories",
    "Water Resistant",
    "Portable",
    "Professional Grade",
    "Beginner Friendly",
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
      images: [...prev.images, ...files].slice(0, 5),
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
        `https://pak-deals-backend.vercel.app/api/ads/add-book-ad/${userId}`,
        form,
      )
      .then((res) => {
        toast.success(res?.data?.message || "Ad Published!");
        // Reset logic...
      })
      .catch((err) => toast.error("Submission failed"))
      .finally(() => setLoading(false));
  };

  // ==================== UI COMPONENTS ====================
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
        <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          {(
            addAd_data.booksAndSports.find((i) => i[dataKey])?.[dataKey] || []
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

      {/* --- SECTION 1: CORE DETAILS --- */}
      <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase tracking-wider text-sm">
          <BookOpen size={18} /> Ad Fundamentals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderDropdown(
            "Sub Category",
            "subCategory",
            "booksAndSportsSubCategories",
          )}
          {renderInput(
            "Ad Title",
            "adTitle",
            "text",
            formData.adTitle,
            "e.g. Rare First Edition - Harry Potter",
          )}
        </div>
        <textarea
          rows={5}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe the condition, history, or specific details of the item..."
          className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all resize-none"
        />
      </div>

      {/* --- SECTION 2: SPECIFICATIONS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderDropdown("Item Type", "itemType", "booksAndSportsType", true)}
        {renderInput(
          "Genre / Category",
          "genre",
          "text",
          formData.genre,
          "e.g. Fiction, Cricket, Gym",
        )}
        {renderInput(
          "Author / Brand",
          "author",
          "text",
          formData.author,
          "e.g. J.K. Rowling or Adidas",
        )}
        {renderDropdown("Condition", "condition", "booksAndSportsCondition")}
        {renderDropdown("Language", "language", "booksAndSportsLanguage")}
        {renderDropdown("Format / Size", "format", "booksAndSportsFormat")}
      </div>

      {/* --- SECTION 3: FEATURES --- */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-blue-900 ml-1 flex items-center gap-2">
          <Tag size={16} /> Key Features
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {FEATURES_LIST.map((feature) => (
            <label
              key={feature}
              className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer text-[10px] font-black uppercase text-center
                ${
                  formData.features.includes(feature)
                    ? "border-blue-800 bg-blue-800 text-white shadow-lg"
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

      {/* --- SECTION 4: LOCATION & CONTACT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
        {renderDropdown("Location", "location", "booksAndSportsLocation")}
        {renderInput(
          "Price (PKR)",
          "price",
          "number",
          formData.price,
          "Asking price...",
        )}
        {renderInput(
          "Seller Name",
          "sellerName",
          "text",
          formData.sellerName,
          "Your name",
        )}
        {renderInput(
          "Contact Info",
          "sellerContact",
          "tel",
          formData.sellerContact,
          "+92 3XXXXXXXXX",
        )}
      </div>

      {/* --- SECTION 5: IMAGES --- */}
      <div className="space-y-4">
        <label className="text-sm font-black text-blue-900 uppercase tracking-tighter flex items-center gap-2">
          <Camera size={18} /> Media Gallery (Max 5)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square group">
              <img
                src={URL.createObjectURL(img)}
                alt="upload"
                className="w-full h-full object-cover rounded-2xl border-2 border-blue-100 shadow-sm"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <X size={14} />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 right-2 bg-blue-900/80 text-[10px] text-white text-center py-1 rounded-lg backdrop-blur-sm font-bold uppercase">
                  Cover
                </div>
              )}
            </div>
          ))}
          {formData.images.length < 5 && (
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
                Add Media
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
        className="w-full md:w-auto bg-blue-900 text-white font-black px-14 py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-800 hover:-translate-y-1 transition-all disabled:opacity-50"
      >
        {loading ? "Publishing Ad..." : "Submit Books & Sports Ad"}
      </button>
    </form>
  );
}

export default BooksAndSportsCategory;
