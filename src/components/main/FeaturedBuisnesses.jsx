import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const featuredBusinesses = [
  { logo: "https://crystalpng.com/wp-content/uploads/2025/03/nestle_logo.png" },
  {
    logo: "https://play-lh.googleusercontent.com/Q_3vIq94Bs2_QYFiFw4vQhobVioxzaKEq-XDuW0OEugD--iGQNLYktO2PgEcAED53v0",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSRFLJVTFcyD_h0MA7vY20e8kjq7zKpSEXA&s",
  },
  { logo: "https://logosandtypes.com/wp-content/uploads/2023/02/QMobile.png" },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWsqrDvl0XwuuZwEda4ZINFay684zd_dfbxg&s",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg--lZFkqzR_eP360T2d3oZLFXNLxM46Cf-gW8A0mIEtW41qO6zDQVRPL6zmfyW-C2OU&usqp=CAU",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8yLwT8TQ8aF0dMJfuD-LEC3WfUMeZHfzrZw&s",
  },
  { logo: "https://crystalpng.com/wp-content/uploads/2025/03/nestle_logo.png" },
  {
    logo: "https://play-lh.googleusercontent.com/Q_3vIq94Bs2_QYFiFw4vQhobVioxzaKEq-XDuW0OEugD--iGQNLYktO2PgEcAED53v0",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSRFLJVTFcyD_h0MA7vY20e8kjq7zKpSEXA&s",
  },
  { logo: "https://logosandtypes.com/wp-content/uploads/2023/02/QMobile.png" },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWsqrDvl0XwuuZwEda4ZINFay684zd_dfbxg&s",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg--lZFkqzR_eP360T2d3oZLFXNLxM46Cf-gW8A0mIEtW41qO6zDQVRPL6zmfyW-C2OU&usqp=CAU",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8yLwT8TQ8aF0dMJfuD-LEC3WfUMeZHfzrZw&s",
  },
];

function FeaturedBusinesses() {
  return (
    <section className="section py-10">
      <div className="mb-10 text-center">
        <h1 className="sm:text-3xl text-xl font-bold uppercase text-[#202020] font-montserrat relative inline-block">
          Featured Businesses
          <span className="absolute -bottom-2 left-0 w-full h-0.75 bg-blue-800 rounded-full"></span>
        </h1>
      </div>

      <Swiper
        className="mx-auto w-full h-auto py-4"
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 16 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 24 },
          1024: { slidesPerView: 6, spaceBetween: 28 },
          1280: { slidesPerView: 7, spaceBetween: 32 },
        }}
        modules={[Autoplay, A11y]}
      >
        {featuredBusinesses.map((item, i) => (
          <SwiperSlide key={`business-${i}`}>
            <div className="relative group h-28 w-28 mx-auto">
              <div className="h-full w-full rounded-full border border-gray-100 overflow-hidden bg-white shadow-md group-hover:shadow-xl transition-all duration-300">
                <img
                  src={item.logo}
                  alt="Featured business"
                  className="h-full w-full object-contain p-2 group-hover:scale-110 transition-transform duration-500 rounded-full"
                />
              </div>

              <Link
                to="/"
                target="_blank"
                aria-label="View business"
                className="absolute inset-0 z-10 rounded-full bg-blue-800/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]"
              >
                <ExternalLink
                  strokeWidth={2}
                  className="text-white w-8 h-8 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default FeaturedBusinesses;
