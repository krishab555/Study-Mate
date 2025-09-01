import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

import Loader from "../components/common/Loader";

const ProtectedRoutes = () => {
  const {user,loading}=useAuth();


  if (loading) {
    return (
    <Loader/>
    );
  }

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
