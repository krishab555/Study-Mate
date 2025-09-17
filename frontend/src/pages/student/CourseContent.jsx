import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CourseContent() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((err) => console.error("Error fetching course:", err));
  }, [id]);

  if (!course) return <p>Loading course...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <div>
        {course.pdf && (
          <a href={`http://localhost:5000${course.pdf}`} target="_blank" rel="noreferrer">
            Download PDF
          </a>
        )}
        {course.video && (
          <video src={`http://localhost:5000${course.video}`} controls width="600" />
        )}
      </div>
    </div>
  );
}
