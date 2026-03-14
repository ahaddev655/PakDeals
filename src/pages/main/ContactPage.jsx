import React, { useState } from "react";
import { User, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      // Reset after 3 seconds
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const inputComponent = (label, name, placeholder, Icon, type = "text") => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-600 mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
          <Icon size={18} />
        </div>
        <input
          type={type}
          name={name}
          required
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full border-2 border-gray-100 rounded-xl pl-11 pr-4 py-2.5 
          outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50
          transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-400"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] bg-[radial-gradient(at_top_left,var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg shadow-blue-200 mb-4 transform -rotate-3">
            <Mail className="text-white" size={28} />
          </div>
          <h2 className="text-gray-900 text-3xl font-black tracking-tight">
            Let's Talk
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Have a question? We're here to help.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {inputComponent("Name", "name", "Full Name", User)}
          {inputComponent("Email", "email", "name@company.com", Mail, "email")}

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-600 mb-1.5 ml-1">
              Message
            </label>
            <div className="relative group">
              <div className="absolute top-3 left-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MessageSquare size={18} />
              </div>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                className="w-full border-2 border-gray-100 rounded-xl pl-11 pr-4 py-2.5 
                outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50
                transition-all duration-300 bg-gray-50/50 focus:bg-white resize-none"
                rows={4}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSent}
            className={`w-full font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 
              ${
                isSent
                  ? "bg-green-500 text-white shadow-lg shadow-green-100"
                  : "bg-gray-900 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
              }`}
          >
            {isSent ? (
              <>
                <CheckCircle2 size={20} /> Sent Successfully
              </>
            ) : isSubmitting ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Send Message <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
