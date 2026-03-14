import { Eye, EyeOff } from "lucide-react"; // Note: EyeOff is the standard Lucide replacement for EyeClosed
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    axios
      .post("https://pak-deals-backend.vercel.app/api/auth/login", formData)
      .then((response) => {
        const user = response.data.user;
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.id);
        localStorage.setItem("role", user.role);
        toast.success(response?.data?.message || "Login Successful");

        setTimeout(() => {
          navigate("/user-dashboard/");
        }, 2000);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.error || "Login failed. Please try again.",
        );
      })
      .finally(() => setLoading(false));
  };

  // ==================== GOOGLE LOGIN LOGIC (Exact Same) ====================
  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`,
        )
        .then((googleRes) => {
          const googleData = { email: googleRes.data.email || "" };

          axios
            .post(
              "https://pak-deals-backend.vercel.app/api/auth/google-login",
              googleData,
            )
            .then((response) => {
              const user = response.data.user;
              localStorage.setItem("token", user.token);
              localStorage.setItem("id", user.id);
              localStorage.setItem("role", user.role);
              toast.success("Google Login Successful!");
              setTimeout(() => navigate("/user-dashboard/"), 2000);
            })
            .catch((error) => toast.error("Google sync failed."));
        })
        .catch(() => toast.error("Google data fetch failed"));
    },
    onError: () => toast.error("Google Sign-In Failed"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />

      {/* Card Structure: Maintained border-2 border-blue-800 */}
      <div className="w-full max-w-md bg-white border-2 border-blue-800 rounded-2xl shadow-2xl p-8 transform transition-all duration-300">
        {/* Heading: Kept the PakDeals Branding */}
        <div className="text-center mb-8">
          <h2 className="text-blue-800 text-4xl font-black font-montserrat tracking-tighter">
            PakDeals<span className="text-orange-500">.</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* EMAIL INPUT */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-bold text-blue-900 ml-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@company.com"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-1 relative">
            <label
              htmlFor="password"
              className="text-sm font-bold text-blue-900 ml-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
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

          {/* SUBMIT BUTTON: Kept your hover logic */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-900 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Login to Account"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 py-2">
            <div className="h-px w-full bg-gray-200"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              OR
            </span>
            <div className="h-px w-full bg-gray-200"></div>
          </div>

          {/* GOOGLE BUTTON: Refined to look cleaner */}
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
            <span className="text-gray-700 font-bold">
              Continue with Google
            </span>
          </button>

          {/* SIGNUP LINK */}
          <p className="text-center text-gray-500 font-medium text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-800 font-bold hover:underline decoration-2 underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
