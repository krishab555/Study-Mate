import React from "react";

import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import Footer from "../components/common/Footer";

const StudentLayout = () => {
  const layoutStyle = {
    display: "flex",
    minHeight: "100vh",
  };
  const mainStyle = {
  flex: 1,             // take all remaining width next to sidebar
  
  marginLeft: "40px",   // leave space for navbar
  padding: "20px",
  maxWidth: "100%",    // allow full width up to screen
};
  return (
    <div>
      <Navbar />
      <div style={layoutStyle}>
          <SideBar/>
      <div style={mainStyle}>
        <Outlet/>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default StudentLayout;