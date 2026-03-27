import axios from "axios";
import { ChevronDown, BookOpen, ArrowRight, X, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

function BlogsPages() {
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 6;

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = () => {
    window.scrollTo(0, 0);

    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/admin/all-blogs?page=${currentPage}&per_page=${perPage}`,
      )
      .then((response) => {
        const data = response.data.data;
        console.log(response.data.data);
        setBlogs(data.blogs);
        setCurrentPage(Number(data.page));
        setTotalPages(Number(data.total_pages));
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="page">
        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Latest Stories
            </h2>
            <p className="text-gray-500 mt-2 font-medium text-lg">
              Insights, news, and guides from our experts.
            </p>
          </div>
        </div>

        {/* ==================== BLOG GRID ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Placeholder for Blog Image */}
              <div className="aspect-16/10 bg-linear-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform duration-500">
                  {blog.thumbnailImage ? (
                    <img src={blog.thumbnailImage} alt="IMG" />
                  ) : (
                    <BookOpen size={48} className="text-white/20" />
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest">
                    {blog.blogCategory}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 leading-px text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                  <Calendar size={14} />
                  <span>{blog.created_at?.slice(5, 16)}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-gray-500 line-clamp-2 leading-relaxed mb-6">
                  {blog.description}
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
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm"
            >
              <ChevronDown className="rotate-90" size={20} />
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={idx}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all shadow-sm ${currentPage === idx + 1 ? "bg-blue-600 text-white scale-110 shadow-blue-200" : "bg-white text-gray-400 hover:text-gray-600"}`}
                >
                  {idx + 1}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
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
                {selected.thumbnailImage ? (
                  <img src={selected.thumbnailImage} alt="IMG" />
                ) : (
                  <BookOpen size={80} className="text-white/20" />
                )}
              </div>
              <div className="p-10">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                  {selected.blogCategory}
                </span>
                <h2 className="text-3xl font-black text-gray-900 mt-2 mb-6">
                  {selected.title}
                </h2>
                <div className="prose prose-blue max-w-none text-gray-600 leading-loose text-lg">
                  {selected.description}
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
