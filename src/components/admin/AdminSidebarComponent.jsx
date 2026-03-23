import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageSquareReply,
  UserIcon,
  X,
} from "lucide-react";

const ADMIN_LINKS = [
  {
    icon: LayoutDashboard,
    text: "Dashboard",
    link: "/control-center-9xA7kLm2/",
  },
  {
    icon: UserIcon,
    text: "Users Management",
    link: "/control-center-9xA7kLm2/users",
  },
  {
    icon: Megaphone,
    text: "Ads Management",
    link: "/control-center-9xA7kLm2/ads",
  },
  {
    icon: MessageSquareReply,
    text: "Blogs Management",
    link: "/control-center-9xA7kLm2/blogs",
  },
  {
    icon: MessageSquareReply,
    text: "Payment Management",
    link: "/control-center-9xA7kLm2/payments",
  },
  {
    icon: CircleUserRound,
    text: "Profile Settings",
    link: "/control-center-9xA7kLm2/profile-settings",
  },
];

function AdminSidebarComponent({ offCanvasToggle, setOffCanvasToggle }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  const navLinkClasses = ({ isActive }) =>
    `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group mx-2 ${
      isActive
        ? "bg-blue-600/10 text-blue-500 font-semibold"
        : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
    }`;

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex items-center justify-between py-10 px-8">
        <Link to="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-xl">P</span>
          </div>
          <span className="text-white text-2xl font-bold tracking-tight">
            Pak<span className="text-blue-500">Deals</span>
          </span>
        </Link>
        {isMobile && (
          <button
            onClick={() => setOffCanvasToggle(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        {ADMIN_LINKS.map((item, i) => (
          <NavLink
            key={i}
            to={item.link}
            end
            onClick={() => isMobile && setOffCanvasToggle(false)}
            className={navLinkClasses}
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute -left-2 w-1 h-6 bg-blue-500 rounded-r-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                )}

                <item.icon
                  size={19}
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isActive
                      ? "text-blue-500"
                      : "text-gray-500 group-hover:text-gray-300"
                  }`}
                />
                <span className="text-[13.5px] leading-none">{item.text}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 rounded-2xl p-2 border border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 p-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group"
          >
            <div className="p-2 rounded-lg bg-[#141414] group-hover:bg-red-500/10 transition-colors">
              <LogOut size={18} />
            </div>
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0a0a0a] h-screen border-r border-white/5 sticky top-0 overflow-y-auto no-scrollbar">
        <SidebarContent />
      </aside>

      {/* MOBILE OFFCANVAS */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          offCanvasToggle ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${
            offCanvasToggle ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOffCanvasToggle(false)}
        />

        <div
          className={`absolute top-0 left-0 w-72 h-full bg-[#0a0a0a] border-r border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.07,1)] ${
            offCanvasToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent isMobile />
        </div>
      </div>
    </>
  );
}

export default AdminSidebarComponent;
