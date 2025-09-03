import React from "react";
import BestSellingCourseChart from "../../components/CourseChart";
import VisitorLineChart from "../../components/VisitorLineChart";


import {
  FaBook,
  FaUserGraduate,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";

export default function AdminHome() {
  const containerStyle = {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  };

  const sidebarStyle = {
    width: "230px",
    backgroundColor: "#ffffff", // White sidebar
    color: "#1e3a8a",
    padding: "20px",
    minHeight: "100vh",
    borderRight: "1px solid #ddd",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#1e3a8a",
  };

  const navItemStyle = {
    margin: "20px 0",
    cursor: "pointer",
    fontWeight: "500",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
    paddingTop: "80px", // space for navbar
    overflowY: "auto",
  };

  const cardsContainerStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "nowrap", // force all cards in a row
    justifyContent: "space-between",
    overflowX: "hidden",
  };

  const cardStyle = {
    backgroundColor: "#e8f0fe",
    padding: "20px",
    flex: "1",
    minWidth: "0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
    color: "#1e3a8a",
  };

  const iconStyle = {
    fontSize: "30px",
    marginBottom: "10px",
  };

  const cardTitleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };

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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: "16px",
    color: "#333",
    padding: "20px",
  };

  const instructorSectionStyle = {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  };

  const boxStyle = {
    flex: "1 1 400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  };

  const listStyle = {
    listStyleType: "none",
    paddingLeft: 0,
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={logoStyle}>SM</div>
        <nav>
          <ul style={{ padding: 0, listStyle: "none" }}>
            <li style={navItemStyle}>Dashboard</li>
            <li style={navItemStyle}>Manage Users</li>
            <li style={navItemStyle}>Manage Instructors</li>
            <li style={navItemStyle}>Settings</li>
            <li style={navItemStyle}>Manage FAQs</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
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

        <div style={chartsContainerStyle}>
          <div style={chartStyle}>
            <BestSellingCourseChart />
          </div>
          <div style={chartStyle}>
            <VisitorLineChart />
          </div>
        </div>

        {/* Instructor Section */}
        <div style={instructorSectionStyle}>
          <div style={boxStyle}>
            <h3>Instructor</h3>
            <ul style={listStyle}>
              <li>Parinita Gautam</li>
              <li>Bijita Bhattarai</li>
              <li>Krisha Bhandari</li>
            </ul>
          </div>
          <div style={boxStyle}>
            <h3>Instructor Activity</h3>
            <ul style={listStyle}>
              <li>Krisha Bhandari added quiz in Python</li>
              <li>Parinita Gautam added quiz in Python</li>
              <li>Bijita Bhattarai added quiz in Python</li>
              <li>Parinita Gautam added quiz in Python</li>
              <li>Parinita Gautam added quiz in Python</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
