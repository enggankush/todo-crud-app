import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./page/users/DashboardPage";
import ToDoPage from "./page/todo/TodoPage";
import RegisterPage from "./page/auth/RegisterPage";
import LoginPage from "./page/auth/LoginPage";
import LoginSuccessPage from "./page/auth/LoginSuccessPage";
import ProfilePage from "./page/users/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-success" element={<LoginSuccessPage />} />
          <Route path="/todo" element={<ToDoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
