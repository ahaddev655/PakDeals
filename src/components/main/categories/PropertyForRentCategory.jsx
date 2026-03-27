import {
  ChevronDown,
  Plus,
  X,
  Home,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Camera,
  User,
  CheckCircle2,
} from "lucide-react";
import { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

// --- REUSABLE COMPONENTS ---
const FormInput = ({ label, icon: Icon, ...props }) => (
  <div className="w-full">
    <label className="text-sm font-bold text-blue-900 ml-1 flex items-center gap-1">
      {Icon && <Icon size={14} />} {label}
    </label>
    <input
      {...props}
      className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 mt-1 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
    />
  </div>
);

const FormDropdown = ({
  label,
  id,
  dataKey,
  icon: Icon,
  openDropdown,
  setOpenDropdown,
  formData,
  onSelect,
  data,
}) => {
  const isOpen = openDropdown === id;
  const items = data.propertyForRent.find((i) => i[dataKey])?.[dataKey] || [];

  return (
    <div className="w-full relative">
      <label className="text-sm font-bold text-blue-900 ml-1 flex items-center gap-1">
        {Icon && <Icon size={14} />} {label}
      </label>
      <button
        type="button"
        onClick={() => setOpenDropdown(isOpen ? "" : id)}
        className={`w-full flex justify-between items-center mt-1 py-3 px-4 border-2 rounded-xl transition-all ${
          isOpen
            ? "border-blue-800 ring-4 ring-blue-50 bg-white"
            : "border-gray-100 bg-gray-50"
        } ${formData[id]?.id ? "text-gray-900 font-semibold" : "text-gray-400"}`}
      >
        {formData[id]?.label}
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-30 top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl max-h-60 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium border-b last:border-0 border-gray-50"
              onClick={() => onSelect(id, item)}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function PropertyForRentCategory({
  openDropdown,
  setOpenDropdown,
  addAd_data,
}) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const FEATURES_LIST = [
    "Electricity Backup",
    "Water Disposal",
    "Sewerage",
    "Water Supply",
    "Broadband Internet",
    "Satellite/TV Ready",
    "Intercom",
    "Lawn",
    "Balcony",
    "Parking Space",
    "Swimming Pool",
    "Gym",
    "Kids Play Area",
    "Mosque",
    "Community Center",
    "Security Staff",
  ];

  const DEFAULT_FILTER = (label) => ({ id: "", label });

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    areaUnit: DEFAULT_FILTER("Select Area Unit"),
    areaSize: "",
    furnishedStatus: DEFAULT_FILTER("Select Furnished Status"),
    bedrooms: DEFAULT_FILTER("Select Bedrooms"),
    bathrooms: DEFAULT_FILTER("Select Bathrooms"),
    numberOfStoreys: DEFAULT_FILTER("Select No. of Storeys"),
    constructionState: DEFAULT_FILTER("Select Construction State"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    features: [],
    images: [],
  });

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "sellerContact" && value.length > 13) return;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSelect = (key, item) => {
    setFormData((p) => ({ ...p, [key]: { id: item.id, label: item.text } }));
    setOpenDropdown("");
  };

  const handleFeatureToggle = (feature) => {
    setFormData((p) => ({
      ...p,
      features: p.features.includes(feature)
        ? p.features.filter((f) => f !== feature)
        : [...p.features, feature],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((p) => ({ ...p, images: [...p.images, ...files].slice(0, 4) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((img) => form.append("images", img));
      } else if (key === "features") {
        form.append(key, formData.features.join(", "));
      } else {
        form.append(key, formData[key]?.label || formData[key]);
      }
    });

    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/ads/add-property-rent-ad/${userId}`,
        form,
      )
      .then((res) => {
        toast.success(res?.data?.message || "Listing published!");
        localStorage.setItem("table_name", "property_rent_ads");
        localStorage.setItem("ad_id", res?.data?.ad_id);
        setTimeout(() => {
          navigate("/pricing");
        }, 2000);
      })
      .catch((error) => {
        console.error("Submission error:", error);
        toast.error("Submission failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="space-y-8 bg-white p-2" onSubmit={handleSubmit}>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        theme="dark"
      />

      {/* --- BASICS --- */}
      <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100 space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase text-sm">
          <Home size={18} /> Property Basics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormDropdown
            label="Sub Category"
            id="subCategory"
            dataKey="propertyRentSubCategories"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            formData={formData}
            onSelect={handleSelect}
            data={addAd_data}
          />
          <FormInput
            label="Listing Title"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleInputChange}
            placeholder="e.g. Luxury 2-Bed Apartment"
          />
        </div>
        <textarea
          rows={4}
          name="description"
          placeholder="Describe rental terms..."
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all resize-none"
        />
      </div>

      {/* --- SPECS --- */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-blue-900 font-black uppercase text-sm">
          <Maximize size={18} /> Dimensions & Build
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormDropdown
            label="Bedrooms"
            id="bedrooms"
            dataKey="propertyRentBedrooms"
            icon={Bed}
            {...{
              openDropdown,
              setOpenDropdown,
              formData,
              data: addAd_data,
              onSelect: handleSelect,
            }}
          />
          <FormDropdown
            label="Bathrooms"
            id="bathrooms"
            dataKey="propertyRentBathrooms"
            icon={Bath}
            {...{
              openDropdown,
              setOpenDropdown,
              formData,
              data: addAd_data,
              onSelect: handleSelect,
            }}
          />
          <FormDropdown
            label="Furnished"
            id="furnishedStatus"
            dataKey="propertyRentFurnishedStatus"
            {...{
              openDropdown,
              setOpenDropdown,
              formData,
              data: addAd_data,
              onSelect: handleSelect,
            }}
          />
          <FormDropdown
            label="No. of Storeys"
            id="numberOfStoreys"
            dataKey="propertyRentStoreys"
            {...{
              openDropdown,
              setOpenDropdown,
              formData,
              data: addAd_data,
              onSelect: handleSelect,
            }}
          />
          <FormDropdown
            label="Construction"
            id="constructionState"
            dataKey="propertyRentConstructionStatus"
            {...{
              openDropdown,
              setOpenDropdown,
              formData,
              data: addAd_data,
              onSelect: handleSelect,
            }}
          />
          <FormDropdown
            label="Area Unit"
            id="areaUnit"
            dataKey="propertyRentAreaUnit"
            {...{
              openDropdown,
              setOpenDropdown,
              formData,
              data: addAd_data,
              onSelect: handleSelect,
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Area Size"
            name="areaSize"
            value={formData.areaSize}
            onChange={handleInputChange}
            placeholder="Total area"
            icon={Maximize}
          />
          <FormInput
            label="Rent / Month"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Rs / Monthly"
          />
        </div>
      </div>

      {/* --- AMENITIES --- */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-blue-900 uppercase">
          Facilities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FEATURES_LIST.map((f) => (
            <label
              key={f}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer text-[11px] font-bold transition-all ${formData.features.includes(f) ? "border-blue-800 bg-blue-800 text-white shadow-md" : "border-gray-100 bg-gray-50 text-gray-500 hover:border-blue-200"}`}
            >
              <input
                type="checkbox"
                className="hidden"
                onChange={() => handleFeatureToggle(f)}
              />
              {formData.features.includes(f) && <CheckCircle2 size={12} />} {f}
            </label>
          ))}
        </div>
      </div>

      {/* --- CONTACT & GALLERY --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div className="md:col-span-2">
          <FormDropdown
            label="Location"
            id="location"
            dataKey="propertyRentLocation"
            icon={MapPin}
            {...{
              openDropdown,
              setOpenDropdown,
              formData,
              data: addAd_data,
              onSelect: handleSelect,
            }}
          />
        </div>
        <FormInput
          label="Name"
          name="sellerName"
          value={formData.sellerName}
          onChange={handleInputChange}
          icon={User}
        />
        <FormInput
          label="Contact"
          name="sellerContact"
          type="tel"
          value={formData.sellerContact}
          onChange={handleInputChange}
          placeholder="+92..."
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-black text-blue-900 uppercase flex items-center gap-2">
          <Camera size={18} /> Photos
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images.map((img, idx) => (
            <div key={idx} className="relative aspect-square">
              <img
                src={URL.createObjectURL(img)}
                alt="prop"
                className="w-full h-full object-cover rounded-2xl border-2 border-blue-100"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((p) => ({
                    ...p,
                    images: p.images.filter((_, i) => i !== idx),
                  }))
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg"
              >
                <X size={14} />
              </button>
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 right-2 bg-blue-900/80 text-[10px] text-white text-center py-1 rounded-lg backdrop-blur-md">
                  Cover
                </div>
              )}
            </div>
          ))}
          {formData.images.length < 4 && (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="aspect-square border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center text-blue-800 hover:bg-blue-100"
            >
              <Plus size={32} />{" "}
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
        className="w-full md:w-auto bg-blue-900 text-white font-black px-16 py-4 rounded-2xl shadow-2xl hover:bg-blue-800 transition-all disabled:opacity-50"
      >
        {loading ? "Listing..." : "Post Property Ad"}
      </button>
    </form>
  );
}

export default PropertyForRentCategory;
