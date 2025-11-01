import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CertificateTemplate from "./CertificateTemplate";

export default function CertificateDetail() {
  const { id } = useParams();
  console.log("Certificate ID:", id); // get certificate id from URL
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`/api/certificates/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });
        setCertificate(response.data.certificate); 
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch certificate");
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) return <p>Loading certificate...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!certificate) return <p>No certificate found</p>;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <CertificateTemplate
        studentName={certificate.student.name || "Student Name"}
        courseTitle={certificate.course.title || "Course Title"}
        issuedDate={certificate.issuedAt  || new Date().toDateString()}
        instructorName={certificate.instructor.name || "Instructor Name" } 
      />
    </div>
  );
}
