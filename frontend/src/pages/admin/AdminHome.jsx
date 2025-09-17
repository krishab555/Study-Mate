import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import BestSellingCourseChart from "../../components/CourseChart";
import VisitorLineChart from "../../components/VisitorLineChart";
import {
  FaBook,
  FaUserGraduate,
  FaUsers,
  FaProjectDiagram,
  FaChartLine,
  FaGraduationCap,
  FaUsersCog,
  FaTasks,
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
        // Courses
        const courseRes = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const courseData = await courseRes.json();
        const totalCourses = Array.isArray(courseData)
          ? courseData.length
          : courseData.data?.length || 0;

        // Users
        const userRes = await fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        const usersArray = Array.isArray(userData)
          ? userData
          : userData.data || [];
        const totalUsers = usersArray.length;

        // New Students in last 7 days
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const newStudents = usersArray.filter(
          (u) =>
            u.role?.name === "Student" && new Date(u.createdAt) >= sevenDaysAgo
        ).length;

        // Projects
        const projectRes = await fetch("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        let projectSubmitted = 0;
        if (projectRes.ok) {
          const projectData = await projectRes.json();
          projectSubmitted = Array.isArray(projectData)
            ? projectData.length
            : projectData.data?.length || 0;
        }

        setStats({ totalCourses, newStudents, totalUsers, projectSubmitted });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    if (token) fetchStats();
  }, [token]);

  // Styling
  const contentStyle = {
    padding: "30px",
    paddingTop: "100px",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
    marginLeft: "280px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  };

  const headerIconStyle = {
    fontSize: "32px",
    color: "#4a6cf7",
  };

  const headerTextStyle = {
    fontSize: "28px",
    fontWeight: "600",
    color: "#2d3748",
    margin: 0,
  };

  const cardsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "40px",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    color: "#2d3748",
    transition: "all 0.3s ease",
  };

  const iconContainerStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontSize: "24px",
  };

  const cardTitleStyle = {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
    color: "#718096",
  };

  const cardValueStyle = {
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
    color: "#2d3748",
  };

  const chartsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  };

  const chartStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "24px",
    height: "350px",
  };

  const chartHeaderStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const cardColors = [
    { bg: "rgba(79, 70, 229, 0.1)", icon: "#4f46e5" },
    { bg: "rgba(245, 158, 11, 0.1)", icon: "#f59e0b" },
    { bg: "rgba(16, 185, 129, 0.1)", icon: "#10b981" },
    { bg: "rgba(239, 68, 68, 0.1)", icon: "#ef4444" },
  ];

  // New styles for Recent Activity box and items
  const recentActivityWrapperStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    maxWidth: "100%",
    minHeight: "220px", // Prevent height jump when content changes
  overflowY: "auto", // Scrollbar if needed, no layout shift
  scrollbarWidth: "thin", // For Firefox
  scrollbarColor: "#cbd5e1 transparent",
  };

  const recentActivityListStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginTop: "16px",
  };

  return (
    <>
      <Navbar />
      <main style={contentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <FaChartLine style={headerIconStyle} />
          <h1 style={headerTextStyle}>Dashboard Overview</h1>
        </div>

        {/* Stat Cards */}
        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            <div
              style={{
                ...iconContainerStyle,
                backgroundColor: cardColors[0].bg,
                color: cardColors[0].icon,
              }}
            >
              <FaBook />
            </div>
            <div style={cardTitleStyle}>Total Courses</div>
            <div style={cardValueStyle}>{stats.totalCourses}</div>
          </div>

          <div style={cardStyle}>
            <div
              style={{
                ...iconContainerStyle,
                backgroundColor: cardColors[1].bg,
                color: cardColors[1].icon,
              }}
            >
              <FaUserGraduate />
            </div>
            <div style={cardTitleStyle}>New Students (7 days)</div>
            <div style={cardValueStyle}>{stats.newStudents}</div>
          </div>

          <div style={cardStyle}>
            <div
              style={{
                ...iconContainerStyle,
                backgroundColor: cardColors[2].bg,
                color: cardColors[2].icon,
              }}
            >
              <FaUsers />
            </div>
            <div style={cardTitleStyle}>Total Users</div>
            <div style={cardValueStyle}>{stats.totalUsers}</div>
          </div>

          <div style={cardStyle}>
            <div
              style={{
                ...iconContainerStyle,
                backgroundColor: cardColors[3].bg,
                color: cardColors[3].icon,
              }}
            >
              <FaProjectDiagram />
            </div>
            <div style={cardTitleStyle}>Projects Submitted</div>
            <div style={cardValueStyle}>{stats.projectSubmitted}</div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={chartsContainerStyle}>
          <div style={chartStyle}>
            <div style={chartHeaderStyle}>
              <FaGraduationCap /> Best Selling Courses
            </div>
            <BestSellingCourseChart />
          </div>

          <div style={chartStyle}>
            <div style={chartHeaderStyle}>
              <FaChartLine /> Visitor Analytics
            </div>
            <VisitorLineChart />
          </div>
        </div>

        {/* Recent Activity Section */}
        <div style={recentActivityWrapperStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 style={{ fontWeight: "600", color: "#334155" }}>
              Recent Activity
            </h3>
            <a
              href="/admin/activity"
              style={{
                color: "#4f46e5",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              View all
            </a>
          </div>

          <div style={recentActivityListStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  backgroundColor: "#c7d2fe",
                  borderRadius: "6px",
                  padding: "6px",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                }}
              >
                <FaUsers color="#4f46e5" />
              </div>
              <div>
                <strong>John Doe</strong> enrolled in{" "}
                <strong>Web Development 101</strong>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  2 hours ago
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  backgroundColor: "#c7d2fe",
                  borderRadius: "6px",
                  padding: "6px",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                }}
              >
                <FaTasks color="#4f46e5" />
              </div>
              <div>
                <strong>Sarah Smith</strong> submitted the{" "}
                <strong>Capstone Project</strong>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  5 hours ago
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  backgroundColor: "#94a3b8",
                  borderRadius: "6px",
                  padding: "6px",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                }}
              >
                <FaBook color="#475569" />
              </div>
              <div>
                New course <strong>Advanced React Patterns</strong> was
                published
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Yesterday
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  backgroundColor: "#c7d2fe",
                  borderRadius: "6px",
                  padding: "6px",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                }}
              >
                <FaUsers color="#4f46e5" />
              </div>
              <div>
                <strong>25 new users</strong> joined the platform this week
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                  2 days ago
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Recent Activity */}
      </main>
    </>
  );
}
