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

const PageRoutes = (props) => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Layout><Dashboard />
    </Layout>} />


      <Route element={<ProtectedRoutes allowedRole={["Student"]}/>}>
        <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Home />} /> 
          <Route path="home" element={<Home />} />
          <Route path="courses" element={<Courses/>} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>




      <Route element={<ProtectedRoutes allowedRole={["Instructor"]} />
       }>
        <Route path="/instructor" element={<InstructorLayout />}>
        <Route index element={<InstructorHome />} />

        <Route path="home" element={<InstructorHome/>} />
       </Route>
          
      </Route>

      <Route path="/discussionForum" element={<DisscussionForum/>} />
      

  
      
      
      <Route element={<ProtectedRoutes allowedRole={["Admin"]} />
       }>
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome/>} />
        </Route>
          
      </Route>


        
    </Routes>
  );
};

export default PageRoutes;
