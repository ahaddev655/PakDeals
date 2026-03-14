import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Search,
} from "lucide-react";

function AdminUserPage() {
  const userToken = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const [selectedNavTab, setSelectedNavTab] = useState("all-users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedSort, setSelectedSort] = useState("by-name");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [perPage] = useState(20);

  useEffect(() => {
    if (!(userToken && userId && userRole === "admin")) {
      setTimeout(() => navigate("/user-dashboard"), 500);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const dummyUsers = [
        {
          id: 1,
          firstName: "Ahmad",
          lastName: "Khan",
          email: "ahmad@example.com",
          role: "admin",
          is_google_user: true,
          mobileNumber: "+923001234567",
          country: "Pakistan",
          city: "Lahore",
          address: "Gulberg III",
          company: "Tech Solutions",
          description: "Lead Developer",
          buisnessCategory: "IT Services",
          buisnessType: "Software",
          created_at: "2024-01-15",
        },
        {
          id: 2,
          firstName: "Sara",
          lastName: "Ahmed",
          email: "sara@web.com",
          role: "user",
          is_google_user: false,
          mobileNumber: "+923219876543",
          country: "Pakistan",
          city: "Karachi",
          address: "DHA Phase 6",
          company: "Retail Co",
          description: "Frequent Buyer",
          buisnessCategory: "E-commerce",
          buisnessType: "Retail",
          created_at: "2023-11-20",
        },
      ];
      setUsers(dummyUsers);
      setTotalUsers(dummyUsers.length);
      setTotalPages(1);
      setLoading(false);
    }, 800);
  }, [userToken, userId, userRole, navigate]);

  const tabs = [
    { key: "all-users", label: "All Users" },
    { key: "admin", label: "Admins" },
    { key: "user", label: "Regular Users" },
  ];

  const roleStyles = {
    admin: "text-purple-600 bg-purple-100",
    user: "bg-blue-100 text-blue-600",
  };

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeUser = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((u) => u.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* HEADER & FILTERS */}
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedNavTab(tab.key)}
                className={`pb-2 px-1 text-sm font-medium transition-colors ${
                  selectedNavTab === tab.key
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE SECTION */}
        {loading ? (
          <p className="text-center text-sm text-gray-700 py-10">
            Loading database records...
          </p>
        ) : users.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-300">
                  <tr>
                    {[
                      "ID",
                      "Full Name",
                      "Email",
                      "Role",
                      "Google Auth",
                      "Action",
                    ].map((h, i) => (
                      <th
                        key={i}
                        className={`font-semibold text-[#495057] py-4 px-6 text-sm ${i === 0 || i === 1 ? "text-start" : "text-center"}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((u) => {
                      const matchesSearch = `${u.firstName} ${u.lastName}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                      const matchesTab =
                        selectedNavTab === "all-users" ||
                        u.role === selectedNavTab;
                      return matchesSearch && matchesTab;
                    })
                    .map((user, i, arr) => (
                      <tr
                        key={user.id}
                        className={`border-b hover:bg-gray-50 transition-colors ${i === arr.length - 1 ? "border-transparent" : "border-gray-200"}`}
                      >
                        <td className="py-4 px-6 text-sm text-gray-500">
                          #{user.id}
                        </td>
                        <td className="py-4 px-6 text-[15px] font-medium text-gray-800">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600 text-center">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`text-[11px] uppercase font-bold px-3 py-1 rounded-full ${roleStyles[user.role]}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          {user.is_google_user ? (
                            <span className="text-green-600 text-sm">Yes</span>
                          ) : (
                            <span className="text-gray-400 text-sm">No</span>
                          )}
                        </td>
                        <td className="py-4 px-6 flex items-center justify-center gap-3">
                          <div
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg cursor-pointer transition-colors"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye size={18} />
                          </div>
                          <div
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg cursor-pointer transition-colors"
                            onClick={() => removeUser(user.id)}
                          >
                            <Trash2 size={18} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{users.length}</span> of{" "}
                <span className="font-medium">{totalUsers}</span> users
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronLeft size={18} />
                </button>
                {getVisiblePages().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${page === currentPage ? "bg-blue-800 text-white" : "border border-gray-300 text-gray-600"}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-gray-700 py-10">
            No users found.
          </p>
        )}

        {/* -------------------- UPDATED TRANSITION POPUP -------------------- */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${
            selectedUser
              ? "opacity-100 z-50 pointer-events-auto"
              : "opacity-0 -z-10 pointer-events-none"
          }`}
          onClick={() => setSelectedUser(null)}
        >
          <div
            className={`bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out ${
              selectedUser
                ? "scale-100 translate-y-0 opacity-100"
                : "scale-95 translate-y-8 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedUser && (
              <>
                <div className="bg-blue-800 p-6 text-white flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 text-[32px] font-bold uppercase text-white">
                    {selectedUser.firstName ? (
                      selectedUser?.firstName?.charAt(0)
                    ) : (
                      <User size={32} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <p className="text-blue-100 opacity-80">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  {[
                    ["User ID", `#${selectedUser.id}`],
                    ["Mobile", selectedUser.mobileNumber],
                    [
                      "Location",
                      `${selectedUser.city}, ${selectedUser.country}`,
                    ],
                    ["Address", selectedUser.address],
                    ["Company", selectedUser.company],
                    ["Role", selectedUser.role],
                    ["Business Category", selectedUser.buisnessCategory],
                    ["Business Type", selectedUser.buisnessType],
                    ["Joined On", selectedUser.created_at],
                    [
                      "Google Linked",
                      selectedUser.is_google_user ? "Yes" : "No",
                    ],
                  ].map(([label, value], i) => (
                    <div key={i} className="border-b border-gray-100 pb-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-gray-700 mt-1">
                        {value || "N/A"}
                      </p>
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Profile Description
                    </p>
                    <p className="text-sm text-gray-600 mt-1 italic">
                      {selectedUser.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 flex gap-3">
                  <button
                    className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all active:scale-95"
                    onClick={() => setSelectedUser(null)}
                  >
                    Close
                  </button>
                  <button
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-95"
                    onClick={() => removeUser(selectedUser.id)}
                  >
                    Delete User
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserPage;
