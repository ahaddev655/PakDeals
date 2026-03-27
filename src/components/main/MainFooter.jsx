import { Facebook, Instagram, Linkedin, Twitter, Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <footer className="bg-linear-to-r from-blue-900 via-blue-900 to-blue-950">
      <div className="container mx-auto px-3 md:px-24 py-16">
        {/* -------------------- FOOTER GRID -------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* ==================== LOGO + DESCRIPTION ==================== */}
          <div className="lg:col-span-4 text-center md:text-start">
            <Link
              to={"/"}
              className="text-white text-3xl font-black font-montserrat tracking-tighter"
            >
              PakDeals<span className="text-blue-400">.</span>
            </Link>
            <p className="mt-4 text-blue-100/80 text-[15px] leading-relaxed">
              Discover PakDeals Pakistan, a dynamic platform designed to connect
              buyers and sellers all over the country. Post your ads at no cost
              and reach people nationwide.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
              {["#PakDeals", "#BuyAndSell", "#Pakistan"].map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] font-medium text-blue-300 bg-blue-800/40 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ==================== TOP CATEGORIES ==================== */}
          <div className="lg:col-span-2 text-center md:text-start">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Top Categories
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Property For Sale",
                "Property For Rent",
                "New Cars For Sale",
                "Used Cars For Sale",
                "Mobile Phones",
                "Electronics",
              ].map((category) => (
                <li key={category}>
                  <Link
                    to="/"
                    className="text-blue-100/70 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================== USEFUL LINKS ==================== */}
          <div className="lg:col-span-2 text-center md:text-start">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Useful Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Post A Free Ad",
                "Grow With Us",
                "Support",
                "Terms Of Use",
                "Privacy Policy",
              ].map((link) => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-blue-100/70 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm inline-block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================== SUBSCRIBE & FOLLOW ==================== */}
          <div className="lg:col-span-4 text-center md:text-start">
            <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
            <form className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                required
              />
              <button
                type="submit"
                className="absolute top-1.5 right-1.5 h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg px-4 transition-colors duration-200 shadow-lg"
              >
                Subscribe
              </button>
            </form>

            <h3 className="text-white font-bold mt-10 mb-5">
              Follow Our Socials
            </h3>
            <div className="flex items-center gap-3 md:justify-start justify-center">
              {[
                { icon: Facebook, color: "hover:bg-blue-600" },
                { icon: Twitter, color: "hover:bg-sky-500" },
                { icon: Instagram, color: "hover:bg-pink-600" },
                { icon: Linkedin, color: "hover:bg-blue-700" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <Link
                    to="/"
                    key={i}
                    className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color} hover:border-transparent hover:-translate-y-1`}
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- COPYRIGHT SECTION -------------------- */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="container mx-auto px-3 md:px-24 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-100/60 text-sm font-medium">
          <p className="flex items-center gap-1.5">
            Built with <Heart size={14} className="text-red-500 fill-red-500" />{" "}
            by <span className="text-white font-bold">PakDeals Team</span>
          </p>
          <p>
            &copy; {new Date().getFullYear()} PakDeals Pakistan. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
