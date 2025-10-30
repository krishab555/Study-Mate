
import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routes/Routes";
import "./App.css"
import { ModalProvider } from "./Context/ModelContext";


const App = () => {
  return (
    <BrowserRouter>
    <ModalProvider>
      <PageRoutes />
    </ModalProvider>
    </BrowserRouter>
  );
};

export default App;
