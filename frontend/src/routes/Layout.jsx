import React from "react";
import Sidebar from "../components/common/SideBar";
import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar title="StudyMate"/>
      <main>
        <Outlet /> 
      </main>
      
    </div>
  );
};

export default Layout;