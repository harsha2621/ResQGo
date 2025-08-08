// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UserDashboard() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   // Simulate login check
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user")); // or use a context
//     if (!user) {
//       navigate("/login"); // Redirect to login if not logged in
//     } else {
//       fetchBookings();
//     }
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       // Replace this with your actual API call
//       const response = await fetch("http://localhost:8080/api/bookings/user", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // if using token
//         },
//       });

//       if (!response.ok) throw new Error("Failed to fetch bookings");

//       const data = await response.json();
//       setBookings(data);
//     } catch (err) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">
//         Welcome back, Test User!
//       </h1>
//       <p className="text-gray-500 mb-6">
//         Here's your emergency service dashboard
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <StatCard label="Total Bookings" value={bookings.length} icon="❤️" />
//         <StatCard
//           label="Completed Trips"
//           value={bookings.filter(b => b.status === "COMPLETED").length}
//           icon="🕒"
//         />
//         <StatCard
//           label="Active Bookings"
//           value={bookings.filter(b => b.status === "ACTIVE").length}
//           icon="📍"
//         />
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             🔁 Your Bookings
//           </h2>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//             + New Booking
//           </button>
//         </div>
//         <hr className="mb-4" />

//         {loading ? (
//           <p className="text-gray-600">Loading bookings...</p>
//         ) : error ? (
//           <div className="text-center text-red-600">
//             Failed to load bookings. Please try again later.
//             <br />
//             <button
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//               onClick={fetchBookings}
//             >
//               Try Again
//             </button>
//           </div>
//         ) : bookings.length === 0 ? (
//           <p className="text-gray-600">No bookings found.</p>
//         ) : (
//           <ul>
//             {bookings.map((booking, index) => (
//               <li key={index} className="mb-2">
//                 {/* Customize display as needed */}
//                 Booking ID: {booking.id} - Status: {booking.status}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value, icon }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
//       <div>
//         <p className="text-gray-600">{label}</p>
//         <h3 className="text-2xl font-bold">{value}</h3>
//       </div>
//       <div className="text-3xl">{icon}</div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Check authentication using token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    } else {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token
        },
      });

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome back, Test User!
      </h1>
      <p className="text-gray-500 mb-6">
        Here's your emergency service dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Bookings" value={bookings.length} icon="❤️" />
        <StatCard
          label="Completed Trips"
          value={bookings.filter((b) => b.status === "COMPLETED").length}
          icon="🕒"
        />
        <StatCard
          label="Active Bookings"
          value={bookings.filter((b) => b.status === "ACTIVE").length}
          icon="📍"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔁 Your Bookings
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            + New Booking
          </button>
        </div>
        <hr className="mb-4" />

        {loading ? (
          <p className="text-gray-600">Loading bookings...</p>
        ) : error ? (
          <div className="text-center text-red-600">
            Failed to load bookings. Please try again later.
            <br />
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={fetchBookings}
            >
              Try Again
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600">No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking, index) => (
              <li key={index} className="mb-2">
                Booking ID: {booking.id} - Status: {booking.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-600">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}