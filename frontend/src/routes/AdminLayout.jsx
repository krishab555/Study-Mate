import Navbar from "../components/common/Navbar";
import SideBar from "../components/common/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <SideBar/>
      <div>
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default AdminLayout;
