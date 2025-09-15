
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

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
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

  if (loading) return <p style={{ padding: "20px" }}>Loading course...</p>;
  if (!course) return <p style={{ padding: "20px" }}>Course not found</p>;

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div
          style={{
            padding: "30px 20px 60px",
            maxWidth: "1100px",
            margin: "0 auto",
            marginTop: "30px",
          }}
        >
          {/* Banner Image */}
          <div
            style={{
              width: "100%",
              height: "240px",
              backgroundColor: "#ddd",
              borderRadius: "10px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {course.banner ? (
              <img
                src={course.banner}
                alt={course.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <p style={{ color: "#555" }}>No Image Available</p>
            )}
          </div>

          {/* Main Content Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            {/* Course Info */}
            <div style={{ flex: "2", minWidth: "300px" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Course Information
              </h2>

              <p style={{ marginBottom: "10px" }}>
                <strong>Title</strong>
                <br />
                {course.title}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <strong>Duration</strong>
                <br />
                {course.duration || "N/A"}
              </p>

              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                Course Description
              </p>
              <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
                {course.description}
              </p>

              {/* How to Complete Section */}
              {course.howToComplete?.length > 0 && (
                <div style={{ marginBottom: "25px" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: "#000",
                    }}
                  >
                    How to Complete this e-Course
                  </h3>
                  <ol
                    style={{
                      paddingLeft: "20px",
                      lineHeight: "1.8",
                      fontSize: "15px",
                      color: "#333",
                    }}
                  >
                    {course.howToComplete.map((step, index) => {
                      const [boldText, ...rest] = step.split(" – ");
                      return (
                        <li key={index} style={{ marginBottom: "10px" }}>
                          <span style={{ fontWeight: "bold" }}>{boldText}</span>
                          {rest.length > 0 && ` – ${rest.join(" – ")}`}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}

              {/* Pricing and Payment */}
              <div style={{ marginBottom: "15px" }}>
                <strong>Premium:</strong> Rs {course.price}
              </div>

              {/* Pay Now Button */}
              <div style={{ marginTop: "20px" }}>
                <button
                  style={{
                    width: "180px",
                    padding: "10px",
                    backgroundColor: "#0B2C5D",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate(`/courses/${course._id}/payment`)}
                >
                  Pay Now
                </button>
              </div>
            </div>

            {/* Instructor Info Box */}
            <div
              style={{
                flex: "1",
                minWidth: "250px",
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "360px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Instructor Image */}
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#ddd",
                }}
              >
                {course.instructor?.photo ? (
                  <img
                    src={course.instructor.photo}
                    alt={course.instructor.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      lineHeight: "200px",
                      color: "#888",
                    }}
                  >
                    No Image
                  </p>
                )}
              </div>

              {/* Instructor Info */}
              <div
                style={{
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginBottom: "5px",
                  }}
                >
                  Instructor
                </p>
                <p style={{ fontSize: "14px", color: "#333" }}>
                  {course.instructor?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
      <Footer />
    </div>
  );
}
