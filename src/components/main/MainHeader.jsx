import { Heart, Menu, Search, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MainHeader() {
  const [offCanvasToggle, setOffCanvasToggle] = useState(false);
  const navigate = useNavigate();
  const [val, setVal] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?search=${val}`);
  };

  return (
    <>
      <header className="bg-linear-to-r from-blue-900 via-blue-900 to-blue-950 relative z-100 shadow-xl">
        <div className="flex items-center justify-between container mx-auto px-3 md:px-24 py-4">
          {/* 1. Logo Section (1/5 width maintained) */}
          <div className="shrink-0 lg:w-1/5">
            <Link
              to={"/"}
              className="text-white text-2xl sm:text-3xl font-black font-montserrat tracking-tighter"
            >
              PakDeals<span className="text-blue-400">.</span>
            </Link>
          </div>

          {/* 2. Search Section (1/2 width maintained) */}
          <div className="w-1/2 lg:block hidden px-4">
            <form className="relative w-full group" onSubmit={handleSearch}>
              <input
                type="text"
                name="search"
                placeholder="What are you looking for?"
                className="bg-white/95 w-full h-11 rounded-xl px-5 font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-inner"
                required
                onChange={(e) => setVal(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-1 right-1 grid place-items-center h-9 bg-blue-900 hover:bg-blue-800 text-white rounded-lg w-14 transition-colors shadow-md"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* 3. Actions Section (1/5 width maintained) */}
          <div className="lg:flex items-center gap-5 shrink-0 lg:w-1/5 justify-end hidden">
            <Link
              to={"/favorites"}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
              title="Favorites"
            >
              <Heart size={22} />
            </Link>
            <Link
              to={"/user-dashboard/"}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
              title="Profile"
            >
              <User size={22} />
            </Link>
            <Link to={"/add-ad"}>
              <button
                type="button"
                className="bg-white text-blue-900 rounded-xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/20 py-2.5 px-6 font-bold text-sm transition-all duration-300 active:scale-95"
              >
                Post Ad
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="text-white lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setOffCanvasToggle(!offCanvasToggle)}
          >
            {offCanvasToggle ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ==================== MOBILE OFF-CANVAS (Kept Original Logic) ==================== */}
        <div
          className={`w-full border-t border-white/10 p-5 absolute top-full left-0 z-50 lg:hidden block space-y-6 origin-top bg-blue-950 shadow-2xl transition-all duration-300 ease-in-out ${
            offCanvasToggle
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <form className="relative w-full" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search items..."
              className="bg-white w-full h-12 rounded-xl px-5 font-medium outline-none"
              required
              onChange={(e) => setVal(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-1 right-1 grid place-items-center h-10 bg-blue-900 text-white rounded-lg w-16"
            >
              <Search size={20} />
            </button>
          </form>

          <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
            <div className="flex gap-4">
              <Link
                to={"/favorites"}
                onClick={() => setOffCanvasToggle(false)}
                className="text-white p-2"
              >
                <Heart size={24} />
              </Link>
              <Link
                to={"/user-dashboard/"}
                onClick={() => setOffCanvasToggle(false)}
                className="text-white p-2"
              >
                <User size={24} />
              </Link>
            </div>
            <Link to={"/add-ad"} className="w-1/2">
              <button
                onClick={() => setOffCanvasToggle(false)}
                type="button"
                className="w-full bg-white text-blue-900 rounded-xl py-3 font-bold shadow-lg"
              >
                Add Ad
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default MainHeader;
