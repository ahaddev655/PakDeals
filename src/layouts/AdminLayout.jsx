import React, { useState } from "react";
import AdminSidebarComponent from "../components/admin/AdminSidebarComponent";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [offCanvasToggle, setOffCanvasToggle] = useState(false);
  return (
    <div className="flex w-full">
      <AdminSidebarComponent
        offCanvasToggle={offCanvasToggle}
        setOffCanvasToggle={setOffCanvasToggle}
      />
      <div className="w-full sm:w-135 md:w-180 lg:w-240 xl:w-285 2xl:w-330">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
