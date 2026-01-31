import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function SignUpComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName && !formData.email && !formData.password) {
      toast.error("All fields are required");
      return;
    }
    if (!formData.userName) {
      toast.erroralert("Username required");
      return;
    }
    if (!formData.email) {
      toast.error("Email required");
      return;
    }
    if (!formData.password) {
      toast.erroralert("Password required");
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
    console.log("SIGN UP DATA:", formData);
    localStorage.setItem("userToken", "allow him");
    localStorage.setItem("userId", "1");
    toast.success("Form Submitted Successfully");
  };
  return (
    <div className="page flex items-center justify-center h-screen">
      <div className="lg:w-md shadow-xl hover:shadow-2xl transition-shadow duration-200 border-2 border-blue-800 px-6 py-5 rounded-lg">
        {/* -------------------- Heading -------------------- */}
        <div className="text-center">
          <h2
            to={"/"}
            className="text-blue-800 text-3xl font-bold font-montserrat tracking-wider"
          >
            PakDeals
          </h2>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4 mt-3">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            closeOnClick={false}
            pauseOnHover
            theme="light"
          />
          {/* -------------------- USERNAME -------------------- */}
          <div className="flex flex-col gap-1">
            <label htmlFor="userName" className="font-medium text-blue-800">
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter Your Username"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
            focus:border-blue-800 focus:ring-2 focus:ring-blue-800
              transition-colors ease-in-out duration-300"
              onChange={handleInputChange}
            />
          </div>
          {/* -------------------- EMAIL -------------------- */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-blue-800">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
            focus:border-blue-800 focus:ring-2 focus:ring-blue-800
              transition-colors ease-in-out duration-300"
              onChange={handleInputChange}
            />
          </div>
          {/* -------------------- PASSWORD -------------------- */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="font-medium text-blue-800">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
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
              <div className="w-[30%] h-0.5 bg-gray-600 rounded-full"></div>
              <div className="text-sm text-center text-gray-600 font-medium">
                Or Continue With
              </div>
              <div className="w-[30%] h-0.5 bg-gray-600 rounded-full"></div>
            </div>

            <div className="hover:scale-101 shadow-lg hover:shadow-xl gap-2 flex items-center justify-center transition-all p-3 rounded-sm text-red-600 font-medium cursor-pointer">
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
