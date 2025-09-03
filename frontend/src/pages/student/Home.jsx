import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const location =useLocation();

  const containerStyle = {
    marginLeft: "230px",
    marginTop: "30px",
    padding: "20px",
    maxWidth: "1000px",  
    marginRight: "20px",
    gap:"20px",
  };

  const cardStyle = {
    backgroundColor: "#f0f4ff",
    borderRadius: "10px",
    padding: " 15px 30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign:"left",
    
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#0B2C5D",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "20px",
  };

  const buttonActiveStyle = {
    backgroundColor: "#093060", // slightly darker when clicked
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* <h2>Welcome to Your Dashboard!</h2> */}
        <h2>
          Every pro was once a Beginner
        </h2>
        <h2>You've taken the first step.Let'skeep going!</h2>
        <button
          style={buttonStyle}
          onMouseDown={(e) => (e.target.style.background = buttonActiveStyle.background)}
          onMouseUp={(e) => (e.target.style.background = buttonStyle.background)}
          onClick={() => navigate("/student/courses")}
        >
          Go to Courses
        </button>
      </div>
    </div>
  );
}
