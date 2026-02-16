import { Heart, Menu, Search, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function MainHeader() {
  const [offCanvasToggle, setOffCanvasToggle] = useState(false);

  return (
    <>
      <header className="bg-linear-to-r from-blue-900 via-blue-900 to-blue-950 relative">
        <div className="flex items-center justify-between md:px-12 sm:px-6 px-2.5 w-full sm:w-135 md:w-180 lg:w-240 xl:w-285 2xl:w-330 mx-auto py-5">
          <div className="shrink-0 w-1/5">
            <Link
              to={"/"}
              className="text-white text-3xl font-bold font-montserrat tracking-wider"
            >
              PakDeals
            </Link>
          </div>

          <div className="w-1/2 lg:block hidden">
            <form className="relative w-full">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="What are you looking for?"
                className="bg-white w-full h-10 rounded-lg px-5 font-medium"
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 grid place-items-center h-10 bg-blue-900 rounded-r-md w-20"
              >
                <Search className="text-white" />
              </button>
            </form>
          </div>

          <div className="lg:flex items-center gap-3 shrink-0 w-1/5 justify-end hidden">
            <Link
              to={"/favorites"}
              className="hover:bg-blue-900/60 cursor-pointer hover:text-blue-800 text-white transition-colors ease-in-out duration-200 w-8 h-8 rounded-sm grid place-items-center"
            >
              <Heart />
            </Link>
            <Link
              to={"/user-dashboard/"}
              className="hover:bg-blue-900/60 hover:text-blue-800 text-white transition-colors ease-in-out duration-200 w-8 h-8 rounded-sm grid place-items-center cursor-pointer"
            >
              <User />
            </Link>
            <Link to={"/add-ad"}>
              <button
                type="button"
                className="bg-white rounded-md hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/50 py-2 px-8 font-medium hover:rounded-4xl hover:bg-blue-900 hover:text-white transition-all ease-linear duration-200"
              >
                Add Ad
              </button>
            </Link>
          </div>

          <button
            type="button"
            className="text-white lg:hidden block"
            onClick={() => setOffCanvasToggle(!offCanvasToggle)}
          >
            <Menu />
          </button>
        </div>

        <div
          className={`w-full border-t-2 border-white p-3 absolute top-full left-0 z-50 lg:hidden block space-y-6 origin-top bg-linear-to-r from-blue-900 via-blue-900 to-blue-950 transition-all ease-in-out duration-300 ${offCanvasToggle ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
        >
          <div>
            <form className="relative w-full">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="What are you looking for?"
                className="bg-white w-full h-10 rounded-lg px-5 font-medium"
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 grid place-items-center h-10 bg-blue-900 rounded-r-md w-20"
              >
                <Search className="text-white" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"/favorites"}
              className="hover:bg-blue-900/60 cursor-pointer hover:text-blue-800 text-white transition-colors ease-in-out duration-200 w-8 h-8 rounded-sm grid place-items-center"
            >
              <Heart />
            </Link>
            <Link
              to={"/user-dashboard/"}
              className="hover:bg-blue-900/60 hover:text-blue-800 text-white transition-colors ease-in-out duration-200 w-8 h-8 rounded-sm grid place-items-center cursor-pointer"
            >
              <User />
            </Link>
            <Link to={"/add-ad"}>
              <button
                type="button"
                className="bg-white rounded-md hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/50 py-2 px-8 font-medium hover:rounded-4xl hover:bg-blue-900 hover:text-white transition-all ease-linear duration-200"
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
