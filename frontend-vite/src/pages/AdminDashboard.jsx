// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Activity, Ambulance, User, ShieldCheck, PhoneCall } from "lucide-react";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ name: "Admin" });

//   useEffect(() => {
//     setUser({ name: "Admin" });
//   }, []);

//   const dashboardStats = [
//     {
//       title: "Total Bookings",
//       value: 124,
//       icon: <Activity size={28} className="text-red-500" />,
//     },
//     {
//       title: "Registered Users",
//       value: 89,
//       icon: <User size={28} className="text-blue-500" />,
//     },
//     {
//       title: "Ambulances",
//       value: 15,
//       icon: <Ambulance size={28} className="text-yellow-500" />,
//     },
//     {
//       title: "Active Feedbacks",
//       value: 10,
//       icon: <ShieldCheck size={28} className="text-green-500" />,
//     },
//   ];

//   const manageActions = [
//     {
//       label: "Manage Bookings",
//       onClick: () => navigate("/admin/bookings"),
//       color: "bg-red-500 hover:bg-red-600 text-white",
//     },
//     {
//       label: "Manage Ambulances",
//       onClick: () => navigate("/admin/ambulances"),
//       color: "bg-yellow-500 hover:bg-yellow-600 text-white",
//     },
//     {
//       label: "View Feedback",
//       onClick: () => navigate("/admin/feedbacks"),
//       color: "border border-gray-400 hover:bg-gray-100 text-gray-700",
//     },
//     {
//       label: "Support Calls",
//       onClick: () => navigate("/admin/support"),
//       color: "bg-blue-600 hover:bg-blue-700 text-white",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-br from-white via-blue-50 to-red-50 min-h-screen">
//       <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
//         <h1 className="text-2xl font-bold text-red-600">ResQGo Admin</h1>
//         <button
//           onClick={() => navigate("/login")}
//           className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
//         >
//           Logout
//         </button>
//       </nav>

//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           Admin Dashboard
//         </h2>

//         {/* Stat Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//           {dashboardStats.map((stat, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-xl shadow-lg p-5 flex items-center gap-4"
//             >
//               <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
//               <div>
//                 <p className="text-gray-500 text-sm">{stat.title}</p>
//                 <h3 className="text-xl font-bold">{stat.value}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           {manageActions.map((action, idx) => (
//             <button
//               key={idx}
//               onClick={action.onClick}
//               className={`py-3 px-4 rounded-lg font-medium ${action.color}`}
//             >
//               {action.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import Sidebar from "../components/admin/Sidebar";
import DashboardCard from "../components/admin/DashboardCard";


export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Total Bookings" value="1,250" />
          <DashboardCard title="Available Ambulances" value="24" />
          <DashboardCard title="Pending Feedbacks" value="13" />
        </div>

        {/* Add tables/charts here */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-500">Booking table coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
