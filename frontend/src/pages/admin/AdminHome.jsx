import React from "react";
import Navbar from "../../components/common/Navbar"; // import your global Navbar
import BestSellingCourseChart from "../../components/CourseChart";
import VisitorLineChart from "../../components/VisitorLineChart";
import {
  FaBook,
  FaUserGraduate,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";

export default function AdminHome() {
  const contentStyle = {
    padding: "20px",
    paddingTop: "80px", // leave space for top navbar
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
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
      <Navbar /> {/* ✅ Top navbar */}
      <main style={contentStyle}>
        {/* Stat Cards */}
        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            <FaBook style={iconStyle} />
            <div style={cardTitleStyle}>Total Course</div>
            <span style={cardValueStyle}>8</span>
          </div>
          <div style={cardStyle}>
            <FaUserGraduate style={iconStyle} />
            <div style={cardTitleStyle}>New Students</div>
            <span style={cardValueStyle}>20</span>
          </div>
          <div style={cardStyle}>
            <FaUsers style={iconStyle} />
            <div style={cardTitleStyle}>Total Users</div>
            <span style={cardValueStyle}>40</span>
          </div>
          <div style={cardStyle}>
            <FaProjectDiagram style={iconStyle} />
            <div style={cardTitleStyle}>Project Submitted</div>
            <span style={cardValueStyle}>13</span>
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
