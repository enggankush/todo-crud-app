// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./page/users/DashboardPage";
import ToDoPage from "./page/todo/TodoPage";
import TieTacGame from "./page/game/tiktak";
import RegisterPage from "./page/auth/RegisterPage";
import LoginPage from "./page/auth/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/game" element={<TieTacGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
