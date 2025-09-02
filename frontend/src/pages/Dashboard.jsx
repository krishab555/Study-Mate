import React, { useState } from "react";
import Login from "./Login"; // import your Login.jsx

export default function Dashboard() {
  const [showLogin, setShowLogin] = useState(false);

  const styles = {
    navbar: {
      width: "100%",
      backgroundColor: "#0a2a66",
      color: "white",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    navLinks: {
      display: "flex",
      gap: "20px",
      listStyle: "none",
    },
    navItem: {
      cursor: "pointer",
    },
    searchInput: {
      padding: "5px 10px",
      borderRadius: "4px",
      border: "none",
      marginRight: "10px",
    },
    loginBtn: {
      backgroundColor: "white",
      color: "#0a2a66",
      padding: "6px 14px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      maxWidth: "450px",
      width: "100%",
    },
    closeBtn: {
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "6px 12px",
      cursor: "pointer",
      float: "right",
      marginBottom: "10px",
    },
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={{ fontSize: "22px", fontWeight: "bold" }}>SM</div>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>Home</li>
          <li style={styles.navItem}>Courses</li>
          <li style={styles.navItem}>FAQs</li>
          <li style={styles.navItem}>Contact</li>
        </ul>
        <div>
          <input type="text" placeholder="Search" style={styles.searchInput} />
          <button style={styles.loginBtn} onClick={() => setShowLogin(true)}>
            Login
          </button>
        </div>
      </nav>

      {/* Show Login Modal */}
      {showLogin && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeBtn} onClick={() => setShowLogin(false)}>
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
}
