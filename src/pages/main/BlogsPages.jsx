import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function BlogsPages() {
  // ==================== USESTATES ====================
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  // ==================== BLOGS JS ====================
  const blogs = [
    {
      id: 1,
      title: "Blog Post One",
      category: "Cars",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 2,
      title: "Blog Post Two",
      category: "Mobiles",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 3,
      title: "Blog Post Three",
      category: "Property For Sale",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 4,
      title: "Blog Post Four",
      category: "Property For Rent",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 5,
      title: "Blog Post Five",
      category: "Electronics & Appliances",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 6,
      title: "Blog Post Six",
      category: "Motorcycles",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 7,
      title: "Blog Post Seven",
      category: "Animals",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 8,
      title: "Blog Post Eight",
      category: "Furniture & Home Decor",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 9,
      title: "Blog Post Nine",
      category: "Fashion & Beauty",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 10,
      title: "Blog Post Ten",
      category: "Books & Sports Items",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 11,
      title: "Blog Post Eleven",
      category: "Kids",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
    {
      id: 12,
      title: "Blog Post Twelve",
      category: "Business",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident odio voluptatem enim dolorum veniam voluptas rem, at quasi obcaecati reprehenderit optio ratione, exercitationem magni, laudantium eveniet dolor iure necessitatibus.",
    },
  ];

  // ===================== CATEGORIES JS ====================
  const categories = [
    "All",
    "Cars",
    "Mobiles",
    "Property For Sale",
    "Property For Rent",
    "Electronics & Appliances",
    "Motorcycles",
    "Animals",
    "Furniture & Home Decor",
    "Fashion & Beauty",
    "Books & Sports Items",
    "Kids",
  ];

  // ==================== PAGINATION JS ====================
  const pageSize = 9;
  const totalPages = Math.ceil(blogs.length / pageSize);
  const paginatedBlogs = blogs
    .filter((blog) => selectedCat === "All" || blog.category === selectedCat)
    .slice((page - 1) * pageSize, page * pageSize);

  // ==================== DROPDOWN JS ====================
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="page">
      {/* ==================== DROPDOWN & BLOG HEADING ==================== */}
      <div className="flex items-center justify-between gap-3 sm:flex-row flex-col">
        <h2 className="text-black text-3xl font-bold font-montserrat tracking-wide">
          Blogs
        </h2>

        <div ref={dropdownRef} className="relative w-full max-w-xs">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md border-2 border-gray-300 hover:border-blue-600 focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500 font-semibold transition"
          >
            <span>{selectedCat}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl z-20 max-h-64 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCat(cat);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 hover:text-blue-700 text-gray-700 font-medium border-b border-gray-100 last:border-b-0 transition"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* ==================== BLOGS ==================== */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-blue-700 mb-4 font-medium">{blog.category}</p>
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-800 line-clamp-1">{blog.excerpt}</p>
            <button
              type="button"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
              onClick={() => setSelected(blog)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
      {/* ==================== PAGINNATION CONTROLS ==================== */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`px-4 py-2 rounded ${page === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {/* ==================== MODAL ==================== */}
      <div
        className={`fixed top-0 left-0 bg-black/50 w-full h-full backdrop-blur-md flex items-center justify-center ${selected ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full ${selected ? "scale-100" : "scale-0 pointer-events-none"} transition-transform duration-300`}
        >
          {selected && (
            <>
              <p className="text-blue-700 mb-4 font-medium">
                {selected.category}
              </p>
              <h3 className="text-xl font-semibold mb-2">{selected.title}</h3>
              <p className="text-gray-800">{selected.excerpt}</p>
            </>
          )}
          <button
            type="button"
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogsPages;
