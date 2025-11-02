import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { SidebarLayout } from "../../components/common/SideBar";
import { apiRequest } from "../../utils/api";
import { FiChevronDown } from "react-icons/fi";

const stripePromise = loadStripe(
  "pk_test_51SN5gnQyJLqGP2AyftMe6eacdb1aUSGwsoA1v08CvxHzFemvn9WSB4fd0KmX4nfbL6ZdlT45WuXzA4gNqWtpI1vS00wqwNy9bW"
);

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [courseIspaid, setCourseIspaid] = useState(false);
  const [enrollment_status, setEnrollment_status] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const query = new URLSearchParams(location.search);
  const paymentSuccess = query.get("success") === "true";
  const [openLevel, setOpenLevel] = useState(null);
  console.log(typeof paymentSuccess);

  // ✅ Auto-enroll student after successful payment
  useEffect(() => {
    const enrollAfterPayment = async () => {
      console.log("Payment successful, enrolling student...");
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const paymentRes = await fetch(
          `http://localhost:5000/api/payments/latest/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const paymentData = await paymentRes.json();

        if (!paymentRes.ok) {
          console.warn("Failed to fetch payment:", paymentData.message);
          return;
        }

        const paymentId = paymentData.payment?._id;
        if (!paymentId) {
          console.warn("No payment ID found.");
          return;
        }

        // ✅ STEP 2: Enroll student with real payment ID
        const enrollRes = await fetch("http://localhost:5000/api/enrollments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: id,
            paymentId: paymentId,
          }),
        });

        const enrollData = await enrollRes.json();
        console.log(enrollData, "enrollData");

        if (enrollRes.ok) {
          console.log("Enrolled successfully:", enrollData);
          alert("Enrollment successful! 🎉");
          fetchCourse();
        } else {
          console.warn("Enrollment failed:", enrollData.message);
        }
      } catch (error) {
        console.error("Enrollment creation failed:", error);
      }
    };
    // Make POST request to enroll student
    //     const res = await fetch("http://localhost:5000/api/enrollments", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({
    //         courseId: id,
    //         paymentId,
    //       }),
    //     });

    //     const data = await res.json();

    //     if (res.ok) {
    //       console.log(" Enrolled successfully:", data);
    //       alert("Enrollment successful! You can now start learning 🎉");
    //       // Refresh the course data to show "Start Learning"
    //       fetchCourse();
    //     } else {
    //       console.warn(" Enrollment not created:", data.message);
    //     }
    //   } catch (error) {
    //     console.error(" Enrollment creation failed:", error);
    //   }
    // };

    if (paymentSuccess) {
      enrollAfterPayment();
    }
  }, []);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({ endpoint: `/courses/${id}` });
      const enrollmentResponse = await apiRequest({
        endpoint: `/enrollments/my-courses/${id}`,
      });
      setEnrollment_status(enrollmentResponse.enrollments?.isActive || false);
      console.log(
        enrollmentResponse.enrollments?.isActive,
        "enrollmentResponse"
      );
      if (!response.success) {
        alert(response.message);
        if (response.message === "You must be logged in") {
          navigate("/login");
        } else {
          navigate("/courses");
        }
        return;
      }
      setCourse(response?.data);
      setCourseIspaid(response?.data.isPaid);
      console.log("Course data:", response.data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while fetching the course.");
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (paymentSuccess) {
      fetchCourse();
    }
  }, [paymentSuccess]);

  const handleStripePayment = async () => {
    if (!course) return;
    setProcessing(true);

    try {
      const response = await apiRequest({
        endpoint: "/payments/session",
        method: "POST",
        body: { courseId: course._id, amount: course.price },
      });

      if (!response.success || !response.sessionId) {
        alert(response.message || "Failed to create Stripe session");
        setProcessing(false);
        return;
      }
      localStorage.setItem("paymentId", response.paymentId);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId,
      });

      if (error) alert("Stripe checkout failed: " + error.message);
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div style={{ padding: 20, textAlign: "center" }}>Loading course...</div>
    );

  if (!course)
    return (
      <div style={{ padding: 20, textAlign: "center" }}>Course not found</div>
    );
  const handleStartLearning = () => {
    navigate(`/student/courses/${course._id}`);
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />
      <SidebarLayout>
        <div
          style={{
            padding: "60px 20px",
            maxWidth: "1200px",
            marginTop: "20px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Content */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              justifyContent: "space-between",
            }}
          >
            {/* Left: Course Info */}
            <div
              style={{
                flex: "2",
                minWidth: "300px",
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  marginBottom: "25px",
                  color: "#1f2937",
                  paddingBottom: "10px",
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                Course Information
              </h2>
              <div style={{ marginBottom: "20px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  <strong>Title:</strong>
                </h3>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#1f2937",
                    marginBottom: "20px",
                    paddingLeft: "10px",
                  }}
                >
                  {course.title}
                </p>
              </div>
              {/* <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  <strong>Duration:</strong>
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#1f2937",
                    marginBottom: "20px",
                    paddingLeft: "10px",
                  }}
                >
                  {course.duration || "N/A"}
                </p>
              </div> */}
              <div style={{ marginBottom: "25px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "12px",
                  }}
                >
                  <strong>Course Description</strong>
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#4b5563",
                    lineHeight: "1.6",
                    paddingLeft: "10px",
                  }}
                >
                  {course.description}
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Syllabus
                </h3>
                {course.syllabus?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      onClick={() =>
                        setOpenLevel(openLevel === index ? null : index)
                      }
                      style={{
                        cursor: "pointer",
                        padding: "10px 15px",
                        background: "#f1f5f9",
                        fontWeight: "600",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Level {item.level}
                      <span>
                        {openLevel === index ? "−" : <FiChevronDown />}
                      </span>
                    </div>
                    {openLevel === index && (
                      <div
                        style={{
                          padding: "10px 15px",
                          backgroundColor: "#fff",
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* How to Complete Section */}
              {course.howToComplete?.length > 0 && (
                <div
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "15px",
                      color: "#1f2937",
                    }}
                  >
                    How to Complete this Course
                  </h3>
                  <ol
                    style={{
                      paddingLeft: "30px",
                      color: "#374151",
                      lineHeight: "1.8",
                    }}
                  >
                    {course.howToComplete.map((step, index) => {
                      const [boldText, ...rest] = step.split(" – ");
                      return (
                        <li key={index} style={{ marginBottom: "12px" }}>
                          <span style={{ fontWeight: "600", color: "#111827" }}>
                            {boldText}
                          </span>
                          {rest.length > 0 && ` – ${rest.join(" – ")}`}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
              {/* Action Button */}
              <div
                style={{
                  padding: "20px",
                  background: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  marginTop: "30px",
                }}
              >
                {!courseIspaid ? (
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={handleStartLearning}
                      style={{
                        width: "100%",
                        padding: "16px 0",
                        backgroundColor: "#10b981",
                        color: "white",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#059669";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#10b981";
                      }}
                    >
                      Start Learning Now
                    </button>
                  </div>
                ) : !enrollment_status ? (
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "15px",
                      }}
                    >
                      Course Price: Rs {course.price}
                    </p>
                    <button
                      onClick={handleStripePayment}
                      disabled={processing}
                      style={{
                        width: "100%",
                        padding: "16px 0",
                        backgroundColor: "#2563eb",
                        color: "white",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#1d4ed8";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#2563eb";
                      }}
                    >
                      {processing ? "Processing..." : "Pay with Stripe"}
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={handleStartLearning}
                      style={{
                        width: "100%",
                        padding: "16px 0",
                        backgroundColor: "#10b981",
                        color: "white",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#059669";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#10b981";
                      }}
                    >
                      Start Learning Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Course Banner and Instructor */}
            <div
              style={{
                flex: "1",
                minWidth: "280px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              {/* Banner */}
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#e5e7eb",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                }}
              >
                {course.banner ? (
                  <img
                    src={
                      course.banner
                        ? `http://localhost:5000${course.banner}`
                        : ""
                    }
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      color: "#9ca3af",
                      fontSize: "16px",
                    }}
                  >
                    No Image Available
                  </div>
                )}
              </div>

              {/* Instructor Card */}
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    height: "150px",
                    backgroundColor: "#f1f5f9",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {course.instructor?.photo ? (
                    <img
                      src={
                        course.instructor?.photo
                          ? `http://localhost:5000${course.instructor.photo}`
                          : "/defaultProfile.jpg"
                      }
                      alt={course.instructor.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src="/defaultProfile.jpg"
                      alt="Default Instructor"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <div style={{ padding: "20px", textAlign: "center" }}>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      marginBottom: "8px",
                      color: "#1f2937",
                    }}
                  >
                    Instructor
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#4b5563",
                    }}
                  >
                    {course.instructor?.name || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
