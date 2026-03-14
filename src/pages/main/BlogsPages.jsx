import {
  ChevronDown,
  BookOpen,
  Clock,
  ArrowRight,
  X,
  Filter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

function BlogsPages() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  const blogs = [
    {
      id: 1,
      title: "Modern Electric Cars",
      category: "Cars",
      excerpt:
        "Exploring the future of sustainable transportation and the latest in EV battery technology...",
      date: "Mar 12, 2024",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Best 5G Mobiles",
      category: "Mobiles",
      excerpt:
        "A comprehensive guide to the fastest smartphones hitting the market this year...",
      date: "Mar 10, 2024",
      readTime: "4 min",
    },
    {
      id: 3,
      title: "Investing in Property",
      category: "Property For Sale",
      excerpt:
        "Why real estate remains one of the most stable long-term investment strategies...",
      date: "Mar 08, 2024",
      readTime: "8 min",
    },
    {
      id: 4,
      title: "Rental Market Trends",
      category: "Property For Rent",
      excerpt:
        "What you need to know about the current shifting landscape of urban rentals...",
      date: "Mar 05, 2024",
      readTime: "6 min",
    },
    {
      id: 5,
      title: "Smart Home Tech",
      category: "Electronics & Appliances",
      excerpt:
        "The appliances that are actually making lives easier through automation...",
      date: "Mar 02, 2024",
      readTime: "7 min",
    },
    {
      id: 6,
      title: "Superbike Review",
      category: "Motorcycles",
      excerpt:
        "Tearing up the track with the latest flagship liter-bikes from Japan and Europe...",
      date: "Feb 28, 2024",
      readTime: "10 min",
    },
    // ... rest of your blogs
  ];

  const categories = [
    "All",
    "Cars",
    "Mobiles",
    "Property For Sale",
    "Property For Rent",
    "Electronics & Appliances",
    "Motorcycles",
    "Animals",
  ];

  const pageSize = 6; // Reduced for better visual balance
  const filteredBlogs = blogs.filter(
    (blog) => selectedCat === "All" || blog.category === selectedCat,
  );
  const totalPages = Math.ceil(filteredBlogs.length / pageSize);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ==================== HEADER & FILTER ==================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Latest Stories
            </h2>
            <p className="text-gray-500 mt-2 font-medium text-lg">
              Insights, news, and guides from our experts.
            </p>
          </div>

          <div ref={dropdownRef} className="relative w-full max-w-xs group">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-gray-200 group-hover:border-blue-500 transition-all font-bold text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-blue-600" />
                <span>{selectedCat}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-3 border border-gray-100 rounded-2xl shadow-2xl z-30 max-h-80 overflow-y-auto p-2 backdrop-blur-xl bg-white/95">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCat(cat);
                      setIsOpen(false);
                      setPage(1);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl mb-1 last:mb-0 transition-colors font-semibold ${selectedCat === cat ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-600"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ==================== BLOG GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Placeholder for Blog Image */}
              <div className="aspect-16/10 bg-linear-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={48} />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {blog.readTime}
                  </span>
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-gray-500 line-clamp-2 leading-relaxed mb-6">
                  {blog.excerpt}
                </p>
                <button
                  onClick={() => setSelected(blog)}
                  className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
                >
                  Read Article <ArrowRight size={20} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ==================== PAGINATION ==================== */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
            >
              <ChevronDown className="rotate-90" size={20} />
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all shadow-sm ${page === idx + 1 ? "bg-blue-600 text-white scale-110 shadow-blue-200" : "bg-white text-gray-400 hover:text-gray-600"}`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
            >
              <ChevronDown className="-rotate-90" size={20} />
            </button>
          </div>
        )}
      </div>

      {/* ==================== MODAL ==================== */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${selected ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        />
        <div
          className={`relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-500 transform ${selected ? "translate-y-0 scale-100" : "translate-y-12 scale-95"}`}
        >
          {selected && (
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="h-64 bg-blue-600 flex items-center justify-center relative">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                >
                  <X />
                </button>
                <BookOpen size={80} className="text-white/20" />
              </div>
              <div className="p-10">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                  {selected.category}
                </span>
                <h2 className="text-3xl font-black text-gray-900 mt-2 mb-6">
                  {selected.title}
                </h2>
                <div className="prose prose-blue max-w-none text-gray-600 leading-loose text-lg">
                  {selected.excerpt}
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam pulvinar, ex nec hendrerit varius, enim diam varius
                    ex, eu eleifend nibh odio non enim. Ut sollicitudin, leo id
                    porttitor efficitur, lacus erat pellentesque viverra.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogsPages;
