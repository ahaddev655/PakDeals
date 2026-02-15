import React, { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const inputComponent = (label, name, placeholder, type = "text") => (
    <div className="mb-4">
      <label className="font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
      focus:border-blue-800 focus:ring-2 focus:ring-blue-800
      transition-colors ease-in-out duration-300"
      />
    </div>
  );
  return (
    <div className="page flex items-center justify-center h-screen">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 focus:border-blue-800">
        <div className="text-center">
          <h2 className="text-blue-800 text-3xl font-bold font-montserrat tracking-wide">
            Contact Us
          </h2>
        </div>
        <form className="mt-4" onSubmit={handleSubmit}>
          {inputComponent("Name", "name", "Enter Your Name")}
          {inputComponent("Email", "email", "Enter Your Email")}
          <div className="mb-4">
            <label className="font-medium text-gray-700">Message</label>
            <textarea
              type="textarea"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter Your Message"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
            focus:border-blue-800 focus:ring-2 focus:ring-blue-800
              transition-colors ease-in-out duration-300 resize-none"
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white font-medium py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
