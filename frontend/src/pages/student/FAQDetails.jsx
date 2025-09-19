// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import SideBar from "../../components/common/SideBar";

// export default function FAQDetails() {
//   const { faqMasterId } = useParams();
//   const [faqs, setFaqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openIndex, setOpenIndex] = useState(null); // track open FAQ

//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/faqs/${faqMasterId}`);
//         const data = await res.json();
//         if (data.success) setFaqs(data.data);
//         else alert(data.message || "Failed to load FAQs");
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching FAQs");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFaqs();
//   }, [faqMasterId]);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const containerStyle = {
//     marginLeft: "280px",
//     marginTop: "60px",
//     padding: "40px 20px",
//     fontFamily: "Arial, sans-serif",
//     boxSizing: "border-box",
//     width: "100%",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     fontSize: "28px",
//     fontWeight: "bold",
//     marginBottom: "30px",
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "20px",
//     maxWidth: "1200px",
//     margin: "0 auto",
//   };

//   const faqColumnStyle = {
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   };

//   const faqStyle = {
//     background: "#fff",
//     padding: "15px 20px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//   };

//   const questionStyle = {
//     fontSize: "16px",
//     fontWeight: "600",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     margin: 0,
//   };

//   const answerStyle = {
//     marginTop: "8px",
//     fontSize: "14px",
//     color: "#555",
//   };

//   const firstHalf = faqs.slice(0, Math.ceil(faqs.length / 2));
//   const secondHalf = faqs.slice(Math.ceil(faqs.length / 2));

//   return (
//     <div>
//       <Navbar />
//       <div style={{ display: "flex" }}>
//         <SideBar />
//         <div style={containerStyle}>
//           {loading ? (
//             <p>Loading FAQs...</p>
//           ) : faqs.length === 0 ? (
//             <p>No FAQs available for this subject</p>
//           ) : (
//             <>
//               <h2 style={titleStyle}>Frequently Asked Questions</h2>
//               <div style={gridStyle}>
//                 <div style={faqColumnStyle}>
//                   {firstHalf.map((faq, index) => (
//                     <div key={index} style={faqStyle} onClick={() => toggleFAQ(index)}>
//                       <h3 style={questionStyle}>
//                         {faq.question} <span>{openIndex === index ? "▲" : "▼"}</span>
//                       </h3>
//                       {openIndex === index && <p style={answerStyle}>{faq.answer}</p>}
//                     </div>
//                   ))}
//                 </div>

//                 <div style={faqColumnStyle}>
//                   {secondHalf.map((faq, index) => (
//                     <div
//                       key={index + firstHalf.length}
//                       style={faqStyle}
//                       onClick={() => toggleFAQ(index + firstHalf.length)}
//                     >
//                       <h3 style={questionStyle}>
//                         {faq.question}{" "}
//                         <span>{openIndex === index + firstHalf.length ? "▲" : "▼"}</span>
//                       </h3>
//                       {openIndex === index + firstHalf.length && (
//                         <p style={answerStyle}>{faq.answer}</p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";

export default function FAQDetails() {
  const { faqMasterId } = useParams();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]); // chat messages
  const [input, setInput] = useState(""); // input field
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/faqs/${faqMasterId}`
        );
        const data = await res.json();
        if (data.success) {
          setFaqs(data.data);
          // Initial welcome message
          setMessages([
            {
              type: "bot",
              text: "👋 Hi there! Ask me a question or select from FAQs below.",
            },
          ]);
        } else {
          alert(data.message || "Failed to load FAQs");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [faqMasterId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    // Try to find answer from FAQs
    const found = faqs.find((f) =>
      f.question.toLowerCase().includes(input.toLowerCase())
    );

    if (found) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "bot", text: found.answer }]);
      }, 600);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "❓ Sorry, I don’t have an answer for that. Try another question.",
          },
        ]);
      }, 600);
    }

    setInput("");
  };

  const containerStyle = {
    marginLeft: "280px",
    marginTop: "60px",
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
  };

  const chatBoxStyle = {
    flex: 1,
    background: "#f5f7f9",
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const inputBarStyle = {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "#fff",
  };

  const inputStyle = {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  };

  const sendButtonStyle = {
    marginLeft: "10px",
    padding: "10px 18px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  };

  const bubbleUser = {
    alignSelf: "flex-end",
    background: "#e0f7fa",
    padding: "12px 16px",
    borderRadius: "20px",
    maxWidth: "70%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const bubbleBot = {
    alignSelf: "flex-start",
    background: "#fff9c4",
    padding: "12px 16px",
    borderRadius: "20px",
    maxWidth: "70%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={containerStyle}>
          {loading ? (
            <p style={{ padding: "20px" }}>Loading FAQs...</p>
          ) : (
            <>
              {/* Chat Window */}
              <div style={chatBoxStyle}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={msg.type === "user" ? bubbleUser : bubbleBot}
                  >
                    <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                      {msg.text}
                    </p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input Bar */}
              <div style={inputBarStyle}>
                <input
                  type="text"
                  placeholder="Type a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  style={inputStyle}
                />
                <button onClick={handleSend} style={sendButtonStyle}>
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
