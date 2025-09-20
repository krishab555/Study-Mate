
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";

export default function FAQDetails() {
  const { faqMasterId } = useParams();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/faqs/${faqMasterId}`
        );
        const data = await res.json();
        if (data.success) {
          setFaqs(data.data);
          // Initialize chat with a welcome message
          setChatMessages([
            {
              type: "bot",
              text: "Hi there! 👋 I'm StudyMate Assistant. I'm here to help answer any questions you have about this subject. Just click on any question to the left to get started!",
              timestamp: new Date(),
            },
          ]);
        } else alert(data.message || "Failed to load FAQs");
      } catch (err) {
        console.error(err);
        alert("Error fetching FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [faqMasterId]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle user selecting a question
  const handleQuestionSelect = (faq) => {
    // Add user message
    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: faq.question, timestamp: new Date() },
    ]);

    // Add bot response after a short delay (like real typing)
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { type: "bot", text: faq.answer, timestamp: new Date() },
      ]);
    }, 800);
  };

  // Styles
  const containerStyle = {
    marginLeft: "280px",
    marginTop: "60px",
    padding: "0",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    boxSizing: "border-box",
    width: "calc(100% - 280px)",
    backgroundColor: "#fafafa",
    height: "calc(100vh - 60px)",
    display: "flex",
    overflow: "hidden",
  };

  const questionsPanelStyle = {
    flex: "0 0 320px",
    backgroundColor: "#fff",
    borderRight: "1px solid #dbdbdb",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const questionsHeaderStyle = {
    padding: "16px",
    borderBottom: "1px solid #efefef",
    backgroundColor: "#fff",
    flexShrink: 0,
  };

  const questionsListStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "0 16px 16px 16px",
  };

  const chatPanelStyle = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#fafafa",
    overflow: "hidden",
  };

  const chatHeaderStyle = {
    padding: "16px 20px",
    borderBottom: "1px solid #dbdbdb",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    flexShrink: 0,
  };

  const chatAvatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    background: "linear-gradient(45deg, #0095f6, #7d3cff)",
  };

  const chatMessagesStyle = {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "rgba(250, 250, 250, 0.8)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundImage:
      'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e0e0e0" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
  };

  const messageBubbleStyle = {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "22px",
    marginBottom: "2px",
    position: "relative",
    fontSize: "14px",
    lineHeight: "1.4",
  };

  const userMessageStyle = {
    ...messageBubbleStyle,
    alignSelf: "flex-end",
    backgroundColor: "#0095f6",
    color: "#fff",
    borderBottomRightRadius: "6px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  };

  const botMessageStyle = {
    ...messageBubbleStyle,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    color: "#262626",
    border: "1px solid #dbdbdb",
    borderBottomLeftRadius: "6px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  };

  const messageTimeStyle = {
    fontSize: "10px",
    color: "#8e8e8e",
    marginTop: "4px",
    textAlign: "right",
  };

  const questionItemStyle = {
    padding: "14px 16px",
    borderRadius: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
    transition: "all 0.2s ease",
    border: "1px solid #efefef",
    fontSize: "14px",
    color: "#262626",
  };

  const searchContainerStyle = {
    position: "relative",
    marginBottom: "16px",
  };

  const searchStyle = {
    width: "100%",
    padding: "12px 16px 12px 40px",
    borderRadius: "20px",
    border: "1px solid #dbdbdb",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  };

  const searchIconStyle = {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#8e8e8e",
  };

  const sectionTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    color: "#262626",
  };

  const statusIndicatorStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#42b883",
    marginLeft: "8px",
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={containerStyle}>
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                color: "#8e8e8e",
              }}
            >
              <p>Loading FAQs...</p>
            </div>
          ) : (
            <>
              {/* Questions Panel */}
              <div style={questionsPanelStyle}>
                {/* Fixed Header */}
                <div style={questionsHeaderStyle}>
                  <h3 style={sectionTitleStyle}>FAQ Questions</h3>

                  <div style={searchContainerStyle}>
                    <div style={searchIconStyle}>🔍</div>
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      style={searchStyle}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Scrollable Questions List */}
                <div style={questionsListStyle}>
                  {filteredFaqs.length === 0 ? (
                    <p
                      style={{
                        color: "#8e8e8e",
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      {searchTerm
                        ? "No questions match your search"
                        : "No questions available"}
                    </p>
                  ) : (
                    filteredFaqs.map((faq, index) => (
                      <div
                        key={index}
                        style={questionItemStyle}
                        onClick={() => handleQuestionSelect(faq)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#e9ecef";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#f8f9fa";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        {faq.question}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Panel */}
              <div style={chatPanelStyle}>
                <div style={chatHeaderStyle}>
                  <div style={chatAvatarStyle}>
                    <span
                      style={{
                        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))",
                      }}
                    >
                      S
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      StudyMate Assistant
                      <span style={statusIndicatorStyle}></span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#8e8e8e" }}>
                      Active now
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#0095f6",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    ⚙️
                  </div>
                </div>

                <div style={chatMessagesStyle}>
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      style={
                        message.type === "user"
                          ? userMessageStyle
                          : botMessageStyle
                      }
                    >
                      {message.text}
                      <div style={messageTimeStyle}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}