import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <footer className="bg-linear-to-r from-blue-900 via-blue-900 to-blue-950">
      <div className="md:px-12 sm:px-6 px-2.5 w-full sm:w-135 md:w-180 lg:w-240 xl:w-285 2xl:w-330 mx-auto py-12">
        {/* -------------------- FOOTER -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* ==================== LOGO + TAGS + DESCRIPTION ==================== */}
          <div className="lg:col-span-4 text-center md:text-start">
            <Link
              to={"/"}
              className="text-white text-3xl font-bold font-montserrat tracking-wider"
            >
              PakDeals
            </Link>
            <p className="mt-3 text-[#eaeaea] text-[15px]">
              Discover pakDeals Pakistan, a dynamic platform designed to connect
              buyers and sellers all over the country. Post your ads at no cost
              and reach people nationwide, making it simple to trade products
              and services anytime, anywhere in Pakistan.
            </p>
            <div>
              <p className="text-[#eaeaea] mt-5 text-[15px]">
                #pakDealsPakistan #BuyAndSell #OnlineMarketplace #PakistanDeals
              </p>
            </div>
          </div>
          {/* ==================== LINKS ==================== */}
          {/* -------------------- TOP CATEGORIES -------------------- */}
          <div className="lg:col-span-2 text-center md:text-start">
            <h3 className="text-white font-semibold mb-4">Top Categories</h3>
            <ul className="space-y-1.5">
              {[
                "Property For Sale",
                "Property For Rent",
                "New Cars For Sale",
                "Used Cars For Sale",
                "Mobile Phones",
                "Electronics",
                "Fashion / Clothing",
                "Travels & Tour Deals",
                "Fitness & Gym",
              ].map((category) => (
                <li key={category}>
                  <h2 className="text-[#eaeaea] text-sm">{category}</h2>
                </li>
              ))}
            </ul>
          </div>
          {/* -------------------- USEFUL LINKS -------------------- */}
          <div className="lg:col-span-2 text-center md:text-start">
            <h3 className="text-white font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-1.5">
              {[
                "Post A Free Ad",
                "Grow With Us",
                "Advertise With Us",
                "Support",
                "Lastest News",
                "Website Analytics",
                "Sitemap",
                "Terms Of Use",
                "Privacy Policy",
              ].map((category) => (
                <li key={category}>
                  <h2 className="text-[#eaeaea] text-sm">{category}</h2>
                </li>
              ))}
            </ul>
          </div>
          {/* ==================== SUBSCRIBE & FOLLOW ==================== */}
          <div className="lg:col-span-4 text-center md:text-start">
            {/* -------------------- SUBSCRIBE -------------------- */}
            <h3 className="text-white font-semibold mb-4">Subscribe</h3>
            <form className="relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="bg-white p-3.5 border-2 border-[#e2e8f0] text-[1rem] transition-all ease-in-out rounded-md duration-300 h-13.75 w-full"
                required
              />
              <button
                type="submit"
                className="absolute top-2 right-2 h-10 bg-white rounded-md px-4 hover:bg-gray-200 border border-blue-800 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            {/* -------------------- FOLLOW US -------------------- */}
            <h3 className="text-white font-semibold mt-8 mb-4">Follow Us</h3>
            <div className="flex items-center gap-4 md:justify-start justify-center">
              {[
                { icon: Facebook },
                { icon: Twitter },
                { icon: Instagram },
                { icon: Linkedin },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <Link
                    to={"/"}
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#eaeaea] hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    <Icon />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <hr className="border border-white my-6" />
      {/* -------------------- COPYRIGHT -------------------- */}
      <div className="w-full sm:w-135 md:w-180 lg:w-240 xl:w-285 2xl:w-330 mx-auto text-white font-medium sm:flex text-center items-center justify-between">
        <p>Built with &hearts; by PakDeals</p>
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default MainFooter;
