import React, {useState, useEffect}from "react";

import Navbar from "../../components/common/Navbar"; 
import BestSellingCourseChart from "../../components/CourseChart";
import VisitorLineChart from "../../components/VisitorLineChart";
import {
  FaBook,
  FaUserGraduate,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";

export default function AdminHome() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    newStudents: 0,
    totalUsers: 0,
    projectSubmitted: 0,
  });

  const token = localStorage.getItem("token");

   useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all courses
        const courseRes = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!courseRes.ok) {
          console.error("Failed to fetch courses:", courseRes.status);
          return;
        }

        const courseData = await courseRes.json();
        const totalCourses = Array.isArray(courseData)
          ? courseData.length
          : courseData.data?.length || 0;

        // Fetch all users
        const userRes = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

         if (!userRes.ok) {
          console.error("Failed to fetch users:", userRes.status);
          return;
        }
        const userData = await userRes.json();
        const usersArray = Array.isArray(userData)
          ? userData
          : userData.data || [];
        const totalUsers = usersArray.length;
        //new std in 7 days
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const newStudents = usersArray.filter(
          (u) => u.role?.name === "Student" && new Date(u.createdAt) >= sevenDaysAgo
        ).length;

        // Fetch all projects/submissions
        const projectRes = await fetch("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        let projectSubmitted = 0;
        if (projectRes.ok) {
          const projectData = await projectRes.json();
          projectSubmitted = Array.isArray(projectData)
            ? projectData.length
            : projectData.data?.length || 0;
        } else if (projectRes.status !== 404) {
          console.error("Failed to fetch projects:", projectRes.status);
        }

        

        setStats({
          totalCourses,
          newStudents,
          totalUsers,
          projectSubmitted,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    if (token) fetchStats();
  }, [token]);




  const contentStyle = {
    padding: "20px",
    paddingTop: "80px", 
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    marginLeft:"280px",
  };

  const cardsContainerStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  };

  const cardStyle = {
    backgroundColor: "#e8f0fe",
    padding: "20px",
    flex: "1",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
    color: "#1e3a8a",
  };

  const iconStyle = { fontSize: "30px", marginBottom: "10px" };
  const cardTitleStyle = { fontSize: "16px", fontWeight: "bold" };
  const cardValueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
  };

  const chartsContainerStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  };

  const chartStyle = {
    flex: "1 1 400px",
    height: "300px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "20px",
  };

  return (
    <>
      <Navbar /> 
      <main style={contentStyle}>
        {/* Stat Cards */}
        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            <FaBook style={iconStyle} />
            <div style={cardTitleStyle}>Total Course</div>
            <span style={cardValueStyle}>{stats.totalCourses}</span>
          </div>
          <div style={cardStyle}>
            <FaUserGraduate style={iconStyle} />
            <div style={cardTitleStyle}>New Students</div>
            <span style={cardValueStyle}>{stats.newStudents}</span>
          </div>
          <div style={cardStyle}>
            <FaUsers style={iconStyle} />
            <div style={cardTitleStyle}>Total Users</div>
            <span style={cardValueStyle}>{stats.totalUsers}</span>
          </div>
          <div style={cardStyle}>
            <FaProjectDiagram style={iconStyle} />
            <div style={cardTitleStyle}>Project Submitted</div>
            <span style={cardValueStyle}>{stats.projectSubmitted}</span>
          </div>
        </div>

        {/* Charts */}
        <div style={chartsContainerStyle}>
          <div style={chartStyle}>
            <BestSellingCourseChart />
          </div>
          <div style={chartStyle}>
            <VisitorLineChart />
          </div>
        </div>
      </main>
    </>
  );
}
