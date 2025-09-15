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

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const response = await apiRequest({ endpoint: `/courses/${id}` });

      if (!response.success) {
        alert(response.message);
        navigate("/courses");
        return;
      }

      setCourse(response.data);
      setLoading(false);
    };

    fetchCourse();
  }, [id, navigate]);

  const handlePayment = () => {
    // TODO: integrate Razorpay / Stripe here
    alert("Redirecting to payment gateway...");
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

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
              <strong>Course:</strong> {course.title}
            </p>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              <strong>Amount to Pay:</strong> Rs {course.price}
            </p>

            <button
              onClick={handlePayment}
              style={{
                backgroundColor: "#0B2C5D",
                color: "white",
                padding: "12px 30px",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </SidebarLayout>
      <Footer />
    </div>
  );
}
