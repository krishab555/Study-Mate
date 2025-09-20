// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { apiRequest } from "../../utils/api";

// // const TakeQuizByCourse = () => {
// //   const { courseId } = useParams();
// //   const [quiz, setQuiz] = useState();
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [answers, setAnswers] = useState({});
// //   const [submitted, setSubmitted] = useState(false);
// //   const [score, setScore] = useState(0);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchFirstQuiz = async () => {
// //       try {
// //         const res = await apiRequest({ endpoint: `/quiz/course/${courseId}` });
// //         console.log(`quiz data`, res.quizzes[0])
// //         if (res.quizzes.length > 0) {
// //           setQuiz(res.quizzes[0]); // use the first quiz
// //         } else {
// //           alert("No quiz available for this course");
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         alert("Error fetching quiz");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchFirstQuiz();
// //   }, []);

// // console.log(`quiz 2`, quiz)
// //   if (loading) return <p>Loading quiz...</p>;
// //   if (!quiz) return <p>No quiz found for this course.</p>;

// //   if (submitted) {
// //     return (
// //       <div style={{ textAlign: "center", padding: "40px" }}>
// //         <h2>Quiz Completed!</h2>
// //         <p>
// //           Your Score: {score} / {quiz.questions.length}
// //         </p>
// //       </div>
// //     );
// //   }

// //   const currentQuestion = quiz.questions[currentIndex];

// //   const handleOption = (option) => {
// //     setAnswers({ ...answers, [currentQuestion._id]: option });
// //   };

// //   const goNext = () => setCurrentIndex((prev) => prev + 1);
// //   const goBack = () => setCurrentIndex((prev) => prev - 1);

// //   const handleSubmitQuiz = async () => {
// //     const formattedAnswers = quiz.questions.map((q) => ({
// //       questionId: q._id,
// //       selectedOption: answers[q._id] || null,
// //     }));

// //     try {
// //       const res = await apiRequest({
// //         endpoint: "/userQuiz",
// //         method: "POST",
// //         body: { quizId: quiz._id, answers: formattedAnswers },
// //       });

// //       if (res.success) {
// //         setScore(res.userQuiz.score);
// //         setSubmitted(true);
// //       } else {
// //         alert("Error submitting quiz");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error submitting quiz");
// //     }
// //   };
// //   return (
// //     <div style={{  padding: "40px",paddingLeft:"280px", maxWidth: "700px", margin: "auto" }}>
// //       <h3>
// //         Question {currentIndex + 1} / {quiz.questions.length}
// //       </h3>
// //       <p>{currentQuestion.questionText}</p>
// //       {currentQuestion.options.map((opt) => (
// //         <button
// //           key={opt}
// //           onClick={() => handleOption(opt)}
// //           style={{
// //             display: "block",
// //             margin: "10px 0",
// //             padding: "10px 20px",
// //             backgroundColor:
// //               answers[currentQuestion._id] === opt ? "#6c5ce7" : "#fff",
// //             color: answers[currentQuestion._id] === opt ? "#fff" : "#000",
// //             borderRadius: "6px",
// //             border: "1px solid #ccc",
// //             cursor: "pointer",
// //           }}
// //         >
// //           {opt}
// //         </button>
// //       ))}
// //       <div style={{ marginTop: "20px" }}>
// //         {currentIndex > 0 && <button onClick={goBack}>Previous</button>}
// //         {currentIndex < quiz.questions.length - 1 ? (
// //           <button
// //             onClick={goNext}
// //             disabled={!answers[currentQuestion._id]}
// //             style={{ marginLeft: "10px" }}
// //           >
// //             Next
// //           </button>
// //         ) : (
// //           <button
// //             onClick={handleSubmitQuiz}
// //             disabled={!answers[currentQuestion._id]}
// //             style={{ marginLeft: "10px" }}
// //           >
// //             Submit
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default TakeQuizByCourse;
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import SideBar from "../../components/common/SideBar";

// export default function TakeQuiz() {
//   const { quizId } = useParams();
//   const [currentLevel, setCurrentLevel] = useState(1);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(0);
//   const [quizCompleted, setQuizCompleted] = useState(false);

//   // Sample quiz data - replace with your actual data structure
//   const quizData = {
//     title: "Python Programming Quiz",
//     description: "Test your knowledge of Python programming concepts",
//     levels: [
//       {
//         level: 1,
//         question: "What is a KeyError in Python, and how can you handle it?",
//         options: [
//           "An error that occurs when a dictionary key is not found",
//           "An error that occurs when a syntax is incorrect",
//           "An error that occurs when a module is not imported",
//           "An error that occurs when a variable is not defined",
//         ],
//         correctAnswer: 0,
//       },
//       {
//         level: 2,
//         question: "What is __init__() in Python?",
//         options: [
//           "A constructor method for initializing objects",
//           "A special method for string representation",
//           "A method for destroying objects",
//           "A method for importing modules",
//         ],
//         correctAnswer: 0,
//       },
//       {
//         level: 3,
//         question:
//           "Explain list, dictionary, and tuple comprehension with an example?",
//         options: [
//           "List: [x for x in range(5)], Dict: {x: x*2 for x in range(5)}, Tuple: (x for x in range(5))",
//           "List: (x for x in range(5)), Dict: [x: x*2 for x in range(5)], Tuple: {x for x in range(5)}",
//           "List: {x for x in range(5)}, Dict: (x: x*2 for x in range(5)), Tuple: [x for x in range(5)]",
//           "List: <x for x in range(5)>, Dict: <x: x*2 for x in range(5)>, Tuple: <x for x in range(5)>",
//         ],
//         correctAnswer: 0,
//       },
//       {
//         level: 4,
//         question: "What is Python, and list some of its key features?",
//         options: [
//           "Python is an interpreted, high-level language. Features: Easy syntax, dynamic typing, large standard library",
//           "Python is a compiled, low-level language. Features: Complex syntax, static typing, small standard library",
//           "Python is a markup language. Features: Used for web development, requires compilation, static typing",
//           "Python is a database language. Features: Used for data storage, requires specific hardware, no standard library",
//         ],
//         correctAnswer: 0,
//       },
//       {
//         level: 5,
//         question: "Which language is most suitable for work in AI?",
//         options: ["Python", "Java", "C++", "HTML"],
//         correctAnswer: 0,
//       },
//       {
//         level: 6,
//         question: "Why is Python used?",
//         options: [
//           "For its simplicity, readability, and extensive libraries",
//           "For its complex syntax and high performance",
//           "For its hardware-level access and speed",
//           "For its compatibility with all databases without drivers",
//         ],
//         correctAnswer: 0,
//       },
//     ],
//   };

//   const handleAnswerSelect = (level, answerIndex) => {
//     setUserAnswers({
//       ...userAnswers,
//       [level]: answerIndex,
//     });
//   };

//   const handleNextLevel = () => {
//     // Check if answer is correct
//     const currentQuestion = quizData.levels.find(
//       (q) => q.level === currentLevel
//     );
//     if (userAnswers[currentLevel] === currentQuestion.correctAnswer) {
//       setScore(score + 1);
//     }

//     // Move to next level or complete quiz
//     if (currentLevel < quizData.levels.length) {
//       setCurrentLevel(currentLevel + 1);
//     } else {
//       handleQuizCompletion();
//     }
//   };

//   const handleQuizCompletion = () => {
//     setQuizCompleted(true);
//     // Calculate final score
//     let finalScore = score;
//     const lastQuestion = quizData.levels.find((q) => q.level === currentLevel);
//     if (userAnswers[currentLevel] === lastQuestion.correctAnswer) {
//       finalScore += 1;
//     }
//     setScore(finalScore);
//   };

//   const currentQuestion = quizData.levels.find((q) => q.level === currentLevel);

//   // Styles
//   const containerStyle = {
//     marginLeft: "280px",
//     marginTop: "60px",
//     padding: "20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     backgroundColor: "#f8f9fa",
//     minHeight: "calc(100vh - 60px)",
//     boxSizing: "border-box",
//   };

//   const quizContainerStyle = {
//     maxWidth: "800px",
//     margin: "0 auto",
//     backgroundColor: "#fff",
//     borderRadius: "16px",
//     boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
//     padding: "30px",
//     position: "relative",
//   };

//   const headerStyle = {
//     textAlign: "center",
//     marginBottom: "25px",
//     paddingBottom: "15px",
//     borderBottom: "2px solid #f0f0f0",
//   };

//   const progressContainerStyle = {
//     marginBottom: "25px",
//     padding: "15px",
//     backgroundColor: "#f8f9fa",
//     borderRadius: "12px",
//   };

//   const progressBarStyle = {
//     height: "8px",
//     backgroundColor: "#e9ecef",
//     borderRadius: "4px",
//     overflow: "hidden",
//     marginBottom: "10px",
//   };

//   const progressFillStyle = {
//     height: "100%",
//     background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
//     width: `${(currentLevel / quizData.levels.length) * 100}%`,
//     transition: "width 0.5s ease",
//     borderRadius: "4px",
//   };

//   const levelIndicatorStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     fontSize: "14px",
//     color: "#6c757d",
//   };

//   const questionStyle = {
//     fontSize: "22px",
//     fontWeight: "600",
//     marginBottom: "25px",
//     color: "#212529",
//     lineHeight: "1.4",
//   };

//   const optionsContainerStyle = {
//     marginBottom: "30px",
//   };

//   const optionStyle = {
//     display: "block",
//     padding: "18px 20px",
//     marginBottom: "15px",
//     backgroundColor: "#f8f9fa",
//     border: "2px solid #e9ecef",
//     borderRadius: "12px",
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//     fontSize: "16px",
//   };

//   const selectedOptionStyle = {
//     ...optionStyle,
//     backgroundColor: "#e7f3ff",
//     borderColor: "#4361ee",
//     boxShadow: "0 4px 10px rgba(67, 97, 238, 0.15)",
//   };

//   const buttonStyle = {
//     padding: "14px 30px",
//     background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//     boxShadow: "0 4px 10px rgba(67, 97, 238, 0.25)",
//   };

//   const disabledButtonStyle = {
//     ...buttonStyle,
//     background: "#e9ecef",
//     color: "#6c757d",
//     cursor: "not-allowed",
//     boxShadow: "none",
//   };

//   const resultsContainerStyle = {
//     textAlign: "center",
//     padding: "40px 20px",
//   };

//   const scoreStyle = {
//     fontSize: "52px",
//     fontWeight: "700",
//     background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
//     WebkitBackgroundClip: "text",
//     backgroundClip: "text",
//     color: "transparent",
//     margin: "20px 0",
//   };

//   const completionMessageStyle = {
//     fontSize: "18px",
//     marginBottom: "30px",
//     color: "#495057",
//   };

//   const badgeStyle = {
//     fontSize: "80px",
//     marginBottom: "20px",
//   };

//   return (
//     <div>
//       <Navbar />
//       <div style={{ display: "flex" }}>
//         <SideBar />
//         <div style={containerStyle}>
//           <div style={quizContainerStyle}>
//             <div style={headerStyle}>
//               <h2 style={{ color: "#3a0ca3", marginBottom: "8px" }}>
//                 {quizData.title}
//               </h2>
//               <p style={{ color: "#6c757d", margin: 0 }}>
//                 {quizData.description}
//               </p>
//             </div>

//             <div style={progressContainerStyle}>
//               <div style={progressBarStyle}>
//                 <div style={progressFillStyle}></div>
//               </div>
//               <div style={levelIndicatorStyle}>
//                 <span>
//                   Level {currentLevel} of {quizData.levels.length}
//                 </span>
//                 <span>
//                   Score: {score}/{quizData.levels.length}
//                 </span>
//               </div>
//             </div>

//             {!quizCompleted ? (
//               <>
//                 <div style={questionStyle}>{currentQuestion.question}</div>

//                 <div style={optionsContainerStyle}>
//                   {currentQuestion.options.map((option, index) => (
//                     <div
//                       key={index}
//                       style={
//                         userAnswers[currentLevel] === index
//                           ? selectedOptionStyle
//                           : optionStyle
//                       }
//                       onClick={() => handleAnswerSelect(currentLevel, index)}
//                       onMouseEnter={(e) => {
//                         if (userAnswers[currentLevel] !== index) {
//                           e.currentTarget.style.backgroundColor = "#e9ecef";
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         if (userAnswers[currentLevel] !== index) {
//                           e.currentTarget.style.backgroundColor = "#f8f9fa";
//                         }
//                       }}
//                     >
//                       {option}
//                     </div>
//                   ))}
//                 </div>

//                 <div style={{ textAlign: "center" }}>
//                   <button
//                     style={
//                       userAnswers[currentLevel] !== undefined
//                         ? buttonStyle
//                         : disabledButtonStyle
//                     }
//                     onClick={handleNextLevel}
//                     disabled={userAnswers[currentLevel] === undefined}
//                     onMouseEnter={(e) => {
//                       if (userAnswers[currentLevel] !== undefined) {
//                         e.target.style.transform = "translateY(-2px)";
//                         e.target.style.boxShadow =
//                           "0 6px 15px rgba(67, 97, 238, 0.3)";
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (userAnswers[currentLevel] !== undefined) {
//                         e.target.style.transform = "translateY(0)";
//                         e.target.style.boxShadow =
//                           "0 4px 10px rgba(67, 97, 238, 0.25)";
//                       }
//                     }}
//                   >
//                     {currentLevel === quizData.levels.length
//                       ? "Finish Quiz"
//                       : "Next Level →"}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div style={resultsContainerStyle}>
//                 <div style={badgeStyle}>
//                   {score === quizData.levels.length
//                     ? "🏆"
//                     : score >= quizData.levels.length / 2
//                     ? "👍"
//                     : "📚"}
//                 </div>
//                 <h3 style={{ color: "#3a0ca3", marginBottom: "15px" }}>
//                   Quiz Completed!
//                 </h3>
//                 <div style={scoreStyle}>
//                   {score} / {quizData.levels.length}
//                 </div>
//                 <div style={completionMessageStyle}>
//                   {score === quizData.levels.length
//                     ? "Perfect score! You've mastered this topic! 🎉"
//                     : score >= quizData.levels.length / 2
//                     ? "Good job! You have a solid understanding of the material. 👍"
//                     : "Keep learning and practicing! You'll improve with more study. 📚"}
//                 </div>
//                 <button
//                   style={buttonStyle}
//                   onClick={() => {
//                     setCurrentLevel(1);
//                     setUserAnswers({});
//                     setScore(0);
//                     setQuizCompleted(false);
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.transform = "translateY(-2px)";
//                     e.target.style.boxShadow =
//                       "0 6px 15px rgba(67, 97, 238, 0.3)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.transform = "translateY(0)";
//                     e.target.style.boxShadow =
//                       "0 4px 10px rgba(67, 97, 238, 0.25)";
//                   }}
//                 >
//                   Try Again
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import Navbar from "../../components/common/Navbar";
import SideBar from "../../components/common/SideBar";

export default function TakeQuizByCourse() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirstQuiz = async () => {
      try {
        const res = await apiRequest({ endpoint: `/quiz/course/${courseId}` });
        if (res.quizzes.length > 0) {
          setQuiz(res.quizzes[0]);
        } else {
          alert("No quiz available for this course");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchFirstQuiz();
  }, [courseId]);

  const handleAnswerSelect = (level, answer) => {
    setUserAnswers({
      ...userAnswers,
      [level]: answer,
    });
  };

  const handleNextLevel = () => {
    // Move to next level or complete quiz
    if (currentLevel < quiz.questions.length) {
      setCurrentLevel(currentLevel + 1);
    } else {
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = async () => {
    // Format answers for API submission
    const formattedAnswers = quiz.questions.map((q, index) => ({
      questionId: q._id,
      selectedOption: userAnswers[index + 1] || null,
    }));

    try {
      const res = await apiRequest({
        endpoint: "/userQuiz",
        method: "POST",
        body: { quizId: quiz._id, answers: formattedAnswers },
      });

      if (res.success) {
        setScore(res.userQuiz.score);
        setSubmitted(true);
      } else {
        alert("Error submitting quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    }
  };

  // Styles
  const containerStyle = {
    marginLeft: "280px",
    marginTop: "60px",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8f9fa",
    minHeight: "calc(100vh - 60px)",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const quizContainerStyle = {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    padding: "25px",
    position: "relative",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "2px solid #f0f0f0",
  };

  const progressContainerStyle = {
    marginBottom: "20px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
  };

  const progressBarStyle = {
    height: "6px",
    backgroundColor: "#e9ecef",
    borderRadius: "3px",
    overflow: "hidden",
    marginBottom: "8px",
  };

  const progressFillStyle = {
    height: "100%",
    background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
    width: `${(currentLevel / (quiz?.questions?.length || 1)) * 100}%`,
    transition: "width 0.5s ease",
    borderRadius: "3px",
  };

  const levelIndicatorStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    color: "#6c757d",
  };

  const questionStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#212529",
    lineHeight: "1.4",
    textAlign: "center",
  };

  const optionsContainerStyle = {
    marginBottom: "25px",
  };

  const optionStyle = {
    display: "block",
    padding: "15px",
    marginBottom: "12px",
    backgroundColor: "#f8f9fa",
    border: "2px solid #e9ecef",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "15px",
    width: "100%",
    textAlign: "left",
  };

  const selectedOptionStyle = {
    ...optionStyle,
    backgroundColor: "#e7f3ff",
    borderColor: "#4361ee",
    boxShadow: "0 4px 10px rgba(67, 97, 238, 0.15)",
  };

  const buttonStyle = {
    padding: "12px 25px",
    background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 10px rgba(67, 97, 238, 0.25)",
    width: "100%",
    marginTop: "10px",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    background: "#e9ecef",
    color: "#6c757d",
    cursor: "not-allowed",
    boxShadow: "none",
  };

  const resultsContainerStyle = {
    textAlign: "center",
    padding: "30px 20px",
  };

  const scoreStyle = {
    fontSize: "48px",
    fontWeight: "700",
    background: "linear-gradient(90deg, #4361ee, #3a0ca3)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    margin: "15px 0",
  };

  const completionMessageStyle = {
    fontSize: "16px",
    marginBottom: "25px",
    color: "#495057",
  };

  const badgeStyle = {
    fontSize: "70px",
    marginBottom: "15px",
  };

  if (loading)
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div
            style={{
              marginLeft: "280px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <p>Loading quiz...</p>
          </div>
        </div>
      </div>
    );

  if (!quiz)
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div
            style={{
              marginLeft: "280px",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <p>No quiz found for this course.</p>
          </div>
        </div>
      </div>
    );

  if (submitted) {
    return (
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <SideBar />
          <div
            style={{
              marginLeft: "280px",
              padding: "20px",
              textAlign: "center",
              minHeight: "calc(100vh - 60px)",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <div style={badgeStyle}>
                {score === quiz.questions.length
                  ? "🏆"
                  : score >= quiz.questions.length / 2
                  ? "👍"
                  : "📚"}
              </div>
              <h2
                style={{
                  color: "#3a0ca3",
                  marginBottom: "12px",
                  fontSize: "24px",
                }}
              >
                Quiz Completed!
              </h2>
              <div style={scoreStyle}>
                {score} / {quiz.questions.length}
              </div>
              <p style={completionMessageStyle}>
                {score === quiz.questions.length
                  ? "Perfect score! You've mastered this topic! 🎉"
                  : score >= quiz.questions.length / 2
                  ? "Good job! You have a solid understanding of the material. 👍"
                  : "Keep learning and practicing! You'll improve with more study. 📚"}
              </p>
              <button
                style={buttonStyle}
                onClick={() => {
                  setCurrentLevel(1);
                  setUserAnswers({});
                  setSubmitted(false);
                  setScore(0);
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 15px rgba(67, 97, 238, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 10px rgba(67, 97, 238, 0.25)";
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentLevel - 1];

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={containerStyle}>
          <div style={quizContainerStyle}>
            <div style={headerStyle}>
              <h2
                style={{
                  color: "#3a0ca3",
                  marginBottom: "8px",
                  fontSize: "22px",
                }}
              >
                {quiz.title}
              </h2>
              <p style={{ color: "#6c757d", margin: 0, fontSize: "14px" }}>
                {quiz.description ||
                  "Test your Programming knowledge – Let’s See How Much You Really Know Answer carefully"}
              </p>
            </div>

            <div style={progressContainerStyle}>
              <div style={progressBarStyle}>
                <div style={progressFillStyle}></div>
              </div>
              <div style={levelIndicatorStyle}>
                <span>
                  Level {currentLevel} of {quiz.questions.length}
                </span>
                <span>
                  Score: {score}/{quiz.questions.length}
                </span>
              </div>
            </div>

            <div style={questionStyle}>{currentQuestion.questionText}</div>

            <div style={optionsContainerStyle}>
              {currentQuestion.options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentLevel, opt)}
                  style={
                    userAnswers[currentLevel] === opt
                      ? selectedOptionStyle
                      : optionStyle
                  }
                  onMouseEnter={(e) => {
                    if (userAnswers[currentLevel] !== opt) {
                      e.currentTarget.style.backgroundColor = "#e9ecef";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (userAnswers[currentLevel] !== opt) {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                style={
                  userAnswers[currentLevel] !== undefined
                    ? buttonStyle
                    : disabledButtonStyle
                }
                onClick={handleNextLevel}
                disabled={userAnswers[currentLevel] === undefined}
                onMouseEnter={(e) => {
                  if (userAnswers[currentLevel] !== undefined) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 15px rgba(67, 97, 238, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (userAnswers[currentLevel] !== undefined) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 10px rgba(67, 97, 238, 0.25)";
                  }
                }}
              >
                {currentLevel === quiz.questions.length
                  ? "Finish Quiz"
                  : "Next Level →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

