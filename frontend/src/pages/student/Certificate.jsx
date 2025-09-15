// src/components/student/Certificate.jsx

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
          withCredentials: true, // send cookies or token for auth
        });
        setCertificates(response.data.certificates);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch certificates");
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <p>Loading certificates...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Certificates</h2>
      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {certificates.map((cert) => (
            <li
              key={cert._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h3>Course: {cert.course.title}</h3>
              <p>Issued At: {new Date(cert.issuedAt).toLocaleDateString()}</p>

              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-block", marginBottom: "10px" }}
                >
                  📄 View Certificate
                </a>
              )}
              <br />
              <button
                onClick={() => navigate(`/student/certificate/${cert._id}`)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Certificate;
