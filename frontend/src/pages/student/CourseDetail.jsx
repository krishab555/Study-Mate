import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { SidebarLayout } from "../../components/common/SideBar";
import { apiRequest } from "../../utils/api";
 

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
        setLoading(true);
      try {
        const token = localStorage.getItem("token");

        // Make sure endpoint does NOT include a colon
        const response = await apiRequest({ endpoint: `/courses/${id}` });

        if (!response.success) {
          alert(response.message);
          if (response.message === "You must be logged in") {
            navigate("/login");
          }
          return;
        }

        setCourse(response.data);
      } catch (err) {
        console.error(err);
        alert("Something went wrong while fetching the course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  if (loading)
    return <p style={{ padding: "20px" }}>Loading course...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  if (!course) return <p style={{ padding: "20px" }}>Course not found</p>;

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div
          style={{
            padding: "20px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
            {/* Banner Image */}
          {course.banner && (
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <img
                src={course.banner}
                alt={course.title}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "12px",
                }}
              />
            </div>
          )}


          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <h2 style={{ color: "#0B2C5D", fontSize: "2rem", fontWeight: "600" }}>
              Course Information
            </h2>

            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                <div style={{ flex:"2"}}>
                    <p>
                  <strong>Title:</strong> {course.title}
                  </p>
              <p><strong>Duration:</strong> {course.duration || "N/A"}</p>
              
            </div>

            <p style={{ marginTop: "15px", lineHeight: "1.6" }}>
              {course.description}
            </p>
            {course.howToComplete?.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    <h3>How to Complete this e-Course</h3>
                    <ol style={{ marginTop: "10px", paddingLeft: "20px" }}>
                      {course.howToComplete.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

            <h3 style={{ marginTop: "20px" }}>Premium: Rs {course.price}</h3>

            <button
              style={{
                padding: "12px 25px",
                background: "#0B2C5D",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "fit-content",
                marginTop: "15px",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={() => {
                if (course.isPaid) {
                  navigate(`/courses/${course._id}/content`);
                } else {
                  navigate(`/courses/${course._id}/payment`);
                }
              }}
            >
              {course.isPaid ? "Go to Course Content" : "Pay Now"}
            </button>
          </div>
       {course.instructor && (
                <div
                  style={{
                    flex: "1",
                    background: "#f5f5f5",
                    borderRadius: "8px",
                    padding: "15px",
                    textAlign: "center",
                  }}
                >
                  {course.instructor.photo && (
                    <img
                      src={course.instructor.photo}
                      alt={course.instructor.name}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <p>
                    <strong>Instructor</strong>
                  </p>
                  <p>{course.instructor.name}</p>
                </div>
              )}
            </div>
          </div>
        
      </SidebarLayout>
      <Footer />
    </div>
  );
}

