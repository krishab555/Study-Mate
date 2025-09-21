import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function SearchResults() {
  const [results, setResults] = useState({ courses: [], instructors: [] });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem("token");
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query")?.trim() || "";

  useEffect(() => {
    if (!query) {
      setResults({ courses: [], instructors: [] });
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        if (data.success) {
          setResults({
            courses: data.data.courses || [],
            instructors: data.data.instructors || [],
          });
        } else {
          setResults({ courses: [], instructors: [] });
        }
      } catch (err) {
        console.error(err);
        setResults({ courses: [], instructors: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, token]);

  return (
    <div style={{ marginLeft: "280px", marginTop: "80px", padding: "20px" }}>
      <h2>Search Results for "{query}"</h2>

      {loading ? (
        <p>Loading results...</p>
      ) : (
        <>
          <section>
            <h3>Courses</h3>
            {results.courses.length === 0 ? (
              <p>No courses found.</p>
            ) : (
              results.courses.map((course) => (
                <div
                  key={course._id}
                  style={{ marginBottom: "10px", padding: "5px 0" }}
                >
                  <Link
                    to={`/course/${course._id}`}
                    style={{
                      fontWeight: 600,
                      color: "#0a2a66",
                      textDecoration: "none",
                    }}
                  >
                    {course.title}
                  </Link>
                  <p style={{ margin: "2px 0" }}>
                    Instructor: {course.instructor?.name || "Unknown"}
                  </p>
                </div>
              ))
            )}
          </section>

          <section style={{ marginTop: "20px" }}>
            <h3>Instructors</h3>
            {results.instructors.length === 0 ? (
              <p>No instructors found.</p>
            ) : (
              results.instructors.map((inst) => (
                <div
                  key={inst._id}
                  style={{ marginBottom: "10px", padding: "5px 0" }}
                >
                  <p style={{ fontWeight: 600 }}>{inst.name}</p>
                  <p style={{ margin: "2px 0", color: "gray" }}>
                    Email: {inst.email || "N/A"}
                  </p>
                </div>
              ))
            )}
          </section>
        </>
      )}
    </div>
  );
}
