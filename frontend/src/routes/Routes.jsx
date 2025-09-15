// src/routes/Routes.jsx

import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProctectedRoutes";

// Public Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import DiscussionForum from "../pages/DiscussionForum";

// Landing Page
import LandingPage from "../pages/LandingPage";

// Dashboard / Layouts
import Dashboard from "../pages/Dashboard";
import Layout from "./Layout";

// Student
import StudentLayout from "./StudentLayout";
import Home from "../pages/student/Home";
import Courses from "../pages/student/Courses";
import CourseDetail from "../pages/student/CourseDetail";
import FAQSubjects from "../pages/student/FAQSubjects";
import FAQDetails from "../pages/student/FAQDetails";

// Student Certificates (NEW)
import Certificate from "../pages/student/Certificate";
import CertificateDetail from "../pages/student/certificateDetail";

// Instructor
import InstructorHome from "../pages/instructor/InstructorHome";
import InstructorLayout from "./InstructorLayout";
import AddCourse from "../pages/instructor/AddCourse";

// Admin
import AdminHome from "../pages/admin/AdminHome";
import AdminLayout from "./AdminLayout";
import Profile from "../pages/Profile";
import ManageUsers from "../pages/admin/ManageUsers";
import AdminCourses from "../pages/admin/AdminCourses";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoutes allowedRole={["Student", "Instructor", "Admin"]} />
        }
      >
        <Route path="/discussionForum" element={<DiscussionForum />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Student"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="profile" element={<Profile />} />

          {/* Certificates */}
          <Route path="certificates" element={<Certificate />} />
          <Route path="certificate/:id" element={<CertificateDetail />} />
        </Route>
      </Route>

      {/* Course Detail (public or protected?) */}
      <Route path="/courses/:id" element={<CourseDetail />} />

      {/* FAQ */}
      <Route path="/faqs" element={<FAQSubjects />} />
      <Route path="/faqs/:faqMasterId" element={<FAQDetails />} />

      {/* Instructor Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Instructor"]} />}>
        <Route path="/instructor" element={<InstructorLayout />}>
          <Route index element={<InstructorHome />} />
          <Route path="home" element={<InstructorHome />} />
          <Route path="addcourse" element={<AddCourse />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-courses" element={<AdminCourses />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PageRoutes;
