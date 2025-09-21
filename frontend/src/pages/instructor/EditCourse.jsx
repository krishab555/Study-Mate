import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

export default function EditCourse() {
  const { id } = useParams(); // course id
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Basic");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Redirect non-instructor
  useEffect(() => {
    if (role !== "Instructor") {
      alert("Not authorized");
      navigate("/");
    }
  }, [role, navigate]);

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setCourse(data.data);
          setTitle(data.data.title);
          setDescription(data.data.description);
          setCategory(data.data.category);
        } else alert(data.message || "Failed to fetch course");
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (pdfFile) formData.append("pdf", pdfFile);
    if (imageFile) formData.append("image", imageFile);
    if (videoFile) formData.append("video", videoFile);

    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) alert(data.message || "Failed to update course");
      else {
        alert("Course updated successfully!");
        navigate("/instructor/home");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating course");
    } finally {
      setSubmitting(false);
    }
  };

  if (!course) return <p>Loading course details...</p>;
  const styles = {
    container: {
      marginLeft: "280px", // Adjust for sidebar
      marginTop: "80px", // Adjust for navbar
      maxWidth: "800px",
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
    <>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.heading}>Edit Course</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={styles.formGroup}>
            <label
              style={{
                marginBottom: "8px",
                fontWeight: "600",
                fontSize: "1.1rem",
              }}
            >
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.textarea}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.select}
              required
            >
              <option value="Basic">Basic</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Update PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Update Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Update Video (Optional)</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "15px",
              backgroundColor: "#0a2a66",
              color: "#fff",
              borderRadius: "8px",
              width: "100%",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </>
  );
}
