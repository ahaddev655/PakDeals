import { ChevronDown, Plus, X } from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function BooksAndSportsCategory({ openDropdown, setOpenDropdown, addAd_data }) {
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const FEATURES_LIST = [
    "Original",
    "Reprint",
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

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();

    form.append("subCategory", formData.subCategory?.label || "");
    form.append("itemType", formData.itemType?.label || "");
    form.append("language", formData.language?.label || "");
    form.append("format", formData.format?.label || "");
    form.append("condition", formData.condition?.label || "");
    form.append("location", formData.location?.label || "");
    form.append("adTitle", formData.adTitle);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("genre", formData.genre);
    form.append("author", formData.author);
    form.append("sellerName", formData.sellerName);
    form.append("sellerContact", formData.sellerContact);
    form.append("features", formData.features.join(", "));

    formData.images.forEach((image) => {
      form.append("images", image);
    });
    // -------------------- API CONFIGURATION --------------------
    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/ads/add-book-ad/${userId}`,
        form,
      )
      .then((response) => {
        toast.success(response?.data?.message || "Ad Submitted...");

        setFormData({
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
      })
      .catch((error) => {
        toast.error(error?.response?.error || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
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
            addAd_data.booksAndSports.find((i) => i[dataKey])?.[dataKey] || []
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
      <ToastContainer position="top-right" autoClose={1500} theme="light" />
      <div className="space-y-4">
        {/* ====================== SUB CATEGORY & AD TITLE ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown(
            "Sub Category",
            "subCategory",
            "booksAndSportsSubCategories",
          )}

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

        {/* ====================== ITEM TYPE & GENRE/CATEGORY ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Item Type", "itemType", "booksAndSportsType", true)}
          {renderInput(
            "Genre/Category (For Books)",
            "genre",
            "text",
            formData.genre,
          )}
        </div>

        {/* ====================== AUTHOR/ARTIST/BRAND & CONDITION ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderInput(
            "Author/Artist/Brand",
            "author",
            "text",
            formData.author,
          )}
          {renderDropdown("Condition", "condition", "booksAndSportsCondition")}
        </div>

        {/* ====================== LANGUAGE & FORMAT ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown(
            "Language (For Books)",
            "language",
            "booksAndSportsLanguage",
          )}
          {renderDropdown("Format", "format", "booksAndSportsFormat")}
        </div>

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
          {renderDropdown("Location", "location", "booksAndSportsLocation")}
          {renderInput("Price", "price", "number", formData.price)}
        </div>

        {/* ====================== SELLER NAME & CONTACT ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderInput(
            "Seller Name",
            "sellerName",
            "text",
            formData.sellerName,
          )}
          {renderInput(
            "Seller Contact",
            "sellerContact",
            "tel",
            formData.sellerContact,
          )}
        </div>

        {/* ====================== IMAGE UPLOAD ====================== */}
        <div className="flex gap-2">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative w-[25%]">
              <div className="border border-gray-300 rounded-md rounded-t-lg p-1">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`upload-${idx}`}
                  className="object-cover w-full h-full rounded-t-lg"
                />
                <div className="p-2 rounded-b-md text-center">
                  <h1 className="font-medium text-gray-700">{img.name}</h1>
                </div>
                <div
                  className="absolute top-3 right-3 p-1 cursor-pointer bg-white rounded-full"
                  onClick={() => removeImage(idx)}
                >
                  <X size={16} />
                </div>
              </div>
            </div>
          ))}

          {formData.images.length < 5 && (
            <div
              className="w-[25%] h-42.25 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer text-blue-800 group"
              onClick={() => fileInputRef.current.click()}
            >
              <Plus
                size={34}
                className="group-hover:rotate-180 transition-transform duration-300 ease-in-out"
              />
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
      <div>
        <p className="text-gray-700 font-medium mt-12">
          Thumbnail will be the first image...
        </p>
      </div>

      {/* ====================== SUBMIT BUTTON ====================== */}
      <button
        type="submit"
        className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
        transition-all duration-300 font-medium rounded-lg"
      >
        {loading ? "Submitting Books Ad..." : "Submit Books Ad"}
      </button>
    </form>
  );
}

export default BooksAndSportsCategory;
