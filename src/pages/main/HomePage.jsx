import React from "react";
import FeaturedBuisnesses from "../../components/main/FeaturedBuisnesses";
import PopularCategories from "../../components/main/PopularCategories";
import RecentAds from "../../components/main/RecentAds";
import GoogleBanner from "../../components/main/GoogleBanner";
import AllCategories from "../../components/main/AllCategories";

function HomePage() {
  return (
    <>
      <GoogleBanner />
      <FeaturedBuisnesses />
      <RecentAds />
      <PopularCategories />
      <AllCategories />
    </>
  );
}

export default HomePage;
