import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const featuredBusinesses = [
  {
    logo: "https://crystalpng.com/wp-content/uploads/2025/03/nestle_logo.png",
  },
  {
    logo: "https://play-lh.googleusercontent.com/Q_3vIq94Bs2_QYFiFw4vQhobVioxzaKEq-XDuW0OEugD--iGQNLYktO2PgEcAED53v0",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSRFLJVTFcyD_h0MA7vY20e8kjq7zKpSEXA&s",
  },
  {
    logo: "https://logosandtypes.com/wp-content/uploads/2023/02/QMobile.png",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWsqrDvl0XwuuZwEda4ZINFay684zd_dfbxg&s",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQg--lZFkqzR_eP360T2d3oZLFXNLxM46Cf-gW8A0mIEtW41qO6zDQVRPL6zmfyW-C2OU&usqp=CAU",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8yLwT8TQ8aF0dMJfuD-LEC3WfUMeZHfzrZw&s",
  },
  {
    logo: "https://crystalpng.com/wp-content/uploads/2025/03/nestle_logo.png",
  },
  {
    logo: "https://play-lh.googleusercontent.com/Q_3vIq94Bs2_QYFiFw4vQhobVioxzaKEq-XDuW0OEugD--iGQNLYktO2PgEcAED53v0",
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSRFLJVTFcyD_h0MA7vY20e8kjq7zKpSEXA&s",
  },
  {
    logo: "https://logosandtypes.com/wp-content/uploads/2023/02/QMobile.png",
  },
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

function FeaturedBuisnesses() {
  return (
    <section className="section">
      <div className="mb-6">
        <h1 className="text-center sm:text-3xl text-xl underline font-bold uppercase text-[#202020] font-montserrat">
          Featured Businesses
        </h1>
      </div>
      <Swiper
        className="mx-auto w-full h-30"
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 6, spaceBetween: 28 },
          1280: { slidesPerView: 7, spaceBetween: 32 },
          1560: { slidesPerView: 7, spaceBetween: 36 },
        }}
        modules={[Autoplay, A11y]}
      >
        {featuredBusinesses.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-28 w-28 mx-auto">
              <img
                src={item.logo}
                alt="Featured business"
                className="h-full w-full rounded-full object-contain shadow-lg"
              />

              <Link
                to="/"
                target="_blank"
                aria-label="View business"
                className="absolute inset-0 z-10 rounded-full bg-blue-800/50 opacity-0 hover:opacity-100 grid place-items-center"
              >
                <ExternalLink
                  strokeWidth={1.5}
                  className="text-white w-10 h-10"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default FeaturedBuisnesses;
