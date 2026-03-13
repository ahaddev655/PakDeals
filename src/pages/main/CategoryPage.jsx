import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function CategoryPage() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const location = useLocation();

  const normalizedSearch = search.trim().toLowerCase();

  const fetchAdsByCategory = () => {
    setLoading(true);
    const path = location.pathname;
    const formattedPath = path.split("/");
    const tableName = formattedPath[2];
    axios
      .get(
        `https://pak-deals-backend.vercel.app/api/ads/category-ads/${tableName}`,
      )
      .then((res) => {
        console.log(res?.data.data);
        setAds(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdsByCategory();
  }, [location.pathname]);

  const filteredAds = ads.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(normalizedSearch);

    return matchesSearch;
  });

  return (
    <div className="page">
      <div className="flex items-center justify-between gap-3.5 mb-6">
        <h1 className="text-[32px] font-semibold text-gray-700 capitalize">
          {location.pathname.split("/")[2]?.replace(/_/g, " ")}
        </h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-75 border-2 border-gray-300 rounded-lg px-3 py-2 mt-1
          focus:border-blue-800 focus:ring-2 focus:ring-blue-800
          transition-colors ease-in-out duration-300"
          placeholder="Search..."
        />
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-700 py-3">Loading ads...</p>
      ) : filteredAds.length > 0 ? (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {filteredAds.map((ad) => (
            <Link
              key={ad.id}
              to={`/ad/${ad.table_name || ad.source_table}/${ad.id}`}
            >
              <div className="border-2 border-blue-800 rounded-lg p-1">
                <img src={ad.image} alt="Ad" className="w-full rounded-md" />

                <div className="mt-3 px-2">
                  <h5 className="font-medium text-gray-400">{ad.category}</h5>

                  <h3 className="text-lg font-medium text-gray-700 line-clamp-2">
                    {ad.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="grid place-items-center w-8.75 h-8.75 bg-orange-100/40 rounded-full text-blue-800">
                      <MapPin size={18} />
                    </div>
                    <span className="sm:text-sm text-xs text-gray-400 font-medium">
                      {ad.location}
                    </span>
                  </div>

                  <hr className="my-3 border border-gray-300" />

                  <h2 className="text-center text-blue-800 font-semibold text-2xl">
                    PKR {Number(ad.price).toLocaleString()}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No ads found for this category.
        </p>
      )}
    </div>
  );
}

export default CategoryPage;
