import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <div>
      <Navbar />
      <SideBar  />
      <div >
        <Outlet />
      </div>
      
    </div>
  );
};

export default InstructorLayout;
