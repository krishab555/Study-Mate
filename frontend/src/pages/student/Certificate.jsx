// // // // // src/components/student/Certificate.jsx

// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { useNavigate } from "react-router-dom";

// // // // const Certificate = () => {
// // // //   const [certificates, setCertificates] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState("");
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     const fetchCertificates = async () => {
// // // //       try {
// // // //         const response = await axios.get("/api/certificates/my-certificates", {
// // // //           withCredentials: true, // send cookies or token for auth
// // // //         });
// // // //         setCertificates(response.data.certificates);
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         setError(err.response?.data?.message || "Failed to fetch certificates");
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchCertificates();
// // // //   }, []);

// // // //   if (loading) return <p>Loading certificates...</p>;
// // // //   if (error) return <p style={{ color: "red" }}>{error}</p>;

// // // //   return (
// // // //     <div style={{ padding: "20px" }}>
// // // //       <h2>My Certificates</h2>
// // // //       {certificates.length === 0 ? (
// // // //         <p>No certificates found.</p>
// // // //       ) : (
// // // //         <ul style={{ listStyle: "none", padding: 0 }}>
// // // //           {certificates.map((cert) => (
// // // //             <li
// // // //               key={cert._id}
// // // //               style={{
// // // //                 border: "1px solid #ccc",
// // // //                 borderRadius: "8px",
// // // //                 padding: "10px",
// // // //                 marginBottom: "10px",
// // // //               }}
// // // //             >
// // // //               <h3>Course: {cert.course.title}</h3>
// // // //               <p>Issued At: {new Date(cert.issuedAt).toLocaleDateString()}</p>

// // // //               {cert.certificateUrl && (
// // // //                 <a
// // // //                   href={cert.certificateUrl}
// // // //                   target="_blank"
// // // //                   rel="noreferrer"
// // // //                   style={{ display: "inline-block", marginBottom: "10px" }}
// // // //                 >
// // // //                   📄 View Certificate
// // // //                 </a>
// // // //               )}
// // // //               <br />
// // // //               <button
// // // //                 onClick={() => navigate(`/student/certificate/${cert._id}`)}
// // // //               >
// // // //                 View Details
// // // //               </button>
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Certificate;
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // const Certificate = () => {
// // //   const [certificates, setCertificates] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchCertificates = async () => {
// // //       try {
// // //         const response = await axios.get("/api/certificates/my-certificates", {
// // //           withCredentials: true, // send cookies or token for auth
// // //         });
// // //         // Defensive check: make sure certificates is an array
// // //         const certs = Array.isArray(response.data.certificates)
// // //           ? response.data.certificates
// // //           : [];
// // //         setCertificates(certs);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError(err.response?.data?.message || "Failed to fetch certificates");
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchCertificates();
// // //   }, []);

// // //   if (loading) return <p>Loading certificates...</p>;
// // //   if (error) return <p style={{ color: "red" }}>{error}</p>;

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h2>My Certificates</h2>
// // //       {certificates.length === 0 ? (
// // //         <p>No certificates found.</p>
// // //       ) : (
// // //         <ul style={{ listStyle: "none", padding: 0 }}>
// // //           {certificates.map((cert) => (
// // //             <li
// // //               key={cert._id}
// // //               style={{
// // //                 border: "1px solid #ccc",
// // //                 borderRadius: "8px",
// // //                 padding: "10px",
// // //                 marginBottom: "10px",
// // //               }}
// // //             >
// // //               <h3>
// // //                 Course: {cert.course ? cert.course.title : "No course info"}
// // //               </h3>
// // //               <p>
// // //                 Issued At:{" "}
// // //                 {cert.issuedAt
// // //                   ? new Date(cert.issuedAt).toLocaleDateString()
// // //                   : "N/A"}
// // //               </p>

// // //               {cert.certificateUrl ? (
// // //                 <a
// // //                   href={cert.certificateUrl}
// // //                   target="_blank"
// // //                   rel="noreferrer"
// // //                   style={{ display: "inline-block", marginBottom: "10px" }}
// // //                 >
// // //                   📄 View Certificate
// // //                 </a>
// // //               ) : null}
// // //               <br />
// // //               <button
// // //                 onClick={() => navigate(`/student/certificate/${cert._id}`)}
// // //               >
// // //                 View Details
// // //               </button>
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Certificate;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const Certificate = () => {
// //   const [certificates, setCertificates] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchCertificates = async () => {
// //       try {
// //         const response = await axios.get("/api/certificates/my-certificates", {
// //           withCredentials: true,
// //         });
// //         // Defensive: ensure certificates is an array or empty array fallback
// //         const certs = Array.isArray(response.data.certificates)
// //           ? response.data.certificates
// //           : [];
// //         setCertificates(certs);
// //       } catch (err) {
// //         setError(err.response?.data?.message || "Failed to fetch certificates");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCertificates();
// //   }, []);

// //   if (loading) return <p>Loading certificates...</p>;
// //   if (error) return <p style={{ color: "red" }}>{error}</p>;

// //   // Defensive: certificates might be undefined, so default to []
// //   const safeCertificates = Array.isArray(certificates) ? certificates : [];

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>My Certificates</h2>
// //       {safeCertificates.length === 0 ? (
// //         <p>No certificates found.</p>
// //       ) : (
// //         <ul style={{ listStyle: "none", padding: 0 }}>
// //           {safeCertificates.map((cert) => (
// //             <li
// //               key={cert._id}
// //               style={{
// //                 border: "1px solid #ccc",
// //                 borderRadius: "8px",
// //                 padding: "10px",
// //                 marginBottom: "10px",
// //               }}
// //             >
// //               <h3>
// //                 Course: {cert.course ? cert.course.title : "No course info"}
// //               </h3>
// //               <p>
// //                 Issued At:{" "}
// //                 {cert.issuedAt
// //                   ? new Date(cert.issuedAt).toLocaleDateString()
// //                   : "N/A"}
// //               </p>

// //               {cert.certificateUrl ? (
// //                 <a
// //                   href={cert.certificateUrl}
// //                   target="_blank"
// //                   rel="noreferrer"
// //                   style={{ display: "inline-block", marginBottom: "10px" }}
// //                 >
// //                   📄 View Certificate
// //                 </a>
// //               ) : null}
// //               <br />
// //               <button
// //                 onClick={() => navigate(`/student/certificate/${cert._id}`)}
// //               >
// //                 View Details
// //               </button>
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };

// // export default Certificate;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Certificate = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const response = await axios.get("/api/certificates/my-certificates", {
//           withCredentials: true,
//         });
//         console.log("Certificates fetched:", response.data.certificates);
//         setCertificates(response.data.certificates);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching certificates:", err);
//         setError(err.response?.data?.message || "Failed to fetch certificates");
//         setLoading(false);
//       }
//     };

//     fetchCertificates();
//   }, []);

//   if (loading) return <p>Loading certificates...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   if (!certificates || certificates.length === 0) {
//     return <p>No certificates found.</p>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Certificates</h2>
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {certificates.map((cert) => (
//           <li
//             key={cert._id}
//             style={{
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               padding: "10px",
//               marginBottom: "10px",
//             }}
//           >
//             <h3>Course: {cert.course?.title || "Unknown Course"}</h3>
//             <p>Issued At: {new Date(cert.issuedAt).toLocaleDateString()}</p>

//             {cert.certificateUrl && (
//               <a
//                 href={cert.certificateUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={{ display: "inline-block", marginBottom: "10px" }}
//               >
//                 📄 View Certificate
//               </a>
//             )}
//             <br />
//             <button
//               onClick={() => navigate(`/student/certificate/${cert._id}`)}
//             >
//               View Details
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Certificate;
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
          withCredentials: true,
        });
        console.log("Full response data:", response.data);

        // Adjust this depending on your actual API response structure
        // For example, if your response has: { success: true, data: [certificates] }
        setCertificates(response.data.data || []);

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
