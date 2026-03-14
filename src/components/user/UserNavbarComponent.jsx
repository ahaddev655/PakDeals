import axios from "axios";
import { Menu, MoveRight, X, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function UserNavbarComponent({ offCanvasToggle, setOffCanvasToggle }) {
  const [navbarToggle, setNavbarToggle] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");

  const links = [
    { text: "Home", link: "/" },
    { text: "Ads", link: "/all-ads" },
    { text: "Pricing", link: "/pricing" },
    { text: "Blogs", link: "/blogs" },
    { text: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    if (!userId) {
      setFetching(false);
      return;
    }

    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/users/fetch-user/${userId}`,
      )
      .then((response) => {
        setFirstName(response.data.user.firstName);
      })
      .catch((error) => {
        console.error(
          "Navbar Fetch Error:",
          error?.response?.data?.error || "Error",
        );
      })
      .finally(() => setFetching(false));
  }, [userId]);

  const navLinkClass = ({ isActive }) =>
    `relative font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? "text-blue-600 after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
        : "text-slate-500 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 py-4 md:px-12 sm:px-6 px-4 flex items-center justify-between">
      {/* LEFT: MOBILE TOGGLES & NAV */}
      <div className="flex items-center gap-6">
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => setOffCanvasToggle(!offCanvasToggle)}
            className="p-2 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <MoveRight
              size={22}
              className={`text-slate-600 transition-transform duration-500 ${offCanvasToggle ? "-rotate-180" : "rotate-0"}`}
            />
          </button>

          <button
            onClick={() => setNavbarToggle(!navbarToggle)}
            className="text-slate-600"
          >
            {navbarToggle ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="items-center gap-8 lg:flex hidden">
          {links.map((link, i) => (
            <li key={i}>
              <NavLink to={link.link} end className={navLinkClass}>
                {link.text}
              </NavLink>
            </li>
          ))}

          {userRole === "admin" && (
            <li>
              <NavLink to="/87b27389/" className={navLinkClass}>
                Admin Panel
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 origin-top overflow-hidden lg:hidden ${
          navbarToggle ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-6 gap-5">
          {links.map((link, i) => (
            <li key={i} onClick={() => setNavbarToggle(false)}>
              <NavLink
                to={link.link}
                className="font-bold text-slate-700 block"
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT: PROFILE SECTION */}
      <div className="flex items-center gap-4">
        <Link
          to="/user-dashboard/profile"
          className="group relative flex items-center gap-3 bg-slate-50 hover:bg-blue-50 p-1 pr-4 rounded-full transition-all duration-300 border border-slate-100"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            {fetching ? (
              <div className="w-full h-full rounded-full bg-slate-200 animate-pulse" />
            ) : firstName ? (
              <span className="font-black text-sm">
                {firstName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User size={18} />
            )}
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              Account
            </p>
            <p className="text-sm font-bold text-slate-700 truncate max-w-25">
              {fetching ? "..." : firstName || "User"}
            </p>
          </div>

          {/* ONLINE INDICATOR */}
          <div className="w-2.5 h-2.5 border-2 border-white rounded-full bg-green-500 absolute top-1 left-7 shadow-sm" />
        </Link>
      </div>
    </nav>
  );
}

export default UserNavbarComponent;
