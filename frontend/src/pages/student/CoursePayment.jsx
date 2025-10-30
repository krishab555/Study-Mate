import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { SidebarLayout } from "../../components/common/SideBar";
import { apiRequest } from "../../utils/api";

export default function CoursePayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await apiRequest({ endpoint: `/courses/${id}` });
        if (!response.success) {
          alert(response.message || "Failed to load course");
          navigate("/courses");
          return;
        }
        setCourse(response.data);
      } catch (err) {
        console.error("Error fetching course:", err);
        alert("Failed to load course.");
        navigate("/courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleStripePayment = async () => {
    if (!course) return;
    setProcessing(true);

    try {
      const response = await apiRequest({
        endpoint: "/payments/session", // Your backend endpoint
        method: "POST",
        body: { courseId: course._id, amount: course.price },
      });

      if (response.success && response.sessionUrl) {
        // Redirect user to Stripe Checkout
        window.location.href = response.sessionUrl;
      } else {
        alert(response.message || "Failed to create Stripe session");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    } finally {
      setProcessing(false);
    }
  };


 
  if (loading)
    return (
      <p style={{ padding: 20, textAlign: "center" }}>
        Loading course details...
      </p>
    );

  return (
    <div>
      <Navbar />
      <SidebarLayout>
        <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "30px" }}>Course Payment</h2>
          <p><strong>Course:</strong> {course?.title}</p>
          <p><strong>Amount:</strong> Rs {course?.price}</p>

         
         <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
  {/* Stripe Button */}
  <button
    onClick={() => handlePayment("stripe")}
    disabled={processing}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      background: "#1c2151ff",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: processing ? "not-allowed" : "pointer",
      boxShadow: "0 4px 12px rgba(103, 114, 229, 0.4)",
      transition: "all 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#2d357aff")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#1c2151ff")}
  >
     {processing ? "Processing..." : "Pay with Stripe"}
  </button>

</div>

        </div>
      </SidebarLayout>
      <Footer />
    </div>
  );
}
