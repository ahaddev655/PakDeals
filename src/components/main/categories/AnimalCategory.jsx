import { ChevronDown, Plus, X } from "lucide-react";
import { useState, useRef } from "react";

function AnimalCategory({ openDropdown, setOpenDropdown, addAd_data }) {
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

  const DEFAULT_FILTER = (label) => ({ id: "", label });

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
    color: "",
    images: [],
  });

  const fileInputRef = useRef(null);

  const handleDetailChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      category: "animals",
      ...formData,
      subCategory: formData.subCategory?.label || "",
      type: formData.type?.label || "",
      sex: formData.sex?.label || "",
      vaccinationStatus: formData.vaccinationStatus?.label || "",
      location: formData.location?.label || "",
      features: JSON.stringify(formData.features),
    };
    console.log("ANIMALS FORM SUBMITTED:", payload);

    setFormData({
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
      color: "",
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
          {(addAd_data.animal.find((i) => i[dataKey])?.[dataKey] || []).map(
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

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Sub Category", "subCategory", "animalSubCategories")}
          {renderInput("Ad Title", "adTitle", "text", formData.adTitle)}
        </div>

        <div className="w-full">
          <label className="font-semibold text-slate-600">Description</label>
          <textarea
            type="text"
            className="w-full border-2 border-gray-300 resize-none rounded-lg px-3 py-2 mt-1 focus:border-blue-800 focus:ring-2 focus:ring-blue-800 transition-colors ease-in-out duration-300"
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Type Of Animal", "type", "animalType")}
          {renderInput("Breed", "breed", "text", formData.breed)}
        </div>

        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Sex", "sex", "animalSex")}
          {renderInput("Age", "age", "number", formData.age)}
        </div>

        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderInput("Color", "color", "text", formData.color)}
          {renderDropdown(
            "Vaccination Status",
            "vaccinationStatus",
            "animalVaccinationStatus",
          )}
        </div>

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
                  name={feature}
                  value={feature}
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="w-5 h-5 appearance-none border-2 focus:border-[#3a4fc4] border-gray-300 rounded-sm checked:bg-[#3a4fc4] checked:border-[#3a4fc4] checked:shadow-[inset_0_0_0_2px_white] focus:ring-2 focus:ring-[#3a4fc4]/30 focus:outline-none cursor-pointer"
                />
                <span className="font-medium text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sm:flex gap-6 items-center sm:space-y-0 space-y-4">
          {renderDropdown("Location", "location", "animalLocation")}
          {renderInput("Price", "price", "number", formData.price)}
        </div>

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

      <button
        type="submit"
        className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
        transition-all duration-300 font-medium rounded-lg"
      >
        Submit Animals Ad
      </button>
    </form>
  );
}

export default AnimalCategory;
