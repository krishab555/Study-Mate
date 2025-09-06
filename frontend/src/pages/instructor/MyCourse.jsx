import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/api"; 

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
    const token = getToken();

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
        navigate("/instructor/courses"); // redirect to courses list
      }
     } catch (err) {
      console.error(err);
      alert("Error creating course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button type="submit">Create Course</button>
    </form>
  );
}
