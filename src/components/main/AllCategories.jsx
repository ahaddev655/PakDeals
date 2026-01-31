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
import React from "react";
import { Link } from "react-router-dom";

function AllCategories() {
  const categories = [
    {
      icon: CarFront,
      adCount: "5",
      title: "Cars",
      link: "/category/cars",
    },
    {
      icon: Smartphone,
      adCount: "10",
      title: "Mobiles",
      link: "/category/mobile",
    },
    {
      icon: House,
      adCount: "15",
      title: "Property For Sale",
      link: "/category/property-sale",
    },
    {
      icon: House,
      adCount: "15",
      title: "Property For Rent",
      link: "/category/property-rent",
    },
    {
      icon: CircuitBoard,
      adCount: "20",
      title: "Electronics & Home Appliances",
      link: "/category/electronics-and-home-appliances",
    },
    {
      icon: Motorbike,
      adCount: "25",
      title: "Motorcycles",
      link: "/category/motorcycles",
    },
    {
      icon: Cat,
      adCount: "30",
      title: "Animals",
      link: "/category/animals",
    },
    {
      icon: Armchair,
      adCount: "35",
      title: "Furniture & Home Decor",
      link: "/category/furniture",
    },
    {
      icon: Handbag,
      adCount: "40",
      title: "Fashion & Beauty",
      link: "/category/fashion-and-beauty",
    },
    {
      icon: Album,
      adCount: "45",
      title: "Books & Sports Items",
      link: "/category/books-and-sports",
    },
    {
      icon: Baby,
      adCount: "50",
      title: "Kids",
      link: "/category/kids",
    },
  ];
  return (
    <section className="section">
      <div className="mb-6">
        <h1 className="sm:text-3xl text-2xl underline font-medium text-[#202020]">
          All Categories
        </h1>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {categories.map((cats, i) => {
          const Icon = cats.icon;
          return (
            <Link to={cats.link} key={i}>
              <div className="bg-white group h-full rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300 border-2 border-blue-800 py-3 px-4">
                <div className="flex items-center gap-2" key={i}>
                  <div className="bg-orange-100/40 grid place-items-center w-13 h-13 rounded-full group-hover:bg-blue-900 group-hover:text-white transition-colors duration-300">
                    <Icon />
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-gray-500">
                      {cats.adCount} ads
                    </h6>
                    <h4 className="text-gray-700 font-medium">{cats.title}</h4>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-2 text-sm font-medium flex items-center justify-center gap-1 group-hover:gap-2 transition-all duration-300"
                  >
                    See More <MoveRight />
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
