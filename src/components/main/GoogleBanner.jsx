import React from "react";

function GoogleBanner() {
  // Replace this with your actual image URL once uploaded to assets
  const bannerSrc = "/assets/Google Banner dummy.png";

  return (
    <div className="w-full py-8 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* --- AD LABEL --- */}
        <div className="flex justify-center mb-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Advertisement
          </span>
        </div>

        {/* --- BANNER CONTAINER --- */}
        <div className="flex justify-center">
          <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
            <img
              src={bannerSrc}
              alt="IELTS Preparation Advertisement"
              className="h-auto lg:w-182 md:w-117 w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            />

            {/* Subtle overlay on hover to make it feel interactive */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleBanner;
