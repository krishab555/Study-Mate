import { Navigate, Outlet } from "react-router";




const ProtectedRoutes = ({allowedRole}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && !allowedRole.includes(role)) {
    return <Navigate to="/dashboard" replace />; // or /unauthorized
  }

  return <Outlet />;

};

export default ProtectedRoutes;
