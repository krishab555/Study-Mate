import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Student";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{title}</h1>
      <div style={styles.userSection}>
        <span style={styles.userName}>Hi, {userName}</span>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #ddd",
    background: "#f5f5f5",
    marginBottom: "20px",
  },
  title: {
    fontSize: "22px",
    color: "#0B2C5D",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  userName: {
    fontWeight: "500",
    fontSize: "16px",
  },
  logoutButton: {
    padding: "8px 12px",
    background: "#0B2C5D",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
