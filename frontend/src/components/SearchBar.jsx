import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState({
    courses: [],
    instructors: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const wrapperRef = useRef(null);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions({ courses: [], instructors: [] });
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.success) setSuggestions(data.data);
      } catch (err) {
        console.error(err);
        setSuggestions({ courses: [], instructors: [] });
      }
    };

    fetchSuggestions();
  }, [query, token]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) navigate(`/search?query=${encodeURIComponent(trimmed)}`);
      setShowDropdown(false);
    }
  };

  const itemStyle = {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        placeholder="Search courses or instructors..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onKeyDown={handleEnter}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {showDropdown &&
        (suggestions.courses.length > 0 ||
          suggestions.instructors.length > 0) && (
          <div
            style={{
              position: "absolute",
              top: "38px",
              width: "100%",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              zIndex: 1000,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {suggestions.courses.map((course) => (
              <div
                key={course._id}
                style={itemStyle}
                onClick={() => navigate(`/course/${course._id}`)}
              >
                <strong>{course.title}</strong>{" "}
                <span style={{ fontSize: "12px", color: "gray" }}>
                  ({course.instructor?.name || "Unknown"})
                </span>
              </div>
            ))}

            {suggestions.instructors.map((inst) => (
              <div
                key={inst._id}
                style={itemStyle}
                onClick={() => navigate(`/profile/${inst._id}`)}
              >
                <strong>{inst.name}</strong>{" "}
                <span style={{ fontSize: "12px", color: "gray" }}>
                  {inst.email || ""}
                </span>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
