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
      <Route element={<Layout />} path="/">
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

      <Route path="/dashboard" element={<Dashboard />} />
      

      
      <Route path="/student/home" element={
        <ProtectedRoutes allowedRole="Student">
            <Home />
          </ProtectedRoutes>
        }
        />
      <Route path="/instructor/home" element={
        <ProtectedRoutes allowedRole="Instructor">
            <InstructorHome />
          </ProtectedRoutes>
        }
        />
      <Route path="/admin/home" element={
        <ProtectedRoutes allowedRole="Admin">
            <AdminHome />
          </ProtectedRoutes>
        }
        />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRoutes;
