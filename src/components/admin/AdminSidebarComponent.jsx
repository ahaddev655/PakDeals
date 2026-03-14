import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  CircleUserRound,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Plus,
  UserIcon,
  X,
} from "lucide-react";

// Move links outside to prevent re-creation on every render
const ADMIN_LINKS = [
  { icon: LayoutDashboard, text: "Dashboard", link: "/87b27389/" },
  { icon: UserIcon, text: "Users Management", link: "/87b27389/users" },
  { icon: Megaphone, text: "Ads Management", link: "/87b27389/ads" },
  { icon: Heart, text: "My Favorites", link: "/87b27389/favorites" },
  { icon: Plus, text: "Add Ads", link: "/87b27389/add-ad" },
  { icon: CreditCard, text: "Payments", link: "/87b27389/payments" },
  {
    icon: CircleUserRound,
    text: "Profile Settings",
    link: "/87b27389/profile-settings",
  },
];

function AdminSidebarComponent({ offCanvasToggle, setOffCanvasToggle }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); // Cleans up token, id, and role in one go
    navigate("/login");
  };

  // Reusable NavLink style logic
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-4 rounded-xl p-4 transition-all duration-300 group ${
      isActive
        ? "bg-blue-700 text-white shadow-lg shadow-blue-500/20"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  // Shared Sidebar Content to avoid duplication
  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {isMobile && (
        <div className="flex justify-end p-2">
          <X
            className="text-white cursor-pointer hover:rotate-90 transition-transform duration-300"
            onClick={() => setOffCanvasToggle(false)}
          />
        </div>
      )}

      <div className="text-center py-8 px-6">
        <Link to="/" className="text-white text-3xl font-bold tracking-tighter">
          Pak<span className="text-blue-500">Deals</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {ADMIN_LINKS.map((item, i) => (
          <NavLink
            key={i}
            to={item.link}
            end
            onClick={() => isMobile && setOffCanvasToggle(false)}
            className={navLinkClasses}
          >
            <item.icon
              size={20}
              strokeWidth={(isActive) => (isActive ? 2 : 1.5)}
            />
            <span className="text-sm font-medium">{item.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 p-4 rounded-xl text-gray-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/50 border border-transparent transition-all duration-300 group"
        >
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-semibold text-sm">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0a0a0a] min-h-screen border-r border-white/5 sticky top-0">
        <SidebarContent />
      </aside>

      {/* MOBILE OFFCANVAS */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
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
          className={`absolute top-0 left-0 w-72 h-full bg-[#0a0a0a] shadow-2xl transition-transform duration-500 ease-out ${
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
