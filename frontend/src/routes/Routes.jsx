import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoutes from './ProctectedRoutes';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/student/Profile';
import Home from '../pages/student/Home';
import InstructorHome from '../pages/instructor/InstructorHome';
import AdminHome from '../pages/admin/AdminHome';


const PageRoutes = props => {
  return (
    <Routes>
        
        <Route element={<ProtectedRoutes/>}>
        <Route path='/profile' element={<Profile/>}></Route>
        </Route>
        
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        
        <Route path="/student/Home" element={<ProtectedRoutes allowedRole="Student">
          <Home/>
          </ProtectedRoutes>
          }> </Route>
        <Route path="/instructor/InstructorHome" element={<ProtectedRoutes allowedRole="Instructor">
          <InstructorHome/>
          </ProtectedRoutes>
          }></Route>
        <Route path="/admin/AdminHome" element={<ProtectedRoutes allowedRole="Admin">

          <AdminHome/>
        </ProtectedRoutes>
      }></Route>

    </Routes>
  )
}



export default PageRoutes;