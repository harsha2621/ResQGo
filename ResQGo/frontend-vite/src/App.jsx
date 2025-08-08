import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from './components/layout/Hero';
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hero" element={<Hero />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
