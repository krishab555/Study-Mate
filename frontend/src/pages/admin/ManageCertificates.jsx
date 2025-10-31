import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function ManageCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch pending certificates
  useEffect(() => {
    const fetchCertificates = async () => {

        console.log("Fetching pending certificates");
      try {
        const res = await fetch(
          "http://localhost:5000/api/certificates/pending",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
         console.log("Fetched certificates:", data.certificates);
        if (data?.certificates) setCertificates(data.certificates);
      } catch (err) {
        console.error("Error fetching certificates:", err);
      }
    };
    fetchCertificates();
  }, [token]);

  // ✅ Approve Certificate
  const handleApprove = async (id) => {
    if (!window.confirm("Approve this certificate?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/certificates/review/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "Issued" }),
        }
      );

      if (res.ok) {
        alert("Certificate approved successfully!");
        setCertificates((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error("Error approving certificate:", err);
    }
  };

  // ✅ Open reject modal
  const openRejectModal = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  // ✅ Submit rejection with feedback
  const handleReject = async () => {
    if (!selectedCertificate) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/certificates/review/${selectedCertificate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "Rejected",
            adminFeedback: feedback,
          }),
        }
      );

      if (res.ok) {
        alert("Certificate rejected successfully!");
        setCertificates((prev) =>
          prev.filter((c) => c._id !== selectedCertificate._id)
        );
        closeModal();
      }
    } catch (err) {
      console.error("Error rejecting certificate:", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedback("");
  };

  return (
    <>
      <Navbar />
      <main
        style={{
          padding: "20px",
          paddingTop: "80px",
          marginLeft: "280px",
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        <h2
          style={{ marginBottom: "20px", fontSize: "22px", fontWeight: "bold" }}
        >
          Certificate Approvals
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <thead style={{ backgroundColor: "#1e3a8a", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>Course</th>
              <th style={{ padding: "10px" }}>Student</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Date</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <tr key={cert._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>
                    {cert.course?.title || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {cert.student?.name || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {cert.student?.email || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {new Date(cert.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#1e3a8a",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleApprove(cert._id)}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          backgroundColor: "#b91c1c",
                          color: "white",
                          border: "none",
                          padding: "6px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => openRejectModal(cert)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "20px",
                    color: "#555",
                    textAlign: "center",
                  }}
                >
                  No pending certificates
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Feedback Modal */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "400px",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Reject Certificate</h3>
              <textarea
                placeholder="Enter feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{
                  width: "100%",
                  height: "80px",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  style={{
                    backgroundColor: "#b91c1c",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
