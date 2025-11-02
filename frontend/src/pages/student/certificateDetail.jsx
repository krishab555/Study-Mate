import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import CertificateTemplate from "./CertificateTemplate";
import html2canvas from "html2canvas";

export default function CertificateDetail() {
  const { id } = useParams();
  console.log("Certificate ID:", id); // get certificate id from URL
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      console.log("Current location:", location.pathname);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/certificates/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCertificate(response.data.certificate); 
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch certificate");
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = `${certificate.course.title}_Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (loading) return <p>Loading certificate...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!certificate) return <p>No certificate found</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        position: "relative",
      }}
    >
      <div ref={certificateRef}>
        <CertificateTemplate
          studentName={certificate.student.name || "Student Name"}
          courseTitle={certificate.course.title || "Course Title"}
          issuedDate={certificate.issuedAt || new Date().toDateString()}
          instructorName={certificate.instructor.name || "Instructor Name"}
        />
      </div>
      <button
        onClick={handleDownload}
        style={{
          position: "absolute",
          top: "40px",
          right: "10px",
          // marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download Certificate
      </button>
    </div>
  );
}
