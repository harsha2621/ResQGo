import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizationForm from "./pages/OrganizationForm";
import AmbulanceForm from "./pages/AmbulanceForm";
import UserForm from './pages/UserForm';
import UserDashboard from "./pages/UserDashboard";
import DriverRegisterForm from "./pages/DriverRegisterForm";
import DriverDashboard from "./pages/DriverDashboard";
import BookingForm from "./pages/BookingForm";
import AdminBookings from "./pages/AdminBookings";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/driver/register" element={<DriverRegisterForm />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* New Route for Add Organization */}
        <Route path="/admin/add-organization" element={<OrganizationForm />} />
        <Route path="/admin/manage-ambulance" element={<AmbulanceForm />} />
        <Route path="/admin/users" element={<UserForm />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
         <Route path="/user/dashboard" element={<UserDashboard />} />
         <Route path="/booking/new" element={<BookingForm />} />
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
