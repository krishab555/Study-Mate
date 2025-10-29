// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";
// import { SidebarLayout } from "../../components/common/SideBar";
// import { apiRequest } from "../../utils/api";
// import TakeQuizze from "./TakeQuizByCourse";

// export default function CourseDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [processing, setProcessing] = useState(false);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       setLoading(true);
//       try {
//         const response = await apiRequest({ endpoint: `/courses/${id}` });
//         if (!response.success) {
//           alert(response.message);
//           if (response.message === "You must be logged in") {
//             navigate("/login");
//           }
//           return;
//         }
//         setCourse(response.data);
//       } catch (err) {
//         console.error(err);
//         alert("Something went wrong while fetching the course.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourse();
//   }, [id, navigate]);
//   const handleDummyPayment = async () => {
//     if (!course) return;
//     setProcessing(true);

//     try {
//       const transactionId = "TXN-" + Date.now();

//       const response = await apiRequest({
//         endpoint: "/payments",
//         method: "POST",
//         body: {
//           courseId: course._id,
//           amount: course.price,
//           transactionId,
//         },
//       });

//       if (!response.success) {
//         alert(response.message || "Payment failed");
//         setProcessing(false);
//         return;
//       }

//       alert("Payment successful! You are now enrolled.");
//       setShowPaymentModal(false);
//       await handlePaymentSuccess();
//     } catch (error) {
//       console.error(error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handlePaymentSuccess = async () => {
//     try {
//       const response = await apiRequest({ endpoint: `/courses/${id}` });
//       if (response.success) {
//         setCourse(response.data);
//       }
//     } catch (error) {
//       console.error("Failed to refresh course data:", error);
//     }
//   };

//   if (loading) return <p style={{ padding: "20px" }}>Loading course...</p>;
//   if (!course) return <p style={{ padding: "20px" }}>Course not found</p>;

//   return (
//     <div style={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//       <Navbar />
//       <SidebarLayout>
//         <div
//           style={{
//             padding: "40px 30px",
//             maxWidth: "1100px",
//             margin: "0 auto",
//             marginTop: "30px",
//           }}
//         >
//           {/* Banner */}
//           <div
//             style={{
//               width: "100%",
//               height: "250px",
//               borderRadius: "12px",
//               overflow: "hidden",
//               backgroundColor: "#e1e1e1",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: "30px",
//             }}
//           >
//             {course.banner ? (
//               <img
//                 src={
//                   course.banner ? `http://localhost:5000${course.banner}` : ""
//                 }
//                 alt={course.title}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             ) : (
//               <p style={{ color: "#777" }}>No Image Available</p>
//             )}
//           </div>

//           {/* Content */}
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               justifyContent: "space-between",
//               gap: "30px",
//             }}
//           >
//             {/* Left: Course Info */}
//             <div style={{ flex: "2", minWidth: "300px" }}>
//               <h2
//                 style={{
//                   fontSize: "26px",
//                   fontWeight: "600",
//                   marginBottom: "20px",
//                 }}
//               >
//                 Course Information
//               </h2>

//               <p style={{ marginBottom: "12px", fontSize: "16px" }}>
//                 <strong>Title:</strong> <br />
//                 {course.title}
//               </p>

//               <p style={{ marginBottom: "12px", fontSize: "16px" }}>
//                 <strong>Duration:</strong> <br />
//                 {course.duration || "N/A"}
//               </p>

//               <p
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "16px",
//                   marginBottom: "6px",
//                 }}
//               >
//                 Course Description
//               </p>
//               <p
//                 style={{
//                   marginBottom: "25px",
//                   lineHeight: "1.7",
//                   color: "#444",
//                   fontSize: "15px",
//                 }}
//               >
//                 {course.description}
//               </p>

//               {/* How to Complete Section */}
//               {course.howToComplete?.length > 0 && (
//                 <div style={{ marginBottom: "25px" }}>
//                   <h3
//                     style={{
//                       fontSize: "18px",
//                       fontWeight: "600",
//                       marginBottom: "10px",
//                       color: "#0B2C5D",
//                     }}
//                   >
//                     How to Complete this e-Course
//                   </h3>
//                   <ol style={{ paddingLeft: "20px", color: "#333" }}>
//                     {course.howToComplete.map((step, index) => {
//                       const [boldText, ...rest] = step.split(" – ");
//                       return (
//                         <li key={index} style={{ marginBottom: "8px" }}>
//                           <span style={{ fontWeight: "bold" }}>{boldText}</span>
//                           {rest.length > 0 && ` – ${rest.join(" – ")}`}
//                         </li>
//                       );
//                     })}
//                   </ol>
//                 </div>
//               )}

//               {/* Price + Pay Now */}
//               <div
//                 style={{
//                   marginTop: "30px",
//                   padding: "20px",
//                   background: "#f1f1f1",
//                   borderRadius: "8px",
//                   maxWidth: "400px",
//                 }}
//               >
//                 {course.isPaid ? (
//                   <>
//                     <p style={{ fontSize: "16px", marginBottom: "12px" }}>
//                       <strong>Premium Course Price:</strong> Rs {course.price}
//                     </p>

//                     <button
//                       onClick={() =>
//                         navigate(`/student/courses/${course._id}/payment`)
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "12px 0",
//                         backgroundColor: "#0B2C5D",
//                         color: "white",
//                         fontSize: "16px",
//                         border: "none",
//                         borderRadius: "6px",
//                         fontWeight: "bold",
//                         cursor: "pointer",
//                         transition: "background-color 0.3s",
//                       }}
//                     >
//                       Pay Now
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => navigate(`/student/course/${course._id}`)}
//                     style={{
//                       width: "100%",
//                       padding: "12px 0",
//                       backgroundColor: "#2d9f40",
//                       color: "white",
//                       fontSize: "16px",
//                       border: "none",
//                       borderRadius: "6px",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       transition: "background-color 0.3s",
//                     }}
//                   >
//                     Start Learning
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Payment Modal
//             {showPaymentModal && (
//               <div
//                 style={{
//                   position: "fixed",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   backgroundColor: "rgba(0,0,0,0.5)",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   zIndex: 1000,
//                 }}
//               >
//                 <div
//                   style={{
//                     backgroundColor: "white",
//                     padding: "30px",
//                     borderRadius: "12px",
//                     minWidth: "300px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <h3>Pay Rs {course.price} to enroll</h3>
//                   <button
//                     onClick={handleDummyPayment}
//                     disabled={processing}
//                     style={{
//                       marginTop: "20px",
//                       padding: "10px 20px",
//                       backgroundColor: processing ? "#888" : "#0B2C5D",
//                       color: "white",
//                       borderRadius: "6px",
//                     }}
//                   >
//                     {processing ? "Processing..." : "Pay & Enroll Now"}
//                   </button>
//                   <button
//                     onClick={() => setShowPaymentModal(false)}
//                     style={{
//                       marginTop: "10px",
//                       padding: "8px 16px",
//                       backgroundColor: "#ccc",
//                       borderRadius: "6px",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )} */}

//             {/* Right: Instructor Card */}
//             <div
//               style={{
//                 flex: "1",
//                 minWidth: "280px",
//                 backgroundColor: "#fff",
//                 border: "1px solid #eee",
//                 borderRadius: "10px",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//                 height: "370px",
//               }}
//             >
//               <div style={{ height: "200px", backgroundColor: "#ddd" }}>
//                 {course.instructor?.photo ? (
//                   <img
//                     src={
//                       course.instructor?.photo
//                         ? `http://localhost:5000${course.instructor.photo}`
//                         : "/defaultProfile.jpg"
//                     }
//                     alt={course.instructor.name}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) : (
//                   <p
//                     style={{
//                       textAlign: "center",
//                       lineHeight: "200px",
//                       color: "#999",
//                     }}
//                   >
//                     No Image
//                   </p>
//                 )}
//               </div>
//               <div style={{ padding: "20px", textAlign: "center" }}>
//                 <p
//                   style={{
//                     fontWeight: "bold",
//                     fontSize: "17px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Instructor
//                 </p>
//                 <p style={{ fontSize: "15px", color: "#444" }}>
//                   {course.instructor?.name || "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </SidebarLayout>
//       <Footer />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { SidebarLayout } from "../../components/common/SideBar";
import { apiRequest } from "../../utils/api";
// import axios from "axios";
// import StripePayment from "./StripePayment";
// import TakeQuizze from "./TakeQuizByCourse";

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

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "18px",
          color: "#555",
        }}
      >
        Loading course...
      </div>
    );

  if (!course)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "18px",
          color: "#555",
        }}
      >
        Course not found
      </div>
    );

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />
      <SidebarLayout>
        <div
          style={{
            padding: "30px 20px",
            maxWidth: "1200px",
            margin: "0 auto",
            marginTop: "20px",
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
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  <strong>Title:</strong>
                </p>
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

              <div style={{ marginBottom: "20px" }}>
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
              </div>

              <div style={{ marginBottom: "25px" }}>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "12px",
                  }}
                >
                  <strong>Course Description</strong>
                </p>
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
                {course.isPaid ? (
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
                      onClick={() =>
                        navigate(`/student/courses/${course._id}/payment`)
                      }
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
                      Pay Now
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={() => navigate(`/student/course/${course._id}`)}
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
                  height: "200px",
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
                    <div
                      style={{
                        color: "#9ca3af",
                        fontSize: "48px",
                      }}
                    >
                      👨‍🏫
                    </div>
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
      <Footer />
    </div>
  );
}