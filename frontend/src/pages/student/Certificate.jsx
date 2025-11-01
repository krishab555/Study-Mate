import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get("/api/certificates/my-certificates", {
          
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
          
          withCredentials: true,
        });
        console.log("Certificates fetched:", response.data);
        setCertificates(response.data.certificates || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch certificates");
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading)
    return (
      <div style={styles.centerBox}>
        <p style={{ color: "#555" }}>Loading certificates...</p>
      </div>
    );

  if (error)
    return (
      <div style={styles.centerBox}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> My Certificates</h2>

      {certificates.length === 0 ? (
        <div style={styles.emptyBox}>
          <p>No certificates found yet.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {certificates.map((cert) => (
            <div key={cert._id} style={styles.card}>
              <h3 style={styles.courseTitle}>{cert.course.title}</h3>
              <p style={styles.date}>
                Issued on:{" "}
                <span>{new Date(cert.issuedAt).toLocaleDateString()}</span>
              </p>

              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.viewLink}
                >
                   View Certificate
                </a>
              )}

              <button
                onClick={() => navigate(`/student/certificate/${cert._id}`)}
                style={styles.button}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 🎨 Inline Styles
const styles = {
  container: {
    padding: "40px 20px",
    paddingLeft: "280px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "30px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    transition: "all 0.2s ease-in-out",
  },
  courseTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  date: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "15px",
  },
  viewLink: {
    display: "block",
    marginBottom: "10px",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.2s ease",
  },
  emptyBox: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#666",
  },
  centerBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
};

export default Certificate;
