import React from "react";

import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import Footer from "../components/common/Footer";

const StudentLayout = () => {
  return (
    <div>
      <Navbar />
      <SideBar/>
      <div className="">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default StudentLayout;