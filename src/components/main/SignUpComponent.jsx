import { Eye, EyeOff } from "lucide-react"; // Note: EyeOff is the current Lucide standard
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

function SignUpComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // -------------------- VALIDATIONS --------------------
    if (
      !formData.firstName?.trim() ||
      !formData.email?.trim() ||
      !formData.password?.trim()
    ) {
      toast.error("Required fields (*) are missing");
      return;
    }
    if (formData.password.length < 12) {
      toast.error("Password must be at least 12 characters long");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Invalid email address");
      return;
    }

    setLoading(true);
    axios
      .post("https://pak-deals-backend.vercel.app/api/auth/register", formData)
      .then((response) => {
        const user = response.data;
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.id);
        toast.success(response?.data?.message || "Account Created!");

        setTimeout(() => navigate("/user-dashboard/"), 2000);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Registration failed");
      })
      .finally(() => setLoading(false));
  };

  // ==================== GOOGLE REGISTRATION (Exact Same Logic) ====================
  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`,
        )
        .then((googleRes) => {
          const googleData = {
            firstName: googleRes.data.given_name || "",
            lastName: googleRes.data.family_name || "",
            email: googleRes.data.email || "",
            password: "dummy_google_password_encrypted_and_AAAA",
          };

          axios
            .post(
              "https://pak-deals-backend.vercel.app/api/auth/google-register",
              googleData,
            )
            .then((response) => {
              const user = response.data;
              localStorage.setItem("token", user.token);
              localStorage.setItem("id", user.id);
              localStorage.setItem("role", user.role);
              toast.success("Google Registration Successful!");
              setTimeout(() => navigate("/user-dashboard/"), 2000);
            })
            .catch((error) =>
              toast.error(error?.response?.data?.error || "Google sync failed"),
            );
        });
    },
    onError: () => toast.error("Google Sign-In Failed"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        theme="dark"
      />

      <div className="w-full max-w-lg bg-white border-2 border-blue-800 rounded-2xl shadow-2xl p-8 transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-blue-800 text-4xl font-black font-montserrat tracking-tighter">
            PakDeals<span className="text-orange-500">.</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Join the community of buyers and sellers
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* FIRSTNAME */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-blue-900 ml-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
            </div>
            {/* LASTNAME */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-blue-900 ml-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-blue-900 ml-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1 relative">
            <label className="text-sm font-bold text-blue-900 ml-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="At least 12 characters"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-800 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-900 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 mt-2"
          >
            {loading ? "Creating Account..." : "Create Free Account"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px w-full bg-gray-200"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              OR
            </span>
            <div className="h-px w-full bg-gray-200"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            onClick={() => handleGoogleSubmit()}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 bg-gray-50 hover:bg-gray-100 py-3 rounded-xl transition-all duration-200 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-gray-700 font-bold">Sign up with Google</span>
          </button>

          <p className="text-center text-gray-500 font-medium text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-800 font-bold hover:underline decoration-2 underline-offset-4"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpComponent;
