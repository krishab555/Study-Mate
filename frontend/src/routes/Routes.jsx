
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProctectedRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DisscussionForum from "../pages/DisscussionForum";
import Dashboard from "../pages/Dashboard";


import StudentLayout from "./StudentLayout";
import Profile from "../pages/student/Profile";
import Home from "../pages/student/Home";
import Courses from "../pages/student/Courses";

import InstructorHome from "../pages/instructor/InstructorHome";
import AdminHome from "../pages/admin/AdminHome";
import InstructorLayout from "./InstructorLayout";
import AdminLayout from "./AdminLayout";
import Layout from "./Layout";

const PageRoutes = () => {
  return (
    <Routes>

      {/* Layout wraps all routes under "/" */}
      <Route path="/" element={<Layout />}>
        {/* ✅ Default page when visiting "/" */}
        <Route index element={<Dashboard />} />

        {/* ✅ Protected route for student profile */}
        <Route element={<ProtectedRoutes />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ✅ Student Dashboard */}
        <Route
          path="student/home"
          element={
            <ProtectedRoutes allowedRole="Student">
              <Home />
            </ProtectedRoutes>
          }
        />

        {/* ✅ Instructor Dashboard */}
        <Route
          path="instructor/home"
          element={
            <ProtectedRoutes allowedRole="Instructor">
              <InstructorHome />
            </ProtectedRoutes>
          }
        />

        {/* ✅ Admin Dashboard */}
        <Route
          path="admin/home"
          element={
            <ProtectedRoutes allowedRole="Admin">
              <AdminHome />
            </ProtectedRoutes>
          }
        />
      </Route>

      {/* ✅ Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default PageRoutes;
