import React from "react";
import { BrowserRouter} from "react-router-dom";
import PageRoutes from "./routes/Routes";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>

    <BrowserRouter>
    <PageRoutes/>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
