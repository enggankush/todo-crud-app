import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginSuccessPage from "./pages/auth/LoginSuccessPage";
import ResetPage from "./pages/auth/ResetPage";
import DashboardPage from "./admin/Dashboard";
import Profile from "./admin/Profile";
import ToDoPage from "./pages/todo/ToDopage";
import TieTacGame from "./pages/game/TieTac";

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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/game" element={<TieTacGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
