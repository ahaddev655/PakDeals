import React, { useState } from "react";
import UserSidebarComponent from "./../components/user/UserSidebarComponent";
import UserNavbarComponent from "./../components/user/UserNavbarComponent";
import { Outlet } from "react-router-dom";

function UserLayout() {
  const [offCanvasToggle, setOffCanvasToggle] = useState(false);
  return (
    <div className="flex w-full">
      <UserSidebarComponent
        offCanvasToggle={offCanvasToggle}
        setOffCanvasToggle={setOffCanvasToggle}
      />
      <div className="lg:w-[80%] w-full">
        <UserNavbarComponent
          offCanvasToggle={offCanvasToggle}
          setOffCanvasToggle={setOffCanvasToggle}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
