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

  const handleDummyPayment = async () => {
    if (!course) return;
    setProcessing(true);

    try {
      // Generate dummy transaction ID
      const transactionId = "TXN-" + Date.now();

      // Call backend to process payment and create enrollment
      const response = await apiRequest({
        endpoint: "/payments",
        method: "POST",
        body: {
          courseId: course._id,
          amount: course.price,
          transactionId,
        },
      });

      if (!response.success) {
        alert(response.message || "Payment failed");
        setProcessing(false);
        return;
      }

      alert("✅ Payment successful! You are now enrolled.");
      navigate(`/courses/${course._id}/content`);
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
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
        <div
          style={{
            padding: "40px 30px",
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Course Payment
          </h2>

          <div
            style={{
              padding: "25px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              <strong>Course:</strong> {course?.title}
            </p>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              <strong>Amount to Pay:</strong> Rs {course?.price}
            </p>

            <button
              onClick={handleDummyPayment}
              disabled={processing}
              style={{
                backgroundColor: processing ? "#888" : "#0B2C5D",
                color: "white",
                padding: "12px 30px",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "6px",
                cursor: processing ? "not-allowed" : "pointer",
              }}
            >
              {processing
                ? "Processing..."
                : "Proceed to Pay"}
            </button>
          </div>
        </div>
      </SidebarLayout>
      <Footer />
    </div>
  );
}
