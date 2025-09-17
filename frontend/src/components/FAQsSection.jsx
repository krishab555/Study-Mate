import React, { useState } from "react";

const faqs = [
  {
    question: "What is Studymate?",
    answer:
      "Studymate is an online study notes distribution system where students can access and share materials easily.",
  },
  {
    question: "How can I register?",
    answer:
      "You can register by signing up with your email and creating an account on the website.",
  },
  {
    question: "What is the difference between Free and Paid users?",
    answer:
      "Free users can access limited content while Paid users can access full courses, quizzes, forums, and certificates.",
  },
  {
    question: "How do instructors upload courses?",
    answer:
      "Instructors can log in to their account and use the 'Upload Course' option to add study materials and courses.",
  },
  {
    question: "How do I get a certificate?",
    answer:
      "Certificates are given to Paid users after successfully completing a course and submitting the required project.",
  },
  {
    question: "Is Studymate mobile friendly?",
    answer:
      "Yes, Studymate is fully responsive and can be accessed from any device including mobiles and tablets.",
  },
  {
    question: "Are the courses beginner-friendly?",
    answer:
      "Yes, our courses are designed with beginners in mind and do not require prior experience.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "You can enroll by visiting the course page and clicking the 'Enroll' button.",
  },
  {
    question: "Are there live classes or only recorded videos?",
    answer:
      "Most courses include both live sessions and recorded videos for flexibility.",
  },
  {
    question: "Can beginners with no coding experience join StudyMate?",
    answer:
      "Absolutely! StudyMate is built for learners at all levels, including complete beginners.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerStyle = {
    width: "100%",
    padding: "40px 20px",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
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

  const firstHalf = faqs.slice(0, 5);
  const secondHalf = faqs.slice(5, 10);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Frequently Asked Questions (FAQs)</h2>
      <div style={gridStyle}>
        <div style={faqColumnStyle}>
          {firstHalf.map((faq, index) => (
            <div key={index} style={faqStyle} onClick={() => toggleFAQ(index)}>
              <h3 style={questionStyle}>
                {faq.question}
                <span>{openIndex === index ? "^" : "˅"}</span>
              </h3>
              {openIndex === index && <p style={answerStyle}>{faq.answer}</p>}
            </div>
          ))}
        </div>

        <div style={faqColumnStyle}>
          {secondHalf.map((faq, index) => (
            <div
              key={index + 5}
              style={faqStyle}
              onClick={() => toggleFAQ(index + 5)}
            >
              <h3 style={questionStyle}>
                {faq.question}
                <span>{openIndex === index + 5 ? "^" : "˅"}</span>
              </h3>
              {openIndex === index + 5 && (
                <p style={answerStyle}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
