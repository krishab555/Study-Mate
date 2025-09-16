// import React from "react";
// import { BrowserRouter} from "react-router-dom";
// import PageRoutes from "./routes/Routes";


// const App = () => {
//   return (
   

//     <BrowserRouter>
//     <PageRoutes/>
//     </BrowserRouter>
    
//   );
// };

// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routes/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
};

export default App;
