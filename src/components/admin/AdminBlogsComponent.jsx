import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  MessageSquareReply,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

function AdminBlogsComponent() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [perPage] = useState(6);

  // State for form inputs
  const [blogData, setBlogData] = useState({
    blogTitle: "",
    blogCategory: "",
    blogDescription: "",
    blogImage: null,
  });

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeModal = () => {
    setModalToggle(false);
    setTimeout(() => {
      setModalType(null);
      setSelectedBlog(null);
      setBlogData({
        blogTitle: "",
        blogCategory: "",
        blogDescription: "",
        blogImage: null,
      });
    }, 300);
  };

  const openModal = (type, blog = null) => {
    setModalType(type);
    setSelectedBlog(blog);
    if (blog && type === "edit") {
      setBlogData({
        blogTitle: blog.title,
        blogCategory: blog.blogCategory,
        blogDescription: blog.description,
        blogImage: null,
      });
    }
    setActiveDropdown(null);
    setTimeout(() => setModalToggle(true), 10);
  };

  const fetchBlogs = () => {
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/admin/all-blogs?page=${currentPage}&per_page=${perPage}`,
      )
      .then((response) => {
        const data = response.data.data;
        setBlogs(data.blogs);
        setCurrentPage(data.page);
        setTotalPages(data.total_pages);
        setTotalBlogs(data.total);
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "blogImage") {
      setBlogData({ ...blogData, blogImage: files[0] });
    } else {
      setBlogData({ ...blogData, [name]: value });
    }
  };

  const addBlog = () => {
    const newForm = new FormData();
    newForm.append("blogCategory", blogData.blogCategory);
    newForm.append("blogTitle", blogData.blogTitle);
    newForm.append("blogDescription", blogData.blogDescription);
    if (blogData.blogImage) {
      newForm.append("blogImage", blogData.blogImage);
    }

    const loadId = toast.loading("Adding blog...");

    axios
      .post("https://pak-deals-backend.vercel.app/api/admin/add-blog", newForm)
      .then((res) => {
        toast.update(loadId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchBlogs();
        closeModal();
      })
      .catch((err) => console.error("Submit error:", err));
  };

  const editBlog = () => {
    const newForm = new FormData();
    newForm.append("blogCategory", blogData.blogCategory);
    newForm.append("blogTitle", blogData.blogTitle);
    newForm.append("blogDescription", blogData.blogDescription);
    if (blogData.blogImage) {
      newForm.append("blogImage", blogData.blogImage);
    }

    const loadId = toast.loading("Updating blog...");

    axios
      .put(
        `https://pak-deals-backend.vercel.app/api/admin/edit-blog/${selectedBlog.id}`,
        newForm,
      )
      .then((res) => {
        toast.update(loadId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchBlogs();
        closeModal();
      })
      .catch((err) => console.error("Submit error:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    modalType === "add" ? addBlog() : editBlog();
  };

  const deleteBlog = () => {
    const loadId = toast.loading("Deleting blog...");
    axios
      .delete(
        `https://pak-deals-backend.vercel.app/api/admin/delete-blog/${selectedBlog.id}`,
      )
      .then((res) => {
        toast.update(loadId, {
          render: res.data.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchBlogs();
        closeModal();
      });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        theme="dark"
      />
      <div className="text-end w-full mb-6">
        <button
          type="button"
          onClick={() => openModal("add")}
          className="bg-blue-900 text-white text-sm font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-800 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          + Add New Blog
        </button>
      </div>

      <div className="w-full overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
        {blogs.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                {[
                  "ID",
                  "Blog Detail",
                  "Category",
                  "Date Created",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {blogs.map((blog, i) => (
                <tr
                  key={blog.id}
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
                    {blog.created_at?.slice(5, 16).replaceAll(" ", "/")}
                  </td>
                  <td className="px-6 py-4 relative">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal("view", blog)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Eye size={18} />
                      </button>

                      <div
                        className="relative"
                        ref={activeDropdown === i ? dropdownRef : null}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === i ? null : i);
                          }}
                          className={`p-2 rounded-lg transition-all ${activeDropdown === i ? "bg-slate-100 text-slate-600" : "text-slate-400 hover:bg-slate-100"}`}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeDropdown === i && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-100 py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
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
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <MessageSquareReply size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No Results</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-1">
              No blogs uploaded by Admin
            </p>
          </div>
        )}

        {/* --- MODAL SYSTEM --- */}
        {modalType && (
          <div
            className={`fixed inset-0 z-110 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${modalToggle ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transition-all duration-300 transform ${modalToggle ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
            >
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
                <button
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                {(modalType === "add" || modalType === "edit") && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Thumbnail Image
                      </label>
                      <input
                        type="file"
                        name="blogImage"
                        onChange={handleInputChange}
                        className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Title
                      </label>
                      <input
                        type="text"
                        name="blogTitle"
                        value={blogData.blogTitle}
                        onChange={handleInputChange}
                        placeholder="Enter blog title..."
                        className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Category
                      </label>
                      <input
                        type="text"
                        name="blogCategory"
                        value={blogData.blogCategory}
                        onChange={handleInputChange}
                        placeholder="e.g. Technology"
                        className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Full Description
                      </label>
                      <textarea
                        rows={4}
                        name="blogDescription"
                        value={blogData.blogDescription}
                        onChange={handleInputChange}
                        placeholder="Start writing..."
                        className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold text-sm hover:bg-blue-800 shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98]"
                    >
                      {modalType === "add" ? "Publish Blog" : "Save Changes"}
                    </button>
                  </form>
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
                        onClick={deleteBlog}
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
