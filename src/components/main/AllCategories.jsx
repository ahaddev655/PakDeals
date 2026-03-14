import {
  Album,
  Armchair,
  Baby,
  CarFront,
  Cat,
  CircuitBoard,
  Handbag,
  House,
  Motorbike,
  MoveRight,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

function AllCategories() {
  const categories = [
    {
      icon: CarFront,
      adCount: "5",
      title: "Cars",
      link: "/category/motors_ads",
    },
    {
      icon: Smartphone,
      adCount: "10",
      title: "Mobiles",
      link: "/category/mobile_ads",
    },
    {
      icon: House,
      adCount: "15",
      title: "Property For Sale",
      link: "/category/property_sale_ads",
    },
    {
      icon: House,
      adCount: "15",
      title: "Property For Rent",
      link: "/category/property_rent_ads",
    },
    {
      icon: CircuitBoard,
      adCount: "20",
      title: "Electronics & Appliances",
      link: "/category/electronics_ads",
    },
    {
      icon: Motorbike,
      adCount: "25",
      title: "Motorcycles",
      link: "/category/bikes_ads",
    },
    {
      icon: Cat,
      adCount: "30",
      title: "Animals",
      link: "/category/animal_ads",
    },
    {
      icon: Armchair,
      adCount: "35",
      title: "Furniture & Home Decor",
      link: "/category/furniture_ads",
    },
    {
      icon: Handbag,
      adCount: "40",
      title: "Fashion & Beauty",
      link: "/category/fashion_ads",
    },
    {
      icon: Album,
      adCount: "45",
      title: "Books & Sports Items",
      link: "/category/books_ads",
    },
    { icon: Baby, adCount: "50", title: "Kids", link: "/category/kids_ads" },
  ];

  return (
    <section className="section py-8">
      {/* Header: Kept underline but cleaned up the implementation */}
      <div className="mb-8">
        <h1 className="sm:text-3xl text-2xl font-bold text-[#202020] relative inline-block">
          All Categories
          <span className="absolute bottom-0 left-0 w-full h-0.75 bg-blue-800 rounded-full"></span>
        </h1>
      </div>

      {/* Grid: Kept original 5-column structure */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {categories.map((cats, i) => {
          const Icon = cats.icon;
          return (
            <Link to={cats.link} key={i} className="group h-full">
              {/* Card: Kept the border-2 border-blue-800 and shadow-lg */}
              <div className="bg-white h-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-800 py-4 px-5">
                <div className="flex items-center gap-3">
                  {/* Icon Wrapper: Kept original colors but added smooth scale on hover */}
                  <div className="bg-orange-100/60 grid place-items-center w-12 h-12 rounded-full group-hover:bg-blue-800 group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h6 className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                      {cats.adCount} ads
                    </h6>
                    <h4 className="text-[#333] font-bold text-[15px] leading-tight group-hover:text-blue-800 transition-colors">
                      {cats.title}
                    </h4>
                  </div>
                </div>

                {/* Button: Kept the See More text and arrow */}
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

export default AllCategories;
