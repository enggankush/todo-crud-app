import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./page/users/DashboardPage";
import ToDoPage from "./page/todo/TodoPage";
import RegisterPage from "./page/auth/RegisterPage";
import LoginPage from "./page/auth/LoginPage";
import ProfilePage from "./page/users/ProfilePage";
import ResetPage from "./page/auth/ResetPage";
import SettingPage from "./page/users/SettingPage";
import UserPost from "./page/users/UserPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/post" element={<UserPost />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-pass" element={<ResetPage />} />
          <Route path="/todo" element={<ToDoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
