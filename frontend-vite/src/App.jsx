import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from './components/layout/Hero';
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizationForm from "./pages/OrganizationForm";
import AmbulanceForm from "./pages/AmbulanceForm";
import UserForm from './pages/UserForm';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hero" element={<Hero />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* New Route for Add Organization */}
        <Route path="/admin/add-organization" element={<OrganizationForm />} />
        <Route path="/admin/manage-ambulance" element={<AmbulanceForm />} />
        <Route path="/admin/users" element={<UserForm />} />
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
