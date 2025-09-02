import { Navigate, Outlet } from "react-router";




const ProtectedRoutes = ({children,allowedRole}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if (allowedRole && role!==allowedRole) {
    
  //   return <Navigate to="/unauthorized" replace />;
  // }
  return children;
};

export default ProtectedRoutes;
