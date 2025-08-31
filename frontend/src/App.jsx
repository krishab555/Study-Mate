// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



// App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/Login"; // Make sure this path matches your folder structure

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route renders LoginPage */}
//         <Route path="/" element={<LoginPage />} />

//         {/* Optional: future routes */}
//         {/* <Route path="/register" element={<RegisterPage />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
//    import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import Header from './components/common/Header/Header';
// import Footer from './components/common/Footer/Footer';
// import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
// // Import other pages...

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Header />
//           <main>
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/login" element={<Login />} />
//               {/* Add other routes */}
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;