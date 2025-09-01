import React from "react";

const Loader = ({ fullscreen = true }) => {
  const containerStyle = {
    height: fullscreen ? "100vh" : "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px", // spacing between dots
  };

  const dotStyle = (delay) => ({
    width: "16px",
    height: "16px",
    backgroundColor: "#1f2937", // gray-800
    borderRadius: "50%",
    animation: "bounce 0.6s infinite",
    animationDelay: delay,
  });

  return (
    <div style={containerStyle}>
      <div style={dotStyle("0s")}></div>
      <div style={dotStyle("0.2s")}></div>
      <div style={dotStyle("0.4s")}></div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
