
import React from "react";
import Sidebar from "../components/common/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const Layout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar title="StudyMate" />
      <div style={{ display: "flex", flex: 1 }}>
        <main style={{ flex: 1, margin: 0, padding: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

