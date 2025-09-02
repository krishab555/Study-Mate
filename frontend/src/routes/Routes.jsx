import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoutes from './ProctectedRoutes';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/student/Profile';
import Dashboard from "../pages/Dashboard"; 


const PageRoutes = props => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}



export default PageRoutes;