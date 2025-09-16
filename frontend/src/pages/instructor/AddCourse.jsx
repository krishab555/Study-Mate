// src/pages/instructor/AddCourse.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Basic");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null); // New video upload
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !pdfFile || !imageFile) {
      alert("Please fill all required fields and select files");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("pdf", pdfFile);
    formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) alert(data.message || "Failed to create course");
      else {
        alert("Course created successfully!");
       
      }
    } catch (err) {
      console.error(err);
      alert("Error creating course");
    } finally {
      setSubmitting(false);
    }
  };

  // Internal CSS styles
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "30px auto",
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      fontFamily: "'Poppins', sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#0a2a66",
      marginBottom: "35px",
      fontWeight: "700",
      fontSize: "2rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "600",
      fontSize: "1.1rem",
      color: "#333",
    },
    input: {
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1.5px solid #ccc",
      fontSize: "1rem",
      outline: "none",
      transition: "border 0.3s ease",
    },
    inputFocus: {
      borderColor: "#0a2a66",
    },
    select: {
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1.5px solid #ccc",
      fontSize: "1rem",
      outline: "none",
      backgroundColor: "#fff",
      cursor: "pointer",
    },
    textarea: {
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1.5px solid #ccc",
      fontSize: "1rem",
      minHeight: "140px",
      resize: "vertical",
      outline: "none",
      transition: "border 0.3s ease",
    },
    button: {
      padding: "15px",
      fontSize: "1.1rem",
      backgroundColor: "#0a2a66",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: submitting ? "not-allowed" : "pointer",
      fontWeight: "700",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    buttonHover: {
      backgroundColor: "#06305b",
      transform: "scale(1.02)",
    },
    fileInput: {
      marginTop: "6px",
    },
    optionalText: {
      fontSize: "0.9rem",
      color: "#666",
      marginTop: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add a New Course</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Course Title */}
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Course Title <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        {/* Course Description */}
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>
            Course Description <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="description"
            placeholder="Provide a detailed course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        {/* Category */}
        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>
            Course Category <span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
            required
          >
            <option value="Basic">Basic</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Upload PDF */}
        <div style={styles.formGroup}>
          <label htmlFor="pdf" style={styles.label}>
            Upload Course PDF <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="pdf"
            type="file"
            accept=".pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            style={styles.fileInput}
            required
          />
        </div>

        {/* Upload Image */}
        <div style={styles.formGroup}>
          <label htmlFor="image" style={styles.label}>
            Upload Course Image <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={styles.fileInput}
            required
          />
        </div>

        {/* Upload Video (Optional) */}
        <div style={styles.formGroup}>
          <label htmlFor="video" style={styles.label}>
            Upload Course Video <span style={{ color: "#666", fontSize: "0.9rem" }}>(Optional)</span>
          </label>
          <input
            id="video"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            style={styles.fileInput}
          />
          <span style={styles.optionalText}>You can upload a video for your course (optional)</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          style={styles.button}
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
  );
}
