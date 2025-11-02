
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Basic");
  const [syllabus, setSyllabus] = useState(""); 
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [syllabusLevels, setSyllabusLevels] = useState([
    { level: 1, content: "" },
  ]);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const addSyllabusLevel = () => {
    setSyllabusLevels((prev) => [
      ...prev,
      { level: prev.length + 1, content: "" },
    ]);
  };

  const updateSyllabusContent = (index, value) => {
    const newLevels = [...syllabusLevels];
    newLevels[index].content = value;
    setSyllabusLevels(newLevels);
  };

  useEffect(() => {
    if (role !== "Admin") {
      alert("You are not authorized to access this page");
      navigate("/");
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
          setInstructors(data.data);
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

    if (
      !title ||
      !description ||
      !category ||
      !pdfFile ||
      !imageFile ||
      !selectedInstructor 
      
    ) {
      alert("Please fill all required fields and select files");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    const filteredSyllabus = syllabusLevels.filter(
      (level) => level.content.trim() !== ""
    );
    if (filteredSyllabus.length === 0) {
      alert("Please add at least one syllabus level with content");
      setSubmitting(false);
      return;
    }
    formData.append("syllabus", JSON.stringify(filteredSyllabus)); 
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
      marginLeft: "280px",
      marginTop: "80px",
      maxWidth: "800px",
      padding: "40px",
      backgroundColor: "#fff",
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
    },
    fileInput: { marginTop: "6px" },
    optionalText: { fontSize: "0.9rem", color: "#666", marginTop: "4px" },
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
          {/* {category === "Advanced" && (
            <div style={styles.formGroup}>
              <label htmlFor="price" style={styles.label}>
                Price (Rs) <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ ...styles.input, width: "150px" }}
                placeholder="Enter course price"
                required={category === "Advanced"}
              />
            </div>
          )} */}

          {/* Syllabus */}
          <div style={styles.formGroup}>
            <label htmlFor="syllabus" style={styles.label}>
              Syllabus <span style={{ color: "red" }}>*</span>
            </label>

            {syllabusLevels.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  position: "relative",
                }}
              >
                <textarea
                  placeholder={`Level ${item.level} content`}
                  value={item.content}
                  onChange={(e) => updateSyllabusContent(index, e.target.value)}
                  style={{
                    ...styles.textarea,
                    flex: 1,
                    minHeight: "40px", // small height
                    paddingRight: "40px",
                  }}
                />
                <button
                  type="button"
                  onClick={addSyllabusLevel}
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "4px 8px",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>


          {/* Instructor */}
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

          {/* PDF */}
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

          {/* Image */}
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

          {/* Video */}
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
              Optional video for the course
            </span>
          </div>

          {/* Submit */}
          <button type="submit" disabled={submitting} style={styles.button}>
            {submitting ? "Submitting..." : "Create Course"}
          </button>
        </form>
      </div>
    </>
  );
}
