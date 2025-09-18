import React, { useState } from "react";

const CertificateDetail = () => {
  const [certificate] = useState({
    course: { title: "JavaScript Basics" },
    issuedAt: "2025-08-30T08:03:08.587Z",
    certificateUrl: "https://example.com/certs/js-basics.pdf",
  });

  return (
    <div style={{ padding: "20px", paddingLeft: "280px" }}>
      <h2>Certificate Details</h2>
      <p><strong>Course:</strong> {certificate.course.title}</p>
      <p><strong>Issued At:</strong> {new Date(certificate.issuedAt).toLocaleDateString()}</p>

      
      <div
        style={{
          marginTop: "20px",
          width: "100%",
          height: "600px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#aaa",
          fontSize: "18px",
        }}
      >
        Certificate Preview
      </div>
    </div>
  );
};

export default CertificateDetail;



// // src/components/student/CertificateDetail.jsx

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const CertificateDetail = () => {
//   const { id } = useParams();
//   const [certificate, setCertificate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCertificate = async () => {
//       try {
//         const response = await axios.get(`/api/certificates/${id}`, {
//           withCredentials: true, // send auth credentials if needed
//         });
//         setCertificate(response.data.certificate);
//         setLoading(false);
//       } catch (err) {
//         setError(
//           err.response?.data?.message || "Failed to load certificate details"
//         );
//         setLoading(false);
//       }
//     };

//     fetchCertificate();
//   }, [id]);

//   if (loading) return <p>Loading certificate details...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Certificate Details</h2>
//       <p>
//         <strong>Course:</strong> {certificate.course.title}
//       </p>
//       <p>
//         <strong>Issued At:</strong>{" "}
//         {new Date(certificate.issuedAt).toLocaleDateString()}
//       </p>

//       {certificate.certificateUrl ? (
//         <div style={{ marginTop: "20px" }}>
//           {/* Show certificate as embedded PDF or image */}
//           <iframe
//             src={certificate.certificateUrl}
//             title="Certificate"
//             width="100%"
//             height="600px"
//             style={{ border: "1px solid #ccc" }}
//           ></iframe>
//         </div>
//       ) : (
//         <p>No certificate file available.</p>
//       )}
//     </div>
//   );
// };

// export default CertificateDetail;
