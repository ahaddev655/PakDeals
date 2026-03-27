import React, { useState } from "react";
import AdminSidebarComponent from "../components/admin/AdminSidebarComponent";
import { Outlet } from "react-router-dom";
import UserNavbarComponent from "../components/user/UserNavbarComponent";

function AdminLayout() {
  const [offCanvasToggle, setOffCanvasToggle] = useState(false);
  return (
    <div className="flex w-full">
      <AdminSidebarComponent
        offCanvasToggle={offCanvasToggle}
        setOffCanvasToggle={setOffCanvasToggle}
      />
      <div className="max-w-7xl">
        <UserNavbarComponent />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
