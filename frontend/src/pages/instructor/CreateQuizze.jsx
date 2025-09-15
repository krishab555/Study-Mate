// import React, { useState } from "react";

// const CreateQuizze = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: Date.now(),
//       questionText: "",
//       options: ["", ""],
//       correctAnswerIndex: null,
//     },
//   ]);

//   const addQuestion = () => {
//     setQuestions((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         questionText: "",
//         options: ["", ""],
//         correctAnswerIndex: null,
//       },
//     ]);
//   };

//   const removeQuestion = (id) => {
//     setQuestions((prev) => prev.filter((q) => q.id !== id));
//   };

//   const updateQuestionText = (id, text) => {
//     setQuestions((prev) =>
//       prev.map((q) => (q.id === id ? { ...q, questionText: text } : q))
//     );
//   };

//   const addOption = (questionId) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId ? { ...q, options: [...q.options, ""] } : q
//       )
//     );
//   };

//   const updateOptionText = (questionId, index, text) => {
//     setQuestions((prev) =>
//       prev.map((q) => {
//         if (q.id === questionId) {
//           const newOptions = [...q.options];
//           newOptions[index] = text;
//           return { ...q, options: newOptions };
//         }
//         return q;
//       })
//     );
//   };

//   const removeOption = (questionId, index) => {
//     setQuestions((prev) =>
//       prev.map((q) => {
//         if (q.id === questionId) {
//           const newOptions = q.options.filter((_, i) => i !== index);
//           let newCorrectIndex = q.correctAnswerIndex;
//           // Adjust correctAnswerIndex if needed
//           if (q.correctAnswerIndex === index) {
//             newCorrectIndex = null;
//           } else if (q.correctAnswerIndex > index) {
//             newCorrectIndex = q.correctAnswerIndex - 1;
//           }
//           return {
//             ...q,
//             options: newOptions,
//             correctAnswerIndex: newCorrectIndex,
//           };
//         }
//         return q;
//       })
//     );
//   };

//   const setCorrectAnswer = (questionId, index) => {
//     setQuestions((prev) =>
//       prev.map((q) =>
//         q.id === questionId ? { ...q, correctAnswerIndex: index } : q
//       )
//     );
//   };

//   const handleSubmit = () => {
//     // Basic validation: all questions must have text, at least 2 options,
//     // and a selected correct answer
//     for (let q of questions) {
//       if (!q.questionText.trim()) {
//         alert("Please fill all question texts.");
//         return;
//       }
//       if (q.options.length < 2) {
//         alert("Each question must have at least 2 options.");
//         return;
//       }
//       if (q.options.some((opt) => !opt.trim())) {
//         alert("Please fill all options.");
//         return;
//       }
//       if (q.correctAnswerIndex === null) {
//         alert("Please select a correct answer for every question.");
//         return;
//       }
//     }

//     // You can send questions to your API here
//     console.log("Quiz to submit:", questions);
//     alert("Quiz saved! (Check console log)");
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
//       <h2 style={{ marginBottom: "20px" }}>Create Quiz</h2>

//       {questions.map((q, qIndex) => (
//         <div
//           key={q.id}
//           style={{
//             marginBottom: "30px",
//             padding: "20px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             backgroundColor: "#f9f9f9",
//           }}
//         >
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <h4>Question {qIndex + 1}</h4>
//             {questions.length > 1 && (
//               <button
//                 onClick={() => removeQuestion(q.id)}
//                 style={{
//                   background: "transparent",
//                   border: "none",
//                   color: "red",
//                   cursor: "pointer",
//                   fontSize: "18px",
//                 }}
//                 title="Remove question"
//               >
//                 &times;
//               </button>
//             )}
//           </div>

//           <textarea
//             value={q.questionText}
//             onChange={(e) => updateQuestionText(q.id, e.target.value)}
//             placeholder="Enter question text"
//             style={{
//               width: "100%",
//               minHeight: "60px",
//               fontSize: "16px",
//               padding: "10px",
//               marginBottom: "15px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//               resize: "vertical",
//             }}
//           />

//           <div>
//             {q.options.map((opt, i) => (
//               <div
//                 key={i}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginBottom: "10px",
//                 }}
//               >
//                 <input
//                   type="radio"
//                   name={`correct-answer-${q.id}`}
//                   checked={q.correctAnswerIndex === i}
//                   onChange={() => setCorrectAnswer(q.id, i)}
//                   style={{ marginRight: "10px" }}
//                 />
//                 <input
//                   type="text"
//                   value={opt}
//                   onChange={(e) => updateOptionText(q.id, i, e.target.value)}
//                   placeholder={`Option ${i + 1}`}
//                   style={{
//                     flex: 1,
//                     padding: "8px 10px",
//                     fontSize: "15px",
//                     borderRadius: "5px",
//                     border: "1px solid #ccc",
//                   }}
//                 />
//                 {q.options.length > 2 && (
//                   <button
//                     onClick={() => removeOption(q.id, i)}
//                     style={{
//                       marginLeft: "8px",
//                       backgroundColor: "red",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                       padding: "6px 10px",
//                       fontWeight: "bold",
//                     }}
//                     title="Remove option"
//                   >
//                     &times;
//                   </button>
//                 )}
//               </div>
//             ))}

//             <button
//               onClick={() => addOption(q.id)}
//               style={{
//                 marginTop: "10px",
//                 padding: "8px 15px",
//                 backgroundColor: "#6c5ce7",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//               }}
//             >
//               + Add Option
//             </button>
//           </div>
//         </div>
//       ))}

//       <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
//         <button
//           onClick={addQuestion}
//           style={{
//             padding: "12px 20px",
//             backgroundColor: "#0984e3",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           + Add Question
//         </button>

//         <button
//           onClick={handleSubmit}
//           style={{
//             padding: "12px 20px",
//             backgroundColor: "#6c5ce7",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontWeight: "bold",
//           }}
//         >
//           Save Quiz
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateQuizze;
import React, { useState } from "react";

const CreateQuizze = () => {
  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      questionText: "",
      options: ["", "", "", ""], // Always 4 options initially
      correctAnswerIndex: null,
    },
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        questionText: "",
        options: ["", "", "", ""], // 4 options by default
        correctAnswerIndex: null,
      },
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestionText = (id, text) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, questionText: text } : q))
    );
  };

  const updateOptionText = (questionId, index, text) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[index] = text;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const setCorrectAnswer = (questionId, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, correctAnswerIndex: index } : q
      )
    );
  };

  const handleSubmit = () => {
    for (let q of questions) {
      if (!q.questionText.trim()) {
        alert("Please fill all question texts.");
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        alert("Please fill all options.");
        return;
      }
      if (q.correctAnswerIndex === null) {
        alert("Please select a correct answer for every question.");
        return;
      }
    }
    console.log("Quiz to submit:", questions);
    alert("Quiz saved! (Check console log)");
  };

  return (
    <div
      style={{
        marginLeft: "280px", // Make space for sidebar (adjust if your sidebar width differs)
        padding: "40px 30px",
        maxWidth: "800px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Create Quiz</h2>

      {questions.map((q, qIndex) => (
        <div
          key={q.id}
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Question {qIndex + 1}</h4>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(q.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                title="Remove question"
              >
                &times;
              </button>
            )}
          </div>

          <textarea
            value={q.questionText}
            onChange={(e) => updateQuestionText(q.id, e.target.value)}
            placeholder="Enter question text"
            style={{
              width: "100%",
              minHeight: "60px",
              fontSize: "16px",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              resize: "vertical",
            }}
          />

          <div>
            {q.options.map((opt, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="radio"
                  name={`correct-answer-${q.id}`}
                  checked={q.correctAnswerIndex === i}
                  onChange={() => setCorrectAnswer(q.id, i)}
                  style={{ marginRight: "10px" }}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOptionText(q.id, i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  style={{
                    flex: 1,
                    padding: "8px 10px",
                    fontSize: "15px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
        <button
          onClick={addQuestion}
          style={{
            padding: "12px 20px",
            backgroundColor: "#0984e3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Add Question
        </button>

        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 20px",
            backgroundColor: "#6c5ce7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuizze;
