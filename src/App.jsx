import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginSuccessPage from "./pages/auth/LoginSuccessPage";
import ResetPage from "./pages/auth/ResetPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/login-success" element={<LoginSuccessPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
