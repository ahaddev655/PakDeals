import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

function SignUpComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [googleFormData, setGoogleFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // ==================== HANDLE INPUTS ====================

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ==================== FORMS SUBMISSION ====================

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // -------------------- CONDITIONAL VALIDITIONS --------------------
    if (
      !formData.firstName &&
      !formData.lastName &&
      !formData.email &&
      !formData.password
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!formData.firstName?.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!formData.email?.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password?.trim()) {
      toast.error("Password is required");
      return;
    }
    if (formData.password.length < 12) {
      toast.error("The password should be atleast 12 characters long");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Email is invalid");
      return;
    }
    // -------------------- INSERT USER API --------------------
    axios
      .post("https://pak-deals-backend.vercel.app/api/auth/register", formData)
      .then((response) => {
        const user = response.data;
        localStorage.setItem("token", user.token);
        localStorage.setItem("id", user.id);
        localStorage.setItem("role", user.role);
        toast.success(response?.data?.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/user-dashboard/");
        }, 3000);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Internal Server Error");
      });
  };
  // ==================== GOOGLE FORM SUBMISSION ====================
  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (!tokenResponse || !tokenResponse.access_token) {
        toast.error("Invalid Google token");
        return;
      }

      // -------------------- GOOGLE DATA FETCH --------------------
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
          setGoogleFormData(googleData.data);

          // -------------------- INSERT USER API --------------------
          axios
            .post(
              "https://pak-deals-backend.vercel.app/api/auth/google-register",
              googleData,
              { headers: { "Content-Type": "application/json" } },
            )
            .then((response) => {
              const user = response.data;
              localStorage.setItem("token", user.token);
              localStorage.setItem("id", user.id);
              localStorage.setItem("role", user.role);
              toast.success(response?.data?.message);

              setTimeout(() => {
                navigate("/user-dashboard/");
              }, 3000);

              setGoogleFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
              });
            })
            .catch((error) => {
              toast.error(
                error?.response?.data?.error || "Internal Server Error",
              );
            });
        })
        .catch((err) => {
          console.error("Google register error:", err?.response || err);
          toast.error("Google register failed");
        });
    },

    onError: (error) => {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In Failed");
    },
  });

  return (
    <div className="page flex items-center justify-center h-screen">
      <div className="lg:w-md shadow-xl hover:shadow-2xl transition-shadow duration-200 border-2 border-blue-800 px-6 py-5 rounded-lg bg-white">
        {/* -------------------- Heading -------------------- */}
        <div className="text-center">
          <h2
            to={"/"}
            className="text-blue-800 text-3xl font-bold font-montserrat tracking-wider"
          >
            PakDeals
          </h2>
        </div>
        {/* -------------------- FORM -------------------- */}
        <form onSubmit={handleFormSubmit} className="space-y-4 mt-3">
          <ToastContainer position="top-right" autoClose={1500} theme="light" />
          {/* -------------------- FIRSTNAME -------------------- */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="font-medium text-gray-700">
              First name<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              placeholder="Enter Your First Name"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
              focus:border-blue-800 focus:ring-2 focus:ring-blue-800
              transition-colors ease-in-out duration-300"
              onChange={handleInputChange}
            />
          </div>
          {/* -------------------- LASTNAME -------------------- */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="font-medium text-gray-700">
              Last name (optional)
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              placeholder="Enter Your Last Name"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
              focus:border-blue-800 focus:ring-2 focus:ring-blue-800
              transition-colors ease-in-out duration-300"
              onChange={handleInputChange}
            />
          </div>
          {/* -------------------- EMAIL -------------------- */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email<span className="text-red-600"> *</span>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter Your Email"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
              focus:border-blue-800 focus:ring-2 focus:ring-blue-800
              transition-colors ease-in-out duration-300"
              onChange={handleInputChange}
            />
          </div>
          {/* -------------------- PASSWORD -------------------- */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-medium text-gray-700">
              Password<span className="text-red-600"> *</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              placeholder="Enter Your Password"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
            focus:border-blue-800 focus:ring-2 focus:ring-blue-800
              transition-colors ease-in-out duration-300"
              onChange={handleInputChange}
            />
            {showPassword ? (
              <EyeClosed
                className="absolute top-[57%] right-3 w-6 h-6 hover:text-blue-800 transition-colors ease-linear cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <Eye
                className="absolute top-[57%] right-3 w-6 h-6 hover:text-blue-800 transition-colors ease-linear cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {/* -------------------- SUBMIT BUTTON -------------------- */}
          <div className="w-full">
            <button
              type="submit"
              className="bg-white shadow-lg py-3 px-6 hover:rounded-4xl hover:bg-blue-900 hover:text-white hover:-translate-y-1
              transition-all duration-300 rounded-md w-full font-medium"
            >
              Create An Account
            </button>
          </div>
          {/* -------------------- CONTINUE WITH GOOGLE -------------------- */}
          <div>
            {/* -------------------- CONTINUE WITH -------------------- */}
            <div className="flex items-center gap-2">
              <div className="w-[50%] h-0.5 bg-gray-600 rounded-full"></div>
              <div className="text-sm text-center text-gray-600 font-medium">
                OR
              </div>
              <div className="w-[50%] h-0.5 bg-gray-600 rounded-full"></div>
            </div>

            <div
              onClick={() => handleGoogleSubmit()}
              className="hover:scale-101 shadow-lg hover:shadow-xl gap-2 bg-gray-100 flex items-center justify-center transition-all p-3 rounded-sm text-red-600 font-medium cursor-pointer"
            >
              <h3 className="font-semibold text-3xl">G</h3>
              <h3 className="text-lg">Continue With Google</h3>
            </div>
          </div>
          {/* -------------------- LOGIN -------------------- */}
          <div className="flex items-center justify-center font-medium">
            <h1 className="text-gray-600">
              Have an account?
              <span className="ml-1">
                <Link to={"/login"} className="text-blue-700 hover:underline">
                  Login
                </Link>
              </span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpComponent;
