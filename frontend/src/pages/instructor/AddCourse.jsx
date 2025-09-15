
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !pdfFile || !imageFile) {
      alert("Please fill all fields and select files");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("pdf", pdfFile);
    formData.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create course");
      } else {
        alert("Course created successfully!");
        navigate("/instructor/courses");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "220px",
          backgroundColor: "#0a2a66",
          color: "white",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2>Study Mate</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "20px 0" }}>Dashboard</li>
          <li style={{ margin: "20px 0" }}>Add Courses</li>
          <li style={{ margin: "20px 0" }}>Discussion Forum</li>
          <li style={{ margin: "20px 0" }}>Profile</li>
        </ul>
      </nav>

      {/* Main Content Container */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          boxSizing: "border-box",
          backgroundColor: "#f0f4ff",
        }}
      >
        {/* Centered form container */}
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "#f9faff",
            padding: "30px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#0a2a66",
              marginBottom: "30px",
              fontWeight: "700",
              fontSize: "1.8rem",
            }}
          >
            Add a New Course
          </h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Course Title */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="title"
                style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                Course Title <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  padding: "12px 15px",
                  borderRadius: "6px",
                  border: "1.5px solid #ccc",
                  fontSize: "1rem",
                  outlineColor: "#0a2a66",
                  transition: "border-color 0.3s ease",
                }}
                required
              />
            </div>

            {/* Course Description */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="description"
                style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                Course Description <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="description"
                placeholder="Provide a detailed course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  padding: "12px 15px",
                  borderRadius: "6px",
                  border: "1.5px solid #ccc",
                  fontSize: "1rem",
                  minHeight: "140px",
                  resize: "vertical",
                  outlineColor: "#0a2a66",
                  transition: "border-color 0.3s ease",
                }}
                required
              />
            </div>

            {/* Upload PDF */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="pdf"
                style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                Upload Course PDF <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="pdf"
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                style={{
                  padding: "6px",
                  fontSize: "1rem",
                }}
                required
              />
            </div>

            {/* Upload Image */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="image"
                style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                Upload Course Image <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{
                  padding: "6px",
                  fontSize: "1rem",
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "15px",
                fontSize: "1.1rem",
                backgroundColor: "#0a2a66",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: submitting ? "not-allowed" : "pointer",
                fontWeight: "700",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                !submitting && (e.target.style.backgroundColor = "#06305b")
              }
              onMouseLeave={(e) =>
                !submitting && (e.target.style.backgroundColor = "#0a2a66")
              }
            >
              {submitting ? "Submitting..." : "Create Course"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
