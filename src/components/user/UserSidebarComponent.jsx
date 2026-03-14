import { Link, NavLink, useNavigate } from "react-router-dom";
import React from "react";
import {
  CircleUserRound,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  Megaphone,
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
    {
      icon: CircleUserRound,
      text: "Profile Settings",
      link: "/user-dashboard/profile-settings",
    },
  ];

  const navigate = useNavigate();

  const userLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const NavItem = ({ link, isMobile = false }) => {
    const Icon = link.icon;
    return (
      <li>
        <NavLink
          to={link.link}
          end
          onClick={isMobile ? () => setOffCanvasToggle(false) : undefined}
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-xl p-4 transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/40"
                : "text-gray-400 hover:bg-white/5 hover:text-white group"
            }`
          }
        >
          <Icon
            size={20}
            className="group-hover:scale-110 transition-transform duration-300"
            strokeWidth={2}
          />
          <span className="text-sm font-semibold tracking-wide">
            {link.text}
          </span>
        </NavLink>
      </li>
    );
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-black min-h-screen sticky top-0 overflow-y-auto border-r border-white/10">
        <div className="p-8">
          <Link
            to="/"
            className="text-white text-3xl font-black tracking-tighter"
          >
            PakDeals<span className="text-blue-600">.</span>
          </Link>
        </div>

        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {links.map((link, i) => (
              <NavItem key={i} link={link} />
            ))}
          </ul>
        </nav>

        {/* LOGOUT SECTION */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={userLogOut}
            className="flex items-center justify-center w-full gap-3 bg-white/5 p-4 rounded-xl text-gray-400 font-bold hover:bg-rose-600 hover:text-white transition-all duration-300 group"
          >
            <LogOut
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE OFFCANVAS */}
      <div
        className={`fixed inset-0 z-60 lg:hidden transition-all duration-500 ${
          offCanvasToggle ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            offCanvasToggle ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOffCanvasToggle(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 w-full sm:w-80 h-full bg-black flex flex-col shadow-2xl transition-transform duration-500 ease-out ${
            offCanvasToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-8">
            <Link to="/" className="text-white text-2xl font-black">
              PakDeals<span className="text-blue-600">.</span>
            </Link>
            <button
              onClick={() => setOffCanvasToggle(false)}
              className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-6">
            <ul className="space-y-2">
              {links.map((link, i) => (
                <NavItem key={i} link={link} isMobile />
              ))}
            </ul>
          </nav>

          <div className="p-8 border-t border-white/10">
            <button
              onClick={userLogOut}
              className="flex items-center justify-center w-full gap-3 bg-white/5 p-4 rounded-xl text-gray-400 font-bold hover:bg-rose-600 hover:text-white transition-all duration-300"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSidebarComponent;
