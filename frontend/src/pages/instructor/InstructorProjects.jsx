import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function InstructorProjects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [feedbacks, setFeedbacks] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/projects/instructor/all",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data?.projects) setProjects(data.projects);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, [token]);

  const handleReview = async (projectId, status, feedback = "") => {
    if (
      !window.confirm(
        `Are you sure you want to mark this project as ${status}?`
      )
    )
      return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/projects/${projectId}/review`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status, feedback }),
        }
      );

      if (!res.ok) throw new Error("Failed to update project");

      setProjects((prev) =>
        prev.map((proj) =>
          proj._id === projectId ? { ...proj, status, feedback } : proj
        )
      );
      alert(`Project ${status} successfully!`);
    } catch (err) {
      console.error("Failed to review project", err);
      alert("Error reviewing project");
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleFeedbackChange = (projectId, value) => {
    setFeedbacks((prev) => ({ ...prev, [projectId]: value }));
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
          Projects Submitted
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead style={{ backgroundColor: "#1e3a8a", color: "white" }}>
            <tr>
              <th style={{ padding: "10px" }}>Course</th>
              <th style={{ padding: "10px" }}>Student</th>
              <th style={{ padding: "10px" }}>GitHub Link</th>
              <th style={{ padding: "10px" }}>PDF Link</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Review</th>
            </tr>
          </thead>

          <tbody>
            {projects.length > 0 ? (
              projects.map((proj) => (
                <tr key={proj._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>
                    {proj.course?.title || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {proj.student?.name || "N/A"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {proj.gitLink ? (
                      <a
                        href={proj.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          padding: "6px 10px",
                          backgroundColor: "#365285",
                          color: "white",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                      >
                        View Repo
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {proj.projectFile ? (
                      <a
                        href={`http://localhost:5000/uploads/projects/${proj.projectFile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          padding: "6px 10px",
                          backgroundColor: "#365285",
                          color: "white",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                      >
                        View PDF
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        color:
                          proj.status === "Approved"
                            ? "green"
                            : proj.status === "Rejected"
                            ? "#b34040ff"
                            : "#555",
                        fontWeight: "bold",
                      }}
                    >
                      {proj.status || "Pending"}
                    </span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#1e3a8a",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleReview(proj._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#5f1b1bff",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => openModal(proj)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: "20px", color: "#555" }}>
                  No projects submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Feedback Modal */}
        {showModal && selectedProject && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
              }}
            >
              <h3>Provide Feedback</h3>
              <textarea
                value={feedbacks[selectedProject._id] || ""}
                onChange={(e) =>
                  handleFeedbackChange(selectedProject._id, e.target.value)
                }
                placeholder="Enter reason for rejection..."
                style={{ width: "100%", height: "100px", marginBottom: "10px" }}
              />
              <div style={{ textAlign: "right" }}>
                <button
                  onClick={() => {
                    handleReview(
                      selectedProject._id,
                      "Rejected",
                      feedbacks[selectedProject._id]
                    );
                    setShowModal(false);
                  }}
                  style={{
                    marginRight: "10px",
                    background: "#dc2626",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Submit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "#ccc",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
