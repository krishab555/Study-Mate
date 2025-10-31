import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";

export default function InstructorProjects() {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/projects/instructor/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (data?.projects) setProjects(data.projects);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };
    fetchProjects();
  }, [token]);

  const handleReview = async (projectId, status) => {
    if (
      !window.confirm(
        `Are you sure you want to mark this project as ${status}?`
      )
    )
      return;
    try {
      await fetch(`http://localhost:5000/api/projects/${projectId}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      setProjects((prev) =>
        prev.map((proj) =>
          proj._id === projectId ? { ...proj, status } : proj
        )
      );
      alert(`Project ${status} successfully!`);
    } catch (err) {
      console.error("Failed to review project", err);
    }
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
          style={{
            marginBottom: "20px",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Projects Submitted
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                          color: "#1e3a8a",
                          textDecoration: "underline",
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
                          color: "#1e3a8a",
                          textDecoration: "underline",
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
                            ? "red"
                            : "#555",
                        fontWeight: "bold",
                      }}
                    >
                      {proj.status || "Pending"}
                    </span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
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
                        onClick={() => handleReview(proj._id, "Rejected")}
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
                  colSpan="6"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#555",
                  }}
                >
                  No projects submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </>
  );
}
