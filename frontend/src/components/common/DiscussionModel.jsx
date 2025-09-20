import React, { useState } from "react";

export default function DiscussionModal({ isOpen, onClose, onPost, courses }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          width: "400px",
          maxWidth: "95%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h3
          style={{ marginBottom: "16px", fontSize: "20px", color: "#0B2C5D" }}
        >
          Start a Discussion
        </h3>
        <input
          type="text"
          placeholder="Course"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "95%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
          }}
        />
        <textarea
          placeholder="Query"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "95%",
            padding: "10px",
            marginBottom: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
            minHeight: "120px",
            outline: "none",
            resize: "none",
          }}
        />
        <select
          // className="discussion-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              background: "#f5f5f5",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onMouseOver={(e) => (e.target.style.background = "#e0e0e0")}
            onMouseOut={(e) => (e.target.style.background = "#f5f5f5")}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!title || !description || !selectedCourse) {
                return alert("Title, content, and course are required");
              }
              onPost(title, description, selectedCourse);
              setTitle("");
              setDescription("");
              setSelectedCourse("");
            }}
            style={{
              padding: "8px 16px",
              background: "#0B2C5D",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onMouseOver={(e) => (e.target.style.background = "#174a91")}
            onMouseOut={(e) => (e.target.style.background = "#0B2C5D")}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
