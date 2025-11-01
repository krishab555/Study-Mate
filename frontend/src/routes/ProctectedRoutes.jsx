import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRole = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (
    allowedRole.length > 0 &&
    (!role ||
      !allowedRole.map((r) => r.toLowerCase()).includes(role.toLowerCase()))
  ) {
    return <Navigate to="/dashboard" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoutes;
