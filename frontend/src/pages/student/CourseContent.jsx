import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseContent() {
  const { id } = useParams(); // get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ gitLink: "", pdf: null });
  const token = localStorage.getItem("token");


   const handleProjectChange = (e) => {
     const { name, value, files } = e.target;
     if (name === "pdf") {
       const file = files[0];
       console.log("Selected PDF file:", files);
       setProjectForm((prev) => ({ ...prev, pdf: files[0] }));
       
     } else {
       setProjectForm((prev) => ({ ...prev, [name]: value }));
     }
   };

   const handleProjectSubmit = async (e) => {
     e.preventDefault();
     if (!projectForm.gitLink || !projectForm.pdf) {
       alert("Please provide both Git link and PDF file.");
       return;
     }
     const formData = new FormData();
     formData.append("pdf", projectForm.pdf);
     formData.append("gitLink", projectForm.gitLink);
     console.log([...formData]);
    
console.log("token:", token);
     try {
       const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
         method: "POST",
         headers: {
           Authorization: `Bearer ${token}`,
         },
         body: formData,
       });

       const data = await res.json();
       if (res.ok) {
         alert("Project submitted successfully!");
         console.log("Project Saved:", data.project);
         setShowModal(false);
         setProjectForm({ gitLink: "", pdf: null });
       } else {
         alert(` Error: ${data.message || "Failed to submit project"}`);
       }
     } catch (error) {
       console.error("Error submitting project:", error);
       alert("Error submitting project");
     }
   };


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       const data = await res.json();
     
      setCourse(data.data); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  if (loading) return <p style={{ marginLeft: "250px" }}>Loading course...</p>;
  if (!course) return <p style={{ marginLeft: "250px" }}>Course not found</p>;

  return (
    <div
      style={{
        marginLeft: "250px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      {/* Video Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Course Material (Video)</h2>
        {Array.isArray(course.videos) && course.videos.length > 0 ? (
          course.videos.map((video, idx) => (
            <a
              key={idx}
              href={`http://localhost:5000${video.url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "15px 20px",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              {video.title || `Video ${idx + 1}`}
            </a>
          ))
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>

      {/* PDF Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Course Material (PDF)</h2>
        {course.pdfUrl ? (
          <a
            href={`http://localhost:5000${course.pdfUrl}`}
            // target="_blank"
            // rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "15px 20px",
              backgroundColor: "#f39c12",
              color: "white",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            {course.pdfUrl.split("/").pop()}
          </a>
        ) : (
          <p>No PDFs uploaded yet.</p>
        )}
      </div>

      {/* Project Submission */}
      <div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Submit Project
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>Submit Your Project</h2>
            <form
              onSubmit={handleProjectSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <label>
                Git Link:
                <input
                  type="url"
                  name="gitLink"
                  placeholder="Enter Git repository link"
                  value={projectForm.gitLink}
                  onChange={handleProjectChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
              <label>
                Upload PDF:
                <input
                  type="file"
                  name="pdf"
                  accept=".pdf"
                  onChange={handleProjectChange}
                  required
                  style={{
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              </label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#ccc",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
