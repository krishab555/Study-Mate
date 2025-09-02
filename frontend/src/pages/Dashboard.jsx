// // import React from "react";
// // import Navbar from "../components/common/Navbar"; // ✅ Correct path

// // export default function Dashboard() {
// //   return (
// //     <div style={{ marginLeft: "250px", width: "100%" }}>
// //       {/* Navbar */}
// //       <Navbar />

// //       {/* Dashboard Content */}
// //       <div style={{ marginTop: "80px", padding: "20px" }}>
// //         {/* Hero Section */}
// //         <section style={{ textAlign: "center", marginBottom: "40px" }}>
// //           <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
// //             Welcome to our E-learning platform
// //           </h1>
// //           <p style={{ fontSize: "18px", marginTop: "10px", color: "#555" }}>
// //             Learn, Explore and Grow with StudyMate
// //           </p>
// //         </section>

// //         {/* Features Section */}
// //         <section
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "1fr 1fr",
// //             gap: "20px",
// //             marginBottom: "40px",
// //             alignItems: "center",
// //           }}
// //         >
// //           <div>
// //             <img
// //               src="https://via.placeholder.com/500x300"
// //               alt="Learning"
// //               style={{ width: "100%", borderRadius: "12px" }}
// //             />
// //           </div>
// //           <div>
// //             <h2
// //               style={{
// //                 fontSize: "24px",
// //                 fontWeight: "bold",
// //                 marginBottom: "12px",
// //               }}
// //             >
// //               We provide
// //             </h2>
// //             <ul
// //               style={{ marginTop: "15px", lineHeight: "1.8", fontSize: "16px" }}
// //             >
// //               <li>✅ Skill-based Learning</li>
// //               <li>✅ 24-7 Learning</li>
// //               <li>✅ Free Resources</li>
// //               <li>✅ Advance Learning from Experts</li>
// //               <li>✅ Certificates</li>
// //             </ul>
// //           </div>
// //         </section>

// //         {/* Courses Section */}
// //         <section>
// //           <h2
// //             style={{
// //               fontSize: "24px",
// //               fontWeight: "bold",
// //               marginBottom: "20px",
// //               textAlign: "center",
// //             }}
// //           >
// //             Latest Courses
// //           </h2>
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
// //               gap: "20px",
// //             }}
// //           >
// //             {/* Python */}
// //             <div
// //               style={{
// //                 background: "#f9f9f9",
// //                 padding: "20px",
// //                 borderRadius: "12px",
// //                 textAlign: "center",
// //                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// //               }}
// //             >
// //               <img
// //                 src="https://cdn.worldvectorlogo.com/logos/python-5.svg"
// //                 alt="Python"
// //                 style={{ width: "80px", height: "80px", marginBottom: "10px" }}
// //               />
// //               <h3>Python</h3>
// //             </div>

// //             {/* Java */}
// //             <div
// //               style={{
// //                 background: "#f9f9f9",
// //                 padding: "20px",
// //                 borderRadius: "12px",
// //                 textAlign: "center",
// //                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// //               }}
// //             >
// //               <img
// //                 src="https://cdn.worldvectorlogo.com/logos/java-4.svg"
// //                 alt="Java"
// //                 style={{ width: "80px", height: "80px", marginBottom: "10px" }}
// //               />
// //               <h3>Java</h3>
// //             </div>

// //             {/* NodeJS */}
// //             <div
// //               style={{
// //                 background: "#f9f9f9",
// //                 padding: "20px",
// //                 borderRadius: "12px",
// //                 textAlign: "center",
// //                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
// //               }}
// //             >
// //               <img
// //                 src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
// //                 alt="NodeJS"
// //                 style={{ width: "80px", height: "80px", marginBottom: "10px" }}
// //               />
// //               <h3>NodeJS</h3>
// //             </div>
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }
// import React from "react";

// const Dashboard = () => {
//   return (
//     <div style={{ padding: "0", margin: "0", fontFamily: "sans-serif" }}>
//       {/* Hero Banner */}
//       <section style={{ display: "flex", flexWrap: "wrap" }}>
//         <img
//           src="https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg"
//           alt="Learning"
//           style={{ width: "50%", objectFit: "cover", height: "300px" }}
//         />
//         <img
//           src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
//           alt="Team Learning"
//           style={{ width: "50%", objectFit: "cover", height: "300px" }}
//         />
//       </section>

//       {/* Welcome Text */}
//       <section style={{ textAlign: "center", padding: "40px 20px" }}>
//         <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
//           Welcome to our E-learning platform
//         </h1>
//         <p style={{ fontSize: "18px", marginTop: "10px", color: "#555" }}>
//           Learn, Explore and Grow with StudyMate
//         </p>
//       </section>

//       {/* We Provide Section */}
//       <section
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "40px 20px",
//           background: "#f2f2f2",
//           flexWrap: "wrap",
//         }}
//       >
//         <img
//           src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
//           alt="Student"
//           style={{
//             width: "350px",
//             borderRadius: "12px",
//             margin: "10px",
//           }}
//         />
//         <div style={{ marginLeft: "40px", minWidth: "250px" }}>
//           <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>We provide</h2>
//           <ul
//             style={{ marginTop: "15px", fontSize: "16px", lineHeight: "1.8" }}
//           >
//             <li>✅ Skill-based Learning</li>
//             <li>✅ 24×7 Learning</li>
//             <li>✅ Free Resources</li>
//             <li>✅ Advance Learning from Experts</li>
//             <li>✅ Certificates</li>
//           </ul>
//         </div>
//       </section>

//       {/* Courses Section */}
//       <section style={{ padding: "40px 20px" }}>
//         <h2
//           style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
//         >
//           Latest Courses
//         </h2>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             gap: "20px",
//             marginTop: "30px",
//           }}
//         >
//           {/* Python */}
//           <div
//             style={{
//               background: "#f9f9f9",
//               padding: "20px",
//               borderRadius: "12px",
//               textAlign: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <img
//               src="https://cdn.worldvectorlogo.com/logos/python-5.svg"
//               alt="Python"
//               style={{ width: "80px", height: "80px", marginBottom: "10px" }}
//             />
//             <h3>Python</h3>
//           </div>

//           {/* Java */}
//           <div
//             style={{
//               background: "#f9f9f9",
//               padding: "20px",
//               borderRadius: "12px",
//               textAlign: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <img
//               src="https://cdn.worldvectorlogo.com/logos/java-4.svg"
//               alt="Java"
//               style={{ width: "80px", height: "80px", marginBottom: "10px" }}
//             />
//             <h3>Java</h3>
//           </div>

//           {/* NodeJS */}
//           <div
//             style={{
//               background: "#f9f9f9",
//               padding: "20px",
//               borderRadius: "12px",
//               textAlign: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <img
//               src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
//               alt="NodeJS"
//               style={{ width: "80px", height: "80px", marginBottom: "10px" }}
//             />
//             <h3>NodeJS</h3>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
// import React from "react";

// export default function Dashboard() {
//   return (
//     <div style={{ paddingTop: "80px" }}>
//       {" "}
//       {/* ⬅️ Push content below navbar */}
//       {/* Top Two Images */}
//       <section style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
//         <img
//           src="https://img.freepik.com/free-photo/online-education-home_155003-11679.jpg"
//           alt="Online Learning"
//           style={{
//             width: "50%",
//             minWidth: "300px",
//             height: "250px",
//             objectFit: "cover",
//           }}
//         />
//         <img
//           src="https://img.freepik.com/premium-photo/young-beautiful-student-woman-using-laptop-writing-notebook-home_1303-18769.jpg"
//           alt="Student Writing"
//           style={{
//             width: "50%",
//             minWidth: "300px",
//             height: "250px",
//             objectFit: "cover",
//           }}
//         />
//       </section>
//       {/* Welcome Section */}
//       <section style={{ textAlign: "center", padding: "40px 20px" }}>
//         <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
//           Welcome to our E-learning platform
//         </h1>
//         <p style={{ fontSize: "18px", marginTop: "10px", color: "#555" }}>
//           Learn, Explore and Grow with StudyMate
//         </p>
//       </section>
//       {/* We Provide Section */}
//       <section
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           alignItems: "center",
//           background: "#f2f2f2",
//           padding: "40px 20px",
//         }}
//       >
//         <div style={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
//           <img
//             src="https://img.freepik.com/free-photo/smiling-young-woman-pointing-fingers-left-isolated-grey-wall_231208-11567.jpg"
//             alt="Instructor"
//             style={{
//               width: "100%",
//               maxWidth: "400px",
//               borderRadius: "12px",
//               objectFit: "cover",
//             }}
//           />
//         </div>
//         <div style={{ flex: "1", minWidth: "300px", padding: "20px" }}>
//           <h2
//             style={{
//               fontSize: "24px",
//               fontWeight: "bold",
//               marginBottom: "12px",
//             }}
//           >
//             We provide
//           </h2>
//           <ul
//             style={{ fontSize: "16px", lineHeight: "2", paddingLeft: "20px" }}
//           >
//             <li>✅ Skill-based Learning</li>
//             <li>✅ 24×7 Learning</li>
//             <li>✅ Free Resources</li>
//             <li>✅ Advance Learning from Experts</li>
//             <li>✅ Certificates</li>
//           </ul>
//         </div>
//       </section>
//       {/* Latest Courses */}
//       <section style={{ padding: "40px 20px" }}>
//         <h2
//           style={{
//             fontSize: "24px",
//             fontWeight: "bold",
//             marginBottom: "20px",
//             textAlign: "center",
//           }}
//         >
//           Latest Courses
//         </h2>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             gap: "20px",
//           }}
//         >
//           {/* Python */}
//           <div
//             style={{
//               background: "#f9f9f9",
//               padding: "20px",
//               borderRadius: "12px",
//               textAlign: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <img
//               src="https://cdn.worldvectorlogo.com/logos/python-5.svg"
//               alt="Python"
//               style={{ width: "80px", height: "80px", marginBottom: "10px" }}
//             />
//             <h3 style={{ fontWeight: "bold" }}>Python</h3>
//           </div>

//           {/* Java */}
//           <div
//             style={{
//               background: "#f9f9f9",
//               padding: "20px",
//               borderRadius: "12px",
//               textAlign: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <img
//               src="https://cdn.worldvectorlogo.com/logos/java-4.svg"
//               alt="Java"
//               style={{ width: "80px", height: "80px", marginBottom: "10px" }}
//             />
//             <h3 style={{ fontWeight: "bold" }}>Java</h3>
//           </div>

//           {/* NodeJS */}
//           <div
//             style={{
//               background: "#f9f9f9",
//               padding: "20px",
//               borderRadius: "12px",
//               textAlign: "center",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//             }}
//           >
//             <img
//               src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
//               alt="NodeJS"
//               style={{ width: "80px", height: "80px", marginBottom: "10px" }}
//             />
//             <h3 style={{ fontWeight: "bold" }}>NodeJS</h3>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import React from "react";

export default function Dashboard() {
  return (
    <div style={{ paddingTop: "80px", margin: 0 }}>
      {/* Top Two Images */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          width: "100%",
        }}
      >
        <img
          src="/image1.jpg"
          //src="https://img.freepik.com/free-photo/online-education-home_155003-11679.jpg"
          alt="Online Learning"
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
          }}
        />
        <img
          src="https://img.freepik.com/premium-photo/young-beautiful-student-woman-using-laptop-writing-notebook-home_1303-18769.jpg"
          alt="Student Writing"
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
          }}
        />
      </section>

      {/* Welcome Section
      <section style={{ textAlign: "center", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
          Welcome to our E-learning platform
        </h1>
        <p style={{ fontSize: "18px", marginTop: "10px", color: "#555" }}>
          Learn, Explore and Grow with StudyMate
        </p>
      </section> */}
      {/* Welcome Section */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px 2px",
          gap: "5px",
        }}
      >
        {/* Left Side Text */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
            Welcome to our E-learning platform
          </h1>
          <p
            style={{ fontSize: "18px", marginTop: "10px", color: "#0f0d0dff" }}
          >
            Learn, Explore and Grow with StudyMate
          </p>
        </div>

        {/* Right Side Image */}
        <div style={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
          <img
            src="/project1.webp"
            // src="https://img.freepik.com/free-photo/smiley-student-girl-using-laptop_23-2148215984.jpg"
            alt="E-learning"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      {/* We Provide Section */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f2f2",
          padding: "40px 20px",
        }}
      >
        <div style={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
          <img
            src="https://img.freepik.com/free-photo/smiling-young-woman-pointing-fingers-left-isolated-grey-wall_231208-11567.jpg"
             alt="Instructor"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: "1", minWidth: "300px", padding: "20px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            We provide
          </h2>
          <ul
            style={{ fontSize: "16px", lineHeight: "2", paddingLeft: "20px" }}
          >
            <li>✅ Skill-based Learning</li>
            <li>✅ 24×7 Learning</li>
            <li>✅ Free Resources</li>
            <li>✅ Advance Learning from Experts</li>
            <li>✅ Certificates</li>
          </ul>
        </div>
      </section>

      {/* Latest Courses */}
      <section style={{ padding: "40px 20px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Latest Courses
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Python */}
          <div
            style={{
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="/python image.jpg"
              alt="Python"
              style={{ width: "300px", height: "250px", marginBottom: "10px" }}
            />
            <h3 style={{ fontWeight: "bold" }}>Python</h3>
          </div>

          {/* Java */}
          <div
            style={{
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="/java image.png"
              alt="Java"
              style={{ width: "300px", height: "250px", marginBottom: "10px" }}
            />
            <h3 style={{ fontWeight: "bold" }}>Java</h3>
          </div>

          {/* NodeJS */}
          <div
            style={{
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="node js image.png"
              alt="NodeJS"
              style={{ width: "300px", height: "250px", marginBottom: "10px" }}
            />
            <h3 style={{ fontWeight: "bold" }}>NodeJS</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
