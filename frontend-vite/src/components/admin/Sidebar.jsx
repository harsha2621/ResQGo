// import { LayoutDashboard, Ambulance, User, LogOut } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <div className="w-64 bg-white shadow-md h-full p-6">
//       <h2 className="text-2xl font-bold text-red-600 mb-8">ResQGo Admin</h2>

//       <nav className="flex flex-col space-y-4">
//         <Link to="/admin/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
//           <LayoutDashboard className="w-5 h-5" />
//           <span>Dashboard</span>
//         </Link>

//         <Link to="/admin/ambulances" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
//           <Ambulance className="w-5 h-5" />
//           <span>Ambulances</span>
//         </Link>

//         <Link to="/admin/users" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
//           <User className="w-5 h-5" />
//           <span>Users</span>
//         </Link>

//         <Link to="/logout" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
//           <LogOut className="w-5 h-5" />
//           <span>Logout</span>
//         </Link>
//       </nav>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  Building2, 
  LogOut,
  Menu,
  X,
  Calendar
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/admin/manage-ambulance",
      name: "Ambulances",
      icon: Truck,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: Users,
    },
    // {
    //   path: "/admin/add-organization",
    //   name: "Organizations",
    //   icon: Building2,
    // },
    {
      path: "/admin/bookings",
      name: "Bookings",
      icon: Calendar,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-screen bg-gradient-to-b from-red-600 to-red-700 shadow-2xl fixed transition-all duration-300 ease-in-out`}>
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-red-500">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold text-xl">❤️</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <h2 className="text-white font-bold text-xl">ResQGo</h2>
                <p className="text-red-100 text-xs">Admin Portal</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-red-500 p-1 rounded transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>

      {/* User Info */}
      {user && !isCollapsed && (
        <div className="px-6 py-4 border-b border-red-500">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{user.name?.charAt(0) || 'A'}</span>
            </div>
            <div className="ml-3">
              <p className="text-white font-medium text-sm">{user.name || 'Admin User'}</p>
              <p className="text-red-200 text-xs">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="px-3 py-6 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 py-3 rounded-lg transition-all duration-200
                  ${isActive(item.path) 
                    ? 'bg-white text-red-600 shadow-md' 
                    : 'text-white hover:bg-red-500 hover:shadow-md'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <Icon size={20} className={isCollapsed ? '' : 'mr-3'} />
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout Section */}
        <div className="mt-8 pt-6 border-t border-red-500">
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200
              text-white hover:bg-red-500 hover:shadow-md
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} className={isCollapsed ? '' : 'mr-3'} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="px-6 py-4 border-t border-red-500">
          <p className="text-red-200 text-xs text-center">
            © 2024 ResQGo. All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
}
