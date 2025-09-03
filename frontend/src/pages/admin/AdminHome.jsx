import React from "react";

export default function AdminHome() {
  const containerStyle = {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f3f4f6",
  };

  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#1e3a8a",
    color: "#fff",
    padding: "20px",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
  };

  const navItemStyle = {
    margin: "20px 0",
    cursor: "pointer",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  };

  const cardsContainerStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    flex: 1,
    borderRadius: "10px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
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
  };

  const chartStyle = {
    flex: 1,
    height: "250px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const instructorSectionStyle = {
    display: "flex",
    gap: "20px",
  };

  const boxStyle = {
    flex: 1,
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
            <li style={navItemStyle}>Setting</li>
            <li style={navItemStyle}>Manage FAQs</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={contentStyle}>
        {/* Stats Cards */}
        <div style={cardsContainerStyle}>
          <div style={cardStyle}>
            Total Course <span style={cardValueStyle}>8</span>
          </div>
          <div style={cardStyle}>
            New Students <span style={cardValueStyle}>20</span>
          </div>
          <div style={cardStyle}>
            Total Users <span style={cardValueStyle}>40</span>
          </div>
          <div style={cardStyle}>
            Project Submitted <span style={cardValueStyle}>13</span>
          </div>
        </div>

        {/* Charts */}
        <div style={chartsContainerStyle}>
          <div style={chartStyle}>Best Selling Course (Pie Chart)</div>
          <div style={chartStyle}>Visitor in The Website (Line Chart)</div>
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
              <li>Parinita Gautam added quiz in Python</li>
              <li>Parinita Gautam added quiz in Python</li>
              <li>Parinita Gautam added quiz in Python</li>
              <li>Parinita Gautam added quiz in Python</li>
              <li>Parinita Gautam added quiz in Python</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
