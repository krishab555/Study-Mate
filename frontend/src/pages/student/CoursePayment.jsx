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

  const handlePayment = async (method) => {
    if (!course) return;
    setProcessing(true);

    try {
      const txnId = "TXN-" + Date.now();

      let response;
      if (method === "stripe") {
        response = await apiRequest({
          endpoint: "/payments/stripe-session",
          method: "POST",
          body: { courseId: course._id, amount: course.price },
        });
        if (response.success) {
          // redirect to Stripe checkout page
          window.location.href = response.sessionUrl || `https://checkout.stripe.com/pay/${response.sessionId}`;
        }
      } else if (method === "esewa") {
        response = await apiRequest({
          endpoint: "/payments/esewa",
          method: "POST",
          body: { courseId: course._id, amount: course.price, txnId },
        });
        if (response.success) {
          window.location.href = response.esewaUrl;
        }
      } else {
        // Dummy payment (for testing)
        response = await apiRequest({
          endpoint: "/payments",
          method: "POST",
          body: { courseId: course._id, amount: course.price, transactionId: txnId, method },
        });
        if (response.success) {
          alert("Payment successful! You are enrolled.");
          navigate(`/student/courses/${course._id}/start`);
        }
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

  {/* eSewa Button */}
  <button
    onClick={() => handlePayment("esewa")}
    disabled={processing}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      background: "#8b3104ff",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: processing ? "not-allowed" : "pointer",
      boxShadow: "0 4px 12px rgba(242, 106, 39, 0.4)",
      transition: "all 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#af3c02ff")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#8b3104ff")}
  >
     {processing ? "Processing..." : "Pay with eSewa"}
  </button>
</div>

        </div>
      </SidebarLayout>
      <Footer />
    </div>
  );
}
