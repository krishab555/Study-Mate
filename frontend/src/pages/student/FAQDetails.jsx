import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";

export default function FAQDetails() {
  const { faqMasterId } = useParams();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null); // track open FAQ

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/faqs/${faqMasterId}`);
        const data = await res.json();
        if (data.success) setFaqs(data.data);
        else alert(data.message || "Failed to load FAQs");
      } catch (err) {
        console.error(err);
        alert("Error fetching FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [faqMasterId]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerStyle = {
    marginLeft: "280px",
    marginTop: "60px",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    width: "100%",
  };

  const titleStyle = {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const faqColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const faqStyle = {
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const questionStyle = {
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
  };

  const answerStyle = {
    marginTop: "8px",
    fontSize: "14px",
    color: "#555",
  };

  const firstHalf = faqs.slice(0, Math.ceil(faqs.length / 2));
  const secondHalf = faqs.slice(Math.ceil(faqs.length / 2));

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={containerStyle}>
          {loading ? (
            <p>Loading FAQs...</p>
          ) : faqs.length === 0 ? (
            <p>No FAQs available for this subject</p>
          ) : (
            <>
              <h2 style={titleStyle}>Frequently Asked Questions</h2>
              <div style={gridStyle}>
                <div style={faqColumnStyle}>
                  {firstHalf.map((faq, index) => (
                    <div key={index} style={faqStyle} onClick={() => toggleFAQ(index)}>
                      <h3 style={questionStyle}>
                        {faq.question} <span>{openIndex === index ? "▲" : "▼"}</span>
                      </h3>
                      {openIndex === index && <p style={answerStyle}>{faq.answer}</p>}
                    </div>
                  ))}
                </div>

                <div style={faqColumnStyle}>
                  {secondHalf.map((faq, index) => (
                    <div
                      key={index + firstHalf.length}
                      style={faqStyle}
                      onClick={() => toggleFAQ(index + firstHalf.length)}
                    >
                      <h3 style={questionStyle}>
                        {faq.question}{" "}
                        <span>{openIndex === index + firstHalf.length ? "▲" : "▼"}</span>
                      </h3>
                      {openIndex === index + firstHalf.length && (
                        <p style={answerStyle}>{faq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
