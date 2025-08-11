import React, { useState, useEffect } from 'react';
import Sidebar from '../components/admin/Sidebar';
import axios from 'axios';
import { Star, Calendar, User, MessageSquare, Hash, ChevronDown, ChevronUp } from 'lucide-react';

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem('token');
      // First fetch all bookings that have feedback
      const bookingsResponse = await axios.get('http://localhost:8080/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Filter bookings that have feedbackId
      const bookingsWithFeedback = bookingsResponse.data.filter(booking => booking.feedbackId);
      
      // For each booking with feedback, fetch the feedback details
      const feedbackPromises = bookingsWithFeedback.map(async (booking) => {
        try {
          const feedbackResponse = await axios.get(`http://localhost:9090/feedback/${booking.feedbackId}`);
          return {
            ...feedbackResponse.data,
            booking: booking
          };
        } catch (err) {
          console.error(`Failed to fetch feedback ${booking.feedbackId}:`, err);
          return null;
        }
      });
      
      const feedbackResults = await Promise.all(feedbackPromises);
      const validFeedbacks = feedbackResults.filter(f => f !== null);
      
      setFeedbacks(validFeedbacks);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('Failed to fetch feedbacks');
      setLoading(false);
    }
  };


  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-y-auto ml-64 transition-all duration-300">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Customer Feedbacks</h1>
          <p className="text-gray-600 mt-1">View all customer feedbacks and ratings</p>
        </div>

        {/* Feedbacks Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600">No feedbacks found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="p-5">
                  {/* Header with Rating and Date */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div>{renderStars(feedback.rating)}</div>
                      <span className="text-sm font-medium text-gray-700">{feedback.rating}/5</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {feedback.booking?.createdAt ? new Date(feedback.booking.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {feedback.booking?.createdAt ? new Date(feedback.booking.createdAt).toLocaleTimeString() : ''}
                      </p>
                    </div>
                  </div>

                  {/* Feedback Content */}
                  <div className="mb-4">
                    <p className="text-gray-700">{feedback.comments || 'No comments provided'}</p>
                  </div>

                  {/* Booking Details */}
                  {feedback.booking && (
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Booking Details</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {/* Booking ID */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                          <div className="flex items-center gap-1 text-gray-900 font-medium">
                            <Hash className="h-3 w-3 text-gray-400" />
                            {feedback.booking.id}
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Status</p>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            feedback.booking.bookingStatus === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {feedback.booking.bookingStatus || 'N/A'}
                          </span>
                        </div>

                        {/* Customer */}
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-500 mb-1">Customer</p>
                          <p className="text-gray-900 font-medium">{feedback.booking.user?.name || 'N/A'}</p>
                          <p className="text-xs text-gray-600">{feedback.booking.user?.phone || 'N/A'}</p>
                        </div>

                        {/* Route */}
                        <div className="md:col-span-2">
                          <p className="text-xs text-gray-500 mb-1">Route</p>
                          <p className="text-gray-700 text-xs">
                            <span className="font-medium">From:</span> {feedback.booking.pickupLocation?.address || 'N/A'}
                          </p>
                          <p className="text-gray-700 text-xs mt-1">
                            <span className="font-medium">To:</span> {feedback.booking.dropLocation?.address || 'N/A'}
                          </p>
                        </div>

                        {/* Ambulance */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Ambulance</p>
                          {feedback.booking.ambulance ? (
                            <>
                              <p className="text-gray-900 font-medium">{feedback.booking.ambulance.vehicleNumber}</p>
                              <p className="text-xs text-gray-600">{feedback.booking.ambulance.type}</p>
                            </>
                          ) : (
                            <p className="text-gray-400 text-xs">Not assigned</p>
                          )}
                        </div>

                        {/* Fare */}
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Fare</p>
                          <p className="text-gray-900 font-semibold">₹{feedback.booking.totalFare || '0'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}