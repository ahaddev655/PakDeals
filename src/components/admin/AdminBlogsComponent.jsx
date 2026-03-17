import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

function AdminBlogsComponent() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [blogs, setBlogs] = useState(
    Array(5).fill({
      id: "1",
      blogCategory: "Technology",
      title: "The Future of Web Development in 2026",
      description:
        "Exploring the latest trends in AI-driven coding. Exploring the latest trends in AI-driven coding.",
      thumbnailImage: "https://via.placeholder.com/40",
      created_at: "17/Mar/2026",
    }),
  );

  const closeModal = () => {
    setModalToggle(false);
    setTimeout(() => {
      setModalType(null);
      setSelectedBlog(null);
    }, 300);
  };

  const openModal = (type, blog = null) => {
    setModalType(type);
    setSelectedBlog(blog);
    setActiveDropdown(null);
    // Tiny timeout to ensure the DOM is painted before transition starts
    setTimeout(() => setModalToggle(true), 10);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Action */}
      <div className="text-end w-full mb-6">
        <button
          type="button"
          onClick={() => openModal("add")}
          className="bg-blue-900 text-white text-sm font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-800 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          + Add New Blog
        </button>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              {["ID", "Blog Detail", "Category", "Date Created", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100"
                  >
                    {head}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {blogs.map((blog, i) => (
              <tr
                key={i}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                <td className="px-6 py-4 text-sm font-bold text-blue-600">
                  #{i + 1}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={blog.thumbnailImage}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200"
                    />
                    <div className="flex flex-col max-w-62.5">
                      <span className="text-sm font-bold text-slate-800 truncate">
                        {blog.title}
                      </span>
                      <span className="text-xs text-slate-400 truncate">
                        {blog.description}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700">
                    {blog.blogCategory}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                  {blog.created_at}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal("view", blog)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Eye size={18} />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(activeDropdown === i ? null : i)
                        }
                        className={`p-2 rounded-lg transition-all ${activeDropdown === i ? "bg-slate-100 text-slate-600" : "text-slate-400 hover:bg-slate-100"}`}
                      >
                        <MoreVertical size={18} />
                      </button>
                      {activeDropdown === i && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl z-20 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                          <button
                            onClick={() => openModal("edit", blog)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <Pencil size={14} /> Edit Blog
                          </button>
                          <button
                            onClick={() => openModal("delete", blog)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} /> Delete Blog
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- MODAL SYSTEM --- */}
        {modalType && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${modalToggle ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transition-all duration-300 transform ${modalToggle ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
                <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-[0.2em]">
                  {modalType === "add"
                    ? "Create New Post"
                    : modalType === "edit"
                      ? "Update Blog Post"
                      : modalType === "delete"
                        ? "Attention Required"
                        : "Post Preview"}
                </h3>
                {modalType === "view" && selectedBlog && (
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded uppercase">
                    {selectedBlog.blogCategory}
                  </span>
                )}
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {(modalType === "add" || modalType === "edit") && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Title
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedBlog?.title}
                        placeholder="Enter blog title..."
                        className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Category
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedBlog?.blogCategory}
                        placeholder="e.g. Technology"
                        className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Full Description
                      </label>
                      <textarea
                        rows={4}
                        defaultValue={selectedBlog?.description}
                        placeholder="Start writing..."
                        className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm resize-none"
                      />
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold text-sm hover:bg-blue-800 shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98]"
                    >
                      {modalType === "add" ? "Publish Blog" : "Save Changes"}
                    </button>
                  </div>
                )}

                {modalType === "view" && (
                  <div className="text-center">
                    <img
                      src={selectedBlog?.thumbnailImage}
                      className="w-24 h-24 rounded-3xl mx-auto mb-6 object-cover border-4 border-slate-50 shadow-md"
                      alt=""
                    />
                    <h4 className="font-bold text-slate-900 text-xl mb-3 leading-tight">
                      {selectedBlog?.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {selectedBlog?.description}
                    </p>
                  </div>
                )}

                {modalType === "delete" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-100">
                      <AlertTriangle size={32} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      Permanently delete?
                    </h4>
                    <p className="text-slate-500 text-sm mt-2 px-4">
                      You are about to remove{" "}
                      <span className="font-bold text-slate-700">
                        "{selectedBlog?.title}"
                      </span>
                      . This action cannot be undone.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <button
                        onClick={closeModal}
                        className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                      >
                        Keep Blog
                      </button>
                      <button
                        onClick={closeModal}
                        className="py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all"
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBlogsComponent;
