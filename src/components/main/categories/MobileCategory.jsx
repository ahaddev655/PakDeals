import axios from "axios";
import { ChevronDown, Plus, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

function MobileCategory({ openDropdown, setOpenDropdown, addAd_data }) {
  const DEFAULT_FILTER = (label) => ({ id: "", label });
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    brand: DEFAULT_FILTER("Select Brand"),
    condition: DEFAULT_FILTER("Select Condition"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    images: [],
  });

  const fileInputRef = useRef(null);

  const handleDetailChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSelect = (key, item) => {
    setFormData((p) => ({
      ...p,
      [key]: { id: item.id, label: item.text },
    }));
    setOpenDropdown("");
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
    setLoading(true);

    const form = new FormData();

    form.append("subCategory", formData.subCategory?.label || "");
    form.append("brand", formData.brand);
    form.append("condition", formData.condition?.label || "");
    form.append("location", formData.location?.label || "");
    form.append("adTitle", formData.adTitle);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("sellerName", formData.sellerName);
    form.append("sellerContact", formData.sellerContact);

    formData.images.forEach((image) => {
      form.append("images", image);
    });
    // -------------------- API CONFIGURATION --------------------
    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/ads/add-mobiles-ad/${userId}`,
        form,
      )
      .then((response) => {
        toast.success(response?.data?.message || "Ad Submitted...");

        setFormData({
          subCategory: DEFAULT_FILTER("Select Sub Category"),
          brand: DEFAULT_FILTER("Select Brand"),
          condition: DEFAULT_FILTER("Select Condition"),
          location: DEFAULT_FILTER("Select Location"),
          adTitle: "",
          description: "",
          price: "",
          sellerName: "",
          sellerContact: "",
          images: [],
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <ToastContainer position="top-right" autoClose={1500} theme="light" />
      {/* ====================== SUB CATEGORY & BRAND ====================== */}
      <div className="sm:flex gap-6">
        {renderDropdown("Sub Category", "subCategory", "mobileSubCategories")}
        {renderDropdown("Brand", "brand", "mobileBrands", true)}
      </div>
      {renderInput("Ad Title", "adTitle", "text", formData.adTitle)}
      <div className="w-full">
        <label className="font-semibold text-slate-600">Description</label>
        <textarea
          name="description"
          rows={6}
          value={formData.description}
          onChange={handleDetailChange}
          className="w-full border-2 rounded-lg px-3 py-2 mt-1 border-gray-300 transition-colors duration-300 focus:ring-2 focus:ring-blue-800 resize-none"
        ></textarea>
      </div>
      {renderDropdown("Condition", "condition", "mobileCondition")}
      <div className="sm:flex gap-6">
        {renderDropdown("Location", "location", "mobileLocation")}
        {renderInput("Price", "price", "number", formData.price)}
      </div>
      <div className="sm:flex gap-6">
        {renderInput("Seller Name", "sellerName", "text", formData.sellerName)}
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
      <div>
        <p className="text-gray-700 font-medium mt-12">
          Thumbnail will be the first image...
        </p>
      </div>

      <button
        className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
        transition-all duration-300 font-medium rounded-lg"
      >
        {loading ? "Submitting Mobile Ad..." : "Submit Mobile Ad"}
      </button>
    </form>
  );
}

export default MobileCategory;
