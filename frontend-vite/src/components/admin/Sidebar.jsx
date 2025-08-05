import { LayoutDashboard, Ambulance, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-full p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-8">ResQGo Admin</h2>

      <nav className="flex flex-col space-y-4">
        <Link to="/admin/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/ambulances" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
          <Ambulance className="w-5 h-5" />
          <span>Ambulances</span>
        </Link>

        <Link to="/admin/users" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
          <User className="w-5 h-5" />
          <span>Users</span>
        </Link>

        <Link to="/logout" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
}
