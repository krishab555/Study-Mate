import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "../../components/common/Navbar";

import CourseCard from "./components/CourseCard";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch enrolled courses from backend
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/courses/enrolled", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setCourses(data.data);
      } catch (err) {
        console.log("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        
        <Header title="Student Dashboard" />
        <h2>My Courses</h2>
        {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {courses.length > 0 ? (
            courses.map((course) => <CourseCard key={course._id} course={course} />)
          ) : (
            <p>No courses enrolled yet.</p>
          )}
        </div> */}
      </div>
    </div>
  );
}
