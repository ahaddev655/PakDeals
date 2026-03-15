import axios from "axios";
import {
  CarFront,
  House,
  Motorbike,
  MoveRight,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PopularCategories() {
  const [bikesCount, setBikesCount] = useState(0);
  const [mobileCount, setMobileCount] = useState(0);
  const [motorsCount, setMotorsCount] = useState(0);
  const [propertySaleCount, setPropertySaleCount] = useState(0);
  const [propertyRentCount, setPropertyRentCount] = useState(0);
  const categories = [
    {
      icon: CarFront,
      adCount: motorsCount,
      title: "Motors",
      link: "/category/motors_ads",
    },
    {
      icon: Smartphone,
      adCount: mobileCount,
      title: "Mobiles",
      link: "/category/mobile_ads",
    },
    {
      icon: House,
      adCount: propertySaleCount,
      title: "Property For Sale",
      link: "/category/property_sale_ads",
    },
    {
      icon: House,
      adCount: propertyRentCount,
      title: "Property For Rent",
      link: "/category/property_rent_ads",
    },
    {
      icon: Motorbike,
      adCount: bikesCount,
      title: "Bikes",
      link: "/category/bikes_ads",
    },
  ];

  useEffect(() => {
    axios
      .get("https://pak-deals-backend.vercel.app/api/ads/category-ads-count")
      .then((response) => {
        const data = response.data;
        setBikesCount(data.bikes_count.count);
        setMobileCount(data.mobile_count.count);
        setMotorsCount(data.motors_count.count);
        setPropertySaleCount(data.property_sale_count.count);
        setPropertyRentCount(data.property_rent_count.count);
      })
      .catch((error) => {
        console.error("Error fetching category counts:", error);
      });
  }, []);

  return (
    <section className="section py-8">
      <div className="mb-8">
        <h1 className="sm:text-3xl text-2xl font-bold text-[#202020] relative inline-block">
          Popular Categories
          <span className="absolute bottom-0 left-0 w-full h-0.75 bg-blue-800 rounded-full"></span>
        </h1>
      </div>

      {/* Grid: 5-column structure preserved */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {categories.map((cats, i) => {
          const Icon = cats.icon;
          return (
            <Link to={cats.link} key={i} className="group h-full">
              {/* Card: Maintained border-2 border-blue-800 */}
              <div className="bg-white h-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-800 py-4 px-5">
                <div className="flex items-center gap-3">
                  {/* Icon: Preserved orange-100/40 background and circle shape */}
                  <div className="bg-orange-100/60 grid place-items-center w-12 h-12 rounded-full group-hover:bg-blue-900 group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <div>
                    <h6 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {cats.adCount} {cats.adCount <= 1 ? "ad" : "ads"}
                    </h6>
                    <h4 className="text-gray-800 font-bold text-[15px] leading-tight group-hover:text-blue-800 transition-colors">
                      {cats.title}
                    </h4>
                  </div>
                </div>

                {/* Divider and Action Button */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    className="text-sm font-bold text-blue-800 flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                  >
                    See More <MoveRight size={16} />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default PopularCategories;
