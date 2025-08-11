import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackModal from "../components/FeedbackModal";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, booking: null });

  // Simulate login check
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // or use a context
    if (!user) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      // Replace this with your actual API call
      const response = await fetch("http://localhost:8080/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if using token
        },
      });

      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      console.log('Bookings data:', data); // Debug log to see the structure
      setBookings(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {JSON.parse(localStorage.getItem("user"))?.name || "User"}!
          </h1>
          <p className="text-gray-500">
            Here's your emergency service dashboard
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Bookings" value={bookings.length} icon="🚑" />
        <StatCard
          label="Completed Trips"
          value={bookings.filter(b => b.bookingStatus === "COMPLETED").length}
          icon="✅"
        />
        <StatCard
          label="Active Bookings"
          value={bookings.filter(b => b.bookingStatus === "PENDING" || b.bookingStatus === "ASSIGNED").length}
          icon="🔄"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔁 Your Bookings
          </h2>
          <button 
            onClick={() => navigate('/booking/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
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
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-semibold">Booking #{booking.id}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.bookingStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        booking.bookingStatus === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                        booking.bookingStatus === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-800' :
                        booking.bookingStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        booking.bookingStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.bookingStatus || 'UNKNOWN'}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {booking.emergencyType}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">📍 Pickup Location</p>
                        <p className="font-medium">{booking.pickupLocation?.address || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">📍 Drop Location</p>
                        <p className="font-medium">{booking.dropLocation?.address || 'N/A'}</p>
                      </div>
                    </div>
                    
                    {booking.ambulance && (
                      <div className="mt-3 text-sm">
                        <p className="text-gray-500">🚑 Ambulance: <span className="font-medium text-gray-800">{booking.ambulance.ambulanceNumber}</span></p>
                      </div>
                    )}
                    
                    {booking.bookingStatus === 'COMPLETED' && !booking.feedbackId && (
                      <div className="mt-4">
                        <button
                          onClick={() => setFeedbackModal({ isOpen: true, booking })}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition flex items-center gap-2"
                        >
                          <span>💬</span> Give Feedback
                        </button>
                      </div>
                    )}
                    
                    {booking.bookingStatus === 'COMPLETED' && booking.feedbackId && (
                      <div className="mt-4">
                        <p className="text-sm text-green-600 flex items-center gap-2">
                          <span>✅</span> Feedback submitted
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {booking.createdAt && (
                    <div className="text-right text-sm text-gray-500">
                      <p>{new Date(booking.createdAt).toDateString()}</p>
                      <p>{new Date(booking.createdAt).toLocaleTimeString('en-US', { 
                        hour: 'numeric', 
                        minute: '2-digit',
                        hour12: true 
                      })}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Feedback Modal */}
      <FeedbackModal
        booking={feedbackModal.booking}
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ isOpen: false, booking: null })}
        onSuccess={() => {
          // Optionally refresh bookings after successful feedback
          fetchBookings();
        }}
      />
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
