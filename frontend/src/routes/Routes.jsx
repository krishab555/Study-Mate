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
import CoursePayment from "../pages/student/CoursePayment"; // ✅ Add this line

// Student Certificates (NEW)
import Certificate from "../pages/student/Certificate";
import CertificateDetail from "../pages/student/certificateDetail";
import TakeQuizze from "../pages/student/TakeQuizByCourse"; // <-- Add this

// Instructor
import InstructorHome from "../pages/instructor/InstructorHome";
import InstructorLayout from "./InstructorLayout";
import AddCourse from "../pages/instructor/AddCourse";
import CreateQuizze from "../pages/instructor/CreateQuizze"; // <-- Add this

// Admin
import AdminHome from "../pages/admin/AdminHome";
import AdminLayout from "./AdminLayout";
import Profile from "../pages/Profile";
import ManageUsers from "../pages/admin/ManageUsers";
import AdminCourses from "../pages/admin/AdminCourses";
import ContactUs from "../pages/student/ContactUs";
import AdminContact from "../pages/admin/AdminContact";
import CourseContent from "../pages/student/CourseContent";

import QuizCourses from "../pages/student/QuizCourses";
import TakeQuizByCourse from "../pages/student/TakeQuizByCourse";

const PageRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route
        element={
          <ProtectedRoutes allowedRole={["Student", "Instructor", "Admin"]} />
        }
      >
        <Route path="/discussionForum" element={<DiscussionForum />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Student"]} />}>
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="certificate" element={<Certificate />} />
          <Route path="certificate/:id" element={<CertificateDetail />} />
          <Route path="/student/quiz-course/:courseId" element={<TakeQuizByCourse/>} />
          <Route path="courses/:id/payment" element={<CoursePayment />} />
          <Route path="contact" element={<ContactUs />} />
           <Route path="quiz/courses" element={<QuizCourses/>} />
          <Route path ="courses/:id" element={<CourseContent />}
          />
          {/* <Route path="quizzes" element={<QuizCourses/>} /> */}
          <Route path="course/:courseId/start" element={<CourseDetail/>} />
          <Route path="course/:courseId" element={<CourseContent/>} />

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
          <Route path="create-quiz" element={<CreateQuizze />} />
          <Route path="course/:id" element={<CourseDetail/>} />
          <Route path ="courses/:id" element={<CourseContent />}/>
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoutes allowedRole={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-courses" element={<AdminCourses />} />
          <Route path="contact" element={<AdminContact />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default PageRoutes;