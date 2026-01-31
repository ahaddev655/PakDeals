import { Menu, MoveLeft, MoveRight, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function UserNavbarComponent({ offCanvasToggle, setOffCanvasToggle }) {
  const [navbarToggle, setNavbarToggle] = useState(false);
  const links = [
    { text: "Home", link: "/" },
    { text: "Ads", link: "/all-ads" },
    { text: "Pricing", link: "/pricing" },
    { text: "Blogs", link: "/blogs" },
    { text: "Contact", link: "/contact" },
  ];

  return (
    <div className="bg-white shadow-md py-5 md:px-12 sm:px-6 px-2.5 flex items-center justify-between relative">
      {/* NAVLINKS */}
      <ul className="items-center gap-7 lg:flex hidden">
        {links.map((link, i) => (
          <li key={i}>
            <NavLink
              to={link.link}
              end
              className={({ isActive }) =>
                `font-medium transition-colors duration-300 ease-in-out ${
                  isActive ? "text-black" : "text-gray-500 hover:text-black"
                }`
              }
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* TOGGLE BUTTONS */}
      <div className="lg:hidden flex items-center gap-5">
        <MoveRight
          className={`cursor-pointer transition-transform duration-300 ease-in-out ${offCanvasToggle ? "-rotate-180" : "rotate-0"}`}
          onClick={() => setOffCanvasToggle(!offCanvasToggle)}
        />

        {navbarToggle ? (
          <X
            className="cursor-pointer"
            onClick={() => setNavbarToggle(false)}
          />
        ) : (
          <Menu
            className="cursor-pointer"
            onClick={() => setNavbarToggle(true)}
          />
        )}
      </div>

      {/* OFFCANVAS MENU */}
      <div
        className={`w-full py-4 md:px-12 sm:px-6 px-2.5 absolute left-0 bg-white transition-all ease-in-out shadow-lg border border-t-0 border-gray-200 duration-300 origin-top scale-y-0 opacity-0 ${
   navbarToggle ? "scale-y-100 opacity-100" : ""
 }`}
        style={{ bottom: "-218px" }}
      >
        <ul className="flex flex-col gap-4">
          {links.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link.link}
                end
                onClick={() => setNavbarToggle(false)}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-300 ease-in-out ${
                    isActive ? "text-black" : "text-gray-500 hover:text-black"
                  }`
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* PROFILE */}
      <div className="relative w-10 h-10 cursor-pointer">
        <img
          src="/assets/profile.jpg"
          alt="IMG"
          className="w-full rounded-full border-3 border-[#e2e8f0] hover:border-blue-600 transition-colors ease-in-out duration-300"
        />
        <div className="w-3 h-3 border-2 border-white rounded-full bg-green-600 absolute bottom-0 right-0" />
      </div>
    </div>
  );
}

export default UserNavbarComponent;
