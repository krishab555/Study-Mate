
import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar"; // Make sure this path is correct

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Basic");
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const navigate = useNavigate();
  
  const role = localStorage.getItem("role"); // assuming you store role in localStorage

  useEffect(() => {
    if (role !== "Admin") {
      alert("You are not authorized to access this page");
      navigate("/"); // redirect unauthorized users
    }
  }, [role, navigate]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/users/instructors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
       if (res.ok && data.success) {
         setInstructors(data.data); // <- important! check your backend structure
       } else {
         console.error("Failed to fetch instructors:", data.message);
       }
      } catch (err) {
        console.error("Failed to load instructors", err);
      }
    };
    fetchInstructors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !pdfFile || !imageFile || !selectedInstructor) {
      alert("Please fill all required fields and select files");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("instructorId", selectedInstructor);
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
        navigate("/admin/manage-courses");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating course");
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    container: {
      marginLeft: "280px", // Adjust for sidebar
      marginTop: "80px",   // Adjust for navbar
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

          {/* Instructor Assignment */}
          <div style={styles.formGroup}>
            <label htmlFor="instructor" style={styles.label}>
              Assign Instructor <span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="instructor"
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">Select Instructor</option>
              {instructors.map((inst) => (
                <option key={inst._id} value={inst._id}>
                  {inst.name}
                </option>
              ))}
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
              Upload Course Video{" "}
              <span style={{ color: "#666", fontSize: "0.9rem" }}>
                (Optional)
              </span>
            </label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              style={styles.fileInput}
            />
            <span style={styles.optionalText}>
              You can upload a video for your course (optional)
            </span>
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
    </>
  );
}
