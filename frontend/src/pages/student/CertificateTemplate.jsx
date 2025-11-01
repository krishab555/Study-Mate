import React from "react";
import certificateBg from "../../assets/Certificate.png"; // your PNG certificate template
// import logo from "../../assets/logo.png"; // replace with your actual logo


const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
};

const CertificateTemplate = ({
  studentName,
  courseTitle,
  issuedDate,
  instructorName,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "1000px",
        height: "700px",
        backgroundImage: `url(${certificateBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "20px auto",
        color: "#0a2a66",
        fontFamily: "'Poppins', sans-serif",
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
      }}
    >
      {/* Logo */}
      {/* <img
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "100px",
          height: "100px",
        }}
      /> */}

      {/* Student Name */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "48%",
          transform: "translate(-50%, -50%)",
          fontSize: "38px",
          fontFamily: "cursive",
          textAlign: "center",
        }}
      >
        {studentName}
      </div>

      {/* Course Paragraph */}
      <div
        style={{
          position: "absolute",
          top: "58%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        has successfully completed the course 
        <strong> {courseTitle} </strong> 
        at  Study-Mate E-learning platform 
      </div>

      {/* Issue Date */}
      <div
        style={{
          position: "absolute",
          top: "66%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        {formatDate(issuedDate)}
      </div>

      {/* Instructor Name */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        <strong>
            InstructorName :
            </strong>
             <strong>{instructorName}</strong>
      </div>
    </div>
  );
};

export default CertificateTemplate;
