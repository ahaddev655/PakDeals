import axios from "axios";
import { ChevronDown, Plus, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

function MotorsCategory({ openDropdown, setOpenDropdown, addAd_data }) {
  const FEATURES_LIST = [
    "ABS",
    "Airbags",
    "Premium Wheels",
    "AM/FM Radio",
    "Air Conditioning",
    "Power Steering",
    "Power Windows",
    "Keyless Entry",
    "Navigation System",
    "Sunroof",
    "Leather Seats",
    "Rear Camera",
  ];
  const DEFAULT_FILTER = (label) => ({ id: "", label });
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subCategory: DEFAULT_FILTER("Select Sub Category"),
    make: DEFAULT_FILTER("Select Make"),
    condition: DEFAULT_FILTER("Select Condition"),
    bodyFuel: DEFAULT_FILTER("Select Fuel"),
    transmission: DEFAULT_FILTER("Select Transmission"),
    bodyType: DEFAULT_FILTER("Select Body Type"),
    documentStatus: DEFAULT_FILTER("Select Document Status"),
    assembly: DEFAULT_FILTER("Select Assembly"),
    location: DEFAULT_FILTER("Select Location"),
    adTitle: "",
    description: "",
    price: "",
    sellerName: "",
    sellerContact: "",
    carColor: "",
    carYear: "",
    owners: "",
    seats: "",
    features: [],
    images: [],
  });

  const fileInputRef = useRef(null);

  const handleDetailChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSelect = (key, item) => {
    setFormData((p) => ({ ...p, [key]: { id: item.id, label: item.text } }));
    setOpenDropdown("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();

    form.append("subCategory", formData.subCategory?.label || "");
    form.append("make", formData.make?.label || "");
    form.append("condition", formData.condition?.label || "");
    form.append("bodyFuel", formData.bodyFuel?.label || "");
    form.append("transmission", formData.transmission?.label || "");
    form.append("bodyType", formData.bodyType?.label || "");
    form.append("documentStatus", formData.documentStatus?.label || "");
    form.append("assembly", formData.assembly?.label || "");
    form.append("location", formData.location?.label || "");
    form.append("adTitle", formData.adTitle);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("sellerName", formData.sellerName);
    form.append("sellerContact", formData.sellerContact);
    form.append("carColor", formData.carColor);
    form.append("carYear", formData.carYear);
    form.append("owners", formData.owners);
    form.append("seats", formData.seats);
    form.append("features", formData.features.join(", "));

    formData.images.forEach((image) => {
      form.append("images", image);
    });
    // -------------------- API CONFIGURATION --------------------
    axios
      .post(
        `https://pak-deals-backend.vercel.app/api/ads/add-motors-ad/${userId}`,
        form,
      )
      .then((response) => {
        toast.success(response?.data?.message || "Ad Submitted...");

        setFormData({
          subCategory: DEFAULT_FILTER("Select Sub Category"),
          make: DEFAULT_FILTER("Select Make"),
          condition: DEFAULT_FILTER("Select Condition"),
          bodyFuel: DEFAULT_FILTER("Select Fuel"),
          transmission: DEFAULT_FILTER("Select Transmission"),
          bodyType: DEFAULT_FILTER("Select Body Type"),
          documentStatus: DEFAULT_FILTER("Select Document Status"),
          assembly: DEFAULT_FILTER("Select Assembly"),
          location: DEFAULT_FILTER("Select Location"),
          adTitle: "",
          description: "",
          price: "",
          sellerName: "",
          sellerContact: "",
          carColor: "",
          carYear: "",
          owners: "",
          seats: "",
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

  // ================================= REUSABLE COMPONENTS =============================
  // --------------- DROPDOWN ----------------
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
          {(addAd_data.motors.find((i) => i[dataKey])?.[dataKey] || []).map(
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

  // --------------- INPUT ---------------
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

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <ToastContainer position="top-right" autoClose={1500} theme="light" />
      <div className="space-y-4">
        {/* ====================== SUB CATEGORY & MAKE ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown(
            "Sub Category",
            "subCategory",
            "motorsSubCategories",
            true,
          )}
          {renderDropdown("Make", "make", "motorsMake", true)}
        </div>

        {/* ====================== AD TITLE ====================== */}
        {renderInput("Ad Title", "adTitle", "text", formData.adTitle)}

        {/* ====================== DESCRIPTION ====================== */}
        <div className="w-full">
          <label className="font-semibold text-slate-600">Description</label>
          <textarea
            className="w-full border-2 border-gray-300 resize-none rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2
            focus:ring-blue-800 transition-colors ease-in-out duration-300"
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* ====================== CONDITION & YEAR ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Condition", "condition", "motorsCondition")}
          {renderInput("Year", "carYear", "number", formData.carYear)}
        </div>

        {/* ====================== FUEL & TRANSMISSION ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Fuel", "bodyFuel", "motorsFuel")}
          {renderDropdown("Transmission", "transmission", "motorsTransmission")}
        </div>

        {/* ====================== BODY TYPE & COLOR ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Body Type", "bodyType", "motorsBodyType", true)}
          <div className="w-full flex flex-col">
            <label className="font-semibold text-slate-600">Color</label>
            <input
              type="color"
              name="carColor"
              className="w-25 border-2 border-gray-300 rounded-lg px-3 h-10.75 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300"
              value={formData.carColor}
              onChange={handleDetailChange}
            />
          </div>
        </div>

        {/* ====================== NUMBER OF SEATS & OWNERS ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderInput(
            "Number Of Seats",
            "seats",
            "number",
            formData.seats > 9 ? 9 : formData.seats < 1 ? 1 : formData.seats,
          )}
          {renderInput(
            "Number Of Owners",
            "owners",
            "number",
            formData.owners > 30
              ? 30
              : formData.owners < 1
                ? 1
                : formData.owners,
          )}
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
          {renderDropdown("Location", "location", "motorsLocation")}
          {renderInput("Price", "price", "number", formData.price)}
        </div>

        {/* ====================== CAR DOCUMENTS & ASSEMBLY ====================== */}
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Car Document", "documentStatus", "motorsDocuments")}
          {renderDropdown("Assembly", "assembly", "motorsAssembly")}
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
            "text",
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
      </div>

      {/* ====================== SUBMIT BUTTON ====================== */}
      <button
        type="submit"
        className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
        transition-all duration-300 font-medium rounded-lg"
      >
        {loading ? "Submitting Motors Ad..." : "Submit Motors Ad"}
      </button>
    </form>
  );
}

export default MotorsCategory;
