import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/SideBar"; 
import Navbar from "../components/common/Navbar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, }}>
        <Navbar />
        <main style={{ padding: "20px" }}>
          <Outlet /> {/* Nested admin routes render here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
