import React from "react";
import MainHeader from "./../components/main/MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "./../components/main/MainFooter";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <MainHeader />
      <Outlet />
      <MainFooter />
    </div>
  );
}

export default MainLayout;
