import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRole = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Normalize roles to lowercase before comparing
  if (
    allowedRole.length > 0 &&
    (!role ||
      !allowedRole.map((r) => r.toLowerCase()).includes(role.toLowerCase()))
  ) {
    return <Navigate to="/dashboard" replace />; // or to "/unauthorized"
  }

  // If token and role are valid → allow access
  return <Outlet />;
};

export default ProtectedRoutes;
