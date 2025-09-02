import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoutes from "./ProctectedRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/student/Profile";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/student/Home";
import InstructorHome from "../pages/instructor/InstructorHome";
import AdminHome from "../pages/admin/AdminHome";

const PageRoutes = (props) => {
  return (
    <Routes>
      {/* Common layout route */}
      <Route element={<Layout />} path="/">
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Dashboard route */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Role-based protected routes */}
      <Route
        path="/student/Home"
        element={
          <ProtectedRoutes allowedRole="Student">
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/instructor/InstructorHome"
        element={
          <ProtectedRoutes allowedRole="Instructor">
            <InstructorHome />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin/AdminHome"
        element={
          <ProtectedRoutes allowedRole="Admin">
            <AdminHome />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default PageRoutes;
