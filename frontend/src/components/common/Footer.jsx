import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      width: "100%",
      padding: "15px 30px",
      backgroundColor: "#0a2a66",
      color: "white",
      textAlign: "center",
      position: "fixed",
      bottom: 0,
      left: 0,
      boxShadow: "0 -2px 6px rgba(0,0,0,0.2)",
      zIndex: 9999,
    },
    termsSection: {
      padding: "8px 20px",
      fontSize: "14px",
      color: "rgba(255,255,255,0.8)",
    },
    link: {
      color: "white",
      textDecoration: "underline",
      cursor: "pointer",
      marginLeft: "5px",
    },
  };

  return (
    <footer style={styles.footer}>
    
      <div style={styles.termsSection}>
        By using this site, you agree to our
        <span style={styles.link}> Terms & Conditions</span>
      </div>
    </footer>
  );
};

export default Footer;
