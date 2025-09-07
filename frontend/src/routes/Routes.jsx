// src/routes/Routes.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProctectedRoutes";

// Public Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import DisscussionForum from "../pages/DisscussionForum";

// Landing Page
import LandingPage from "../pages/LandingPage"; // Updated

// Dashboard / Layouts
import Dashboard from "../pages/Dashboard"; // Optional direct dashboard route
import Layout from "./Layout";

// Student
import StudentLayout from "./StudentLayout";
import Home from "../pages/student/Home";
import Courses from "../pages/student/Courses";
import Profile from "../pages/student/Profile";
import CourseDetail from "../pages/student/CourseDetail";

// Instructor
import InstructorLayout from "./InstructorLayout";
import InstructorHome from "../pages/instructor/InstructorHome";

// Admin
import AdminLayout from "./AdminLayout";
import AdminHome from "../pages/admin/AdminHome";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Optional direct dashboard */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      {/* Student Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Student"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="courses/:id" element={<CourseDetail />} />

      {/* Instructor Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Instructor"]} />}>
        <Route path="/instructor" element={<InstructorLayout />}>
          <Route index element={<InstructorHome />} />
          <Route path="home" element={<InstructorHome />} />
        </Route>
      </Route>

      {/* Discussion Forum */}
      <Route path="/discussionForum" element={<DisscussionForum />} />

      {/* Admin Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PageRoutes;
