import { Link, NavLink, useNavigate } from "react-router-dom";
import React from "react";
import {
  CircleUserRound,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageCircle,
  Plus,
  X,
} from "lucide-react";

function UserSidebarComponent({ offCanvasToggle, setOffCanvasToggle }) {
  const links = [
    { icon: LayoutDashboard, text: "Dashboard", link: "/user-dashboard/" },
    { icon: Megaphone, text: "My Ads", link: "/user-dashboard/my-ads" },
    { icon: Heart, text: "My Favorites", link: "/user-dashboard/favorites" },
    { icon: Plus, text: "Add Ads", link: "/user-dashboard/add-ad" },
    { icon: CreditCard, text: "Payments", link: "/user-dashboard/payments" },
    { icon: MessageCircle, text: "Chats", link: "/user-dashboard/chats" },
    {
      icon: CircleUserRound,
      text: "Profile Settings",
      link: "/user-dashboard/profile-settings",
    },
  ];

  const navigate = useNavigate();

  const userLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      {/* SIDEBAR */}
      <div className="sm:w-73.25 w-full bg-black min-h-screen flex-col lg:flex hidden">
        <div className="text-center p-6">
          <Link
            to="/"
            className="text-white text-4xl font-bold font-montserrat tracking-wider"
          >
            PakDeals
          </Link>
        </div>
        <hr className="my-5 border border-white rounded-full opacity-100" />

        {/* NAVLINKS */}
        <ul className="p-6">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <li key={i}>
                <NavLink
                  to={link.link}
                  end={link.link !== "/user-dashboard/chats"}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl p-4 transition-colors ease-in-out duration-300 ${
                      isActive
                        ? "bg-blue-700 text-white shadow-lg shadow-blue-500/40"
                        : "hover:bg-blue-50/7 hover:text-white group text-gray-300/70"
                    }`
                  }
                >
                  <Icon
                    className="group-hover:scale-105 transition-transform ease-in-out duration-300 font-semibold"
                    strokeWidth={1.25}
                  />
                  <span className="text-[15px] font-medium!">{link.text}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* LOGOUT BUTTON */}
        <div className="p-6 text-gray-400 border-t mt-auto border-[#ffffff33]">
          <button
            type="button"
            onClick={userLogOut}
            className="flex items-center w-full gap-3 bg-white/18 p-4 rounded-lg transition-all ease-in-out duration-300 border border-transparent hover:border-blue-600 hover:bg-blue-600/20 hover:text-white hover:scale-102"
          >
            <LogOut />
            <h1 className="font-medium">Logout</h1>
          </button>
        </div>
      </div>

      {/* OFFCANVAS */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-50 bg-black/50 backdrop-blur-md lg:hidden transition-opacity ease-in-out duration-300 ${
          offCanvasToggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-full min-[610px]:w-73.25 overflow-auto bg-black h-screen origin-top-left flex flex-col shadow-[4px_0_24px_#0000004d] p-6 transition-transform duration-300 ease-in-out ${
            offCanvasToggle ? "scale-x-100" : "scale-x-0"
          }`}
        >
          <div className="text-end ml-auto mb-4">
            <X
              strokeWidth={2.75}
              className="text-white cursor-pointer"
              onClick={() => setOffCanvasToggle(false)}
            />
          </div>

          {/* HEADING */}
          <div className="text-center">
            <Link
              to="/"
              className="text-white text-4xl font-bold font-montserrat tracking-wider"
            >
              PakDeals
            </Link>
          </div>
          <hr className="my-5 border border-white rounded-full opacity-100" />

          {/* NAVLINKS */}
          <ul>
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <li key={i}>
                  <NavLink
                    to={link.link}
                    onClick={() => setOffCanvasToggle(false)}
                    end={link.link !== "/user-dashboard/chats"}
                    className={({ isActive }) =>
                      `flex items-center gap-4 rounded-xl p-4 transition-colors ease-in-out duration-300 ${
                        isActive
                          ? "bg-blue-800 text-white"
                          : "hover:bg-blue-50/7 hover:text-white group text-gray-300/70"
                      }`
                    }
                  >
                    <Icon
                      className="group-hover:scale-105 transition-transform ease-in-out duration-300 font-semibold text-[15px]"
                      strokeWidth={1}
                    />
                    {link.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* LOGOUT BUTTON */}
          <div className="p-6 text-gray-400 border-t mt-auto border-[#ffffff33]">
            <button
              type="button"
              onClick={userLogOut}
              className="flex items-center w-full gap-3 bg-white/18 p-4 rounded-lg transition-all ease-in-out duration-300 border border-transparent hover:border-blue-600 hover:bg-blue-600/20 hover:text-white hover:scale-102"
            >
              <LogOut />
              <h1 className="font-medium">Logout</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSidebarComponent;
