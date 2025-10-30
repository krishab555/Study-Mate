import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseContent() {
  const { id } = useParams(); // get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       const data = await res.json();
      // if (!data.success) throw new Error(data.message || "Failed to fetch course");
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
    <div style={{ marginLeft: "250px", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      {/* Video Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Course Material (Video)</h2>
        {course.videos?.length > 0 ? (
          course.videos.map((video, idx) => (
            <a
              key={idx}
              href={video.url}
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
              href={'localhost:5000' + course.pdfUrl}
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
               {course.pdfUrl}
            </a>

        ) : (
          <p>No PDFs uploaded yet.</p>
        )}
        {/* {course.pdfs?.length > 0 ? (
          course.pdfs.map((pdf, idx) => (
            <a
              key={idx}
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
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
              📄 {pdf.title || `PDF ${idx + 1}`}
            </a>
          ))
        ) : (
          <p>No PDFs uploaded yet.</p>
        )} */}
      </div>

      {/* Project Submission */}
      <div>
        <button
          onClick={() => alert("Project submission form will appear here")}
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
    </div>
  );
}
