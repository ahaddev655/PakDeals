import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoveLeft, Home } from "lucide-react";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center sm:px-8 px-4 py-12">
      <section className="max-w-7xl w-full">
        <div className="container mx-auto lg:flex lg:items-center lg:gap-16">
          <div className="w-full lg:w-1/2">
            {/* -------------------- ERROR CODE -------------------- */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                Error 404
              </span>
            </div>

            {/* -------------------- TEXT CONTENT -------------------- */}
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-montserrat leading-tight">
              Lost in <br />
              <span className="text-blue-600">The Marketplace?</span>
            </h1>

            <p className="mt-6 text-lg text-slate-500 font-medium max-w-md leading-relaxed">
              We couldn’t find the page you’re looking for. It might have been
              moved, deleted, or never existed in the first place.
            </p>

            {/* -------------------- ACTION BUTTONS -------------------- */}
            <div className="flex flex-col sm:flex-row items-center mt-10 gap-4">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center justify-center w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-700 transition-all duration-300 bg-white border border-slate-200 rounded-2xl gap-x-2 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
              >
                <MoveLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Go back</span>
              </button>

              <Link to="/" className="w-full sm:w-auto">
                <button className="flex items-center justify-center w-full px-8 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 bg-slate-900 rounded-2xl gap-x-2 hover:bg-blue-600 shadow-xl shadow-slate-200 hover:shadow-blue-200">
                  <Home size={18} />
                  <span>Take me home</span>
                </button>
              </Link>
            </div>

            {/* -------------------- QUICK LINKS -------------------- */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                Quick Navigation
              </p>
              <div className="flex gap-6 text-sm font-bold text-slate-500">
                <Link
                  to="/user-dashboard"
                  className="hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/user-ads"
                  className="hover:text-blue-600 transition-colors"
                >
                  My Ads
                </Link>
                <Link
                  to="/user-favorites"
                  className="hover:text-blue-600 transition-colors"
                >
                  Favorites
                </Link>
              </div>
            </div>
          </div>

          {/* -------------------- ILLUSTRATION -------------------- */}
          <div className="relative w-full mt-16 lg:w-1/2 lg:mt-0 animate-in fade-in zoom-in duration-700">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-full blur-3xl" />
            <img
              className="relative w-full max-w-lg lg:mx-auto drop-shadow-2xl"
              src="https://merakiui.com/images/components/illustration.svg"
              alt="404 Illustration"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ErrorPage;
