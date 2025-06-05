import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard"; // 👈 importera

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* 👈 lägg till */}
      </Routes>
    </Router>
  );
}
