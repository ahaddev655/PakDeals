import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-screen page">
      <div className="w-md bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 py-6 space-y-4 flex items-center justify-center flex-col rounded-md border-2 border-blue-900">
        <h1 className="text-4xl font-montserrat font-bold">Coming Soon</h1>
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="bg-white rounded-md hover:-translate-y-1 shadow-lg shadow-blue-900/50 py-3 px-6 font-medium hover:rounded-4xl hover:bg-blue-900 hover:text-white transition-all ease-linear duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
