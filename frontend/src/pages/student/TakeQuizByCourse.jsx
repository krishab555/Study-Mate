import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utils/api";

const TakeQuizByCourse = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchFirstQuiz = async () => {
  //     try {
  //       const res = await apiRequest({ endpoint: `/quiz/course/${courseId}` });
  //       console.log(`quiz data`, res.quizzes[0])
  //       if (res.success && res.quizzes.length > 0) {
  //         setQuiz(res.quizzes[0]); // use the first quiz
  //       } else {
  //         alert("No quiz available for this course");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       alert("Error fetching quiz");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchFirstQuiz();
  // }, [courseId]);

  useEffect(() => {
    const fetchFirstQuiz = async () => {
      try {
        const res = await apiRequest({ endpoint: `/quiz/course/${courseId}` });
        console.log(`quiz data`, res.quizzes[0])
        if (res.quizzes.length > 0) {
          setQuiz(res.quizzes[0]); // use the first quiz
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
  }, []);

console.log(`quiz 2`, quiz)
  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>No quiz found for this course.</p>;

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Quiz Completed!</h2>
        <p>
          Your Score: {score} / {quiz.questions.length}
        </p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];

  const handleOption = (option) => {
    setAnswers({ ...answers, [currentQuestion._id]: option });
  };

  const goNext = () => setCurrentIndex((prev) => prev + 1);
  const goBack = () => setCurrentIndex((prev) => prev - 1);

  const handleSubmitQuiz = async () => {
    const formattedAnswers = quiz.questions.map((q) => ({
      questionId: q._id,
      selectedOption: answers[q._id] || null,
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
  return (
    <div style={{  padding: "40px",paddingLeft:"280px", maxWidth: "700px", margin: "auto" }}>
      <h3>
        Question {currentIndex + 1} / {quiz.questions.length}
      </h3>
      <p>{currentQuestion.questionText}</p>
      {currentQuestion.options.map((opt) => (
        <button
          key={opt}
          onClick={() => handleOption(opt)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px 20px",
            backgroundColor:
              answers[currentQuestion._id] === opt ? "#6c5ce7" : "#fff",
            color: answers[currentQuestion._id] === opt ? "#fff" : "#000",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {opt}
        </button>
      ))}
      <div style={{ marginTop: "20px" }}>
        {currentIndex > 0 && <button onClick={goBack}>Previous</button>}
        {currentIndex < quiz.questions.length - 1 ? (
          <button
            onClick={goNext}
            disabled={!answers[currentQuestion._id]}
            style={{ marginLeft: "10px" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={!answers[currentQuestion._id]}
            style={{ marginLeft: "10px" }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeQuizByCourse;


// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { apiRequest } from "../../utils/api";

// const TakeQuizByCourse = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFirstQuiz = async () => {
//       try {
//         const res = await apiRequest({ endpoint: `/quiz/course/${courseId}` });
//         if (res.success && res.data.length > 0) {
//           // Redirect to first quiz
//           navigate(`/student/take-quiz/${res.data[0]._id}`);
//         } else {
//           alert("No quiz available for this course");
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Error fetching quiz");
//       }
//     };
//     fetchFirstQuiz();
//   }, [courseId, navigate]);

//   return <p>Loading quiz...</p>;
// };

// export default TakeQuizByCourse;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { apiRequest } from "../../utils/api";

// const TakeQuizze = () => {
//   const { quizId } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const res = await apiRequest({ endpoint: `/quiz/${quizId}` });
//         if (res.success) setQuiz(res.quiz);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     if (quizId) fetchQuiz();
//   }, [quizId]);

//   if (!quiz) return <p>Loading quiz...</p>;

//   const currentQuestion = quiz.questions[currentIndex];

//   const handleOption = (option) => {
//     setAnswers({ ...answers, [currentQuestion._id]: option });
//   };

//   const goNext = () => setCurrentIndex((prev) => prev + 1);
//   const goBack = () => setCurrentIndex((prev) => prev - 1);

//   const handleSubmitQuiz = async () => {
//     const formattedAnswers = quiz.questions.map((q) => ({
//       questionId: q._id,
//       selectedOption: answers[q._id] || null,
//     }));

//     try {
//       const res = await apiRequest({
//         endpoint: "/userQuiz",
//         method: "POST",
//         body: { quizId: quiz._id, answers: formattedAnswers },
//       });

//       if (res.success) {
//         setScore(res.userQuiz.score);
//         setSubmitted(true);
//       } else {
//         alert("Error submitting quiz");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting quiz");
//     }
//   };

//   if (submitted) {
//     return (
//       <div style={{ textAlign: "center", padding: "40px" }}>
//         <h2>Quiz Completed!</h2>
//         <p>
//           Your Score: {score} / {quiz.questions.length}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
//       <h3>
//         Question {currentIndex + 1} / {quiz.questions.length}
//       </h3>
//       <p>{currentQuestion.questionText}</p>
//       {currentQuestion.options.map((opt) => (
//         <button
//           key={opt}
//           onClick={() => handleOption(opt)}
//           style={{
//             display: "block",
//             margin: "10px 0",
//             padding: "10px 20px",
//             backgroundColor:
//               answers[currentQuestion._id] === opt ? "#6c5ce7" : "#fff",
//             color: answers[currentQuestion._id] === opt ? "#fff" : "#000",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             cursor: "pointer",
//           }}
//         >
//           {opt}
//         </button>
//       ))}
//       <div style={{ marginTop: "20px" }}>
//         {currentIndex > 0 && <button onClick={goBack}>Previous</button>}
//         {currentIndex < quiz.questions.length - 1 ? (
//           <button
//             onClick={goNext}
//             disabled={!answers[currentQuestion._id]}
//             style={{ marginLeft: "10px" }}
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmitQuiz}
//             disabled={!answers[currentQuestion._id]}
//             style={{ marginLeft: "10px" }}
//           >
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuizze;
