import React, { useState, useEffect } from 'react';
import Sidebar from '../components/admin/Sidebar';
import axios from 'axios';
import { Calendar, MapPin, User, Phone, Clock, DollarSign, Truck, AlertCircle, Car, Hash, MessageSquare } from 'lucide-react';
import FeedbackViewModal from '../components/admin/FeedbackViewModal';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [feedbackModal, setFeedbackModal] = useState({ isOpen: false, bookingId: null, feedbackId: null });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings: ' + (err.response?.data?.message || err.message));
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED':
        return 'bg-blue-100 text-blue-800';
      case 'ENROUTE':
        return 'bg-purple-100 text-purple-800';
      case 'REACHED_PICKUP':
        return 'bg-indigo-100 text-indigo-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatus = (booking) => booking.bookingStatus || booking.status || 'UNKNOWN';
  
  const filteredBookings = filterStatus === 'ALL' 
    ? bookings 
    : bookings.filter(booking => getBookingStatus(booking) === filterStatus);
    
  const getStatusCount = (status) => {
    if (status === 'ALL') return bookings.length;
    return bookings.filter(booking => getBookingStatus(booking) === status).length;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8 overflow-y-auto ml-64 transition-all duration-300">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
          <p className="text-gray-600 mt-1">View and manage all ambulance bookings</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['ALL', 'PENDING', 'ASSIGNED', 'ENROUTE', 'REACHED_PICKUP', 'COMPLETED', 'CANCELLED'].map((status) => {
            const count = getStatusCount(status);
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  filterStatus === status 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{status.replace('_', ' ')}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filterStatus === status 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bookings Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="p-5">
                  {/* Top Section - ID, Status, Time */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold">{booking.id}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(getBookingStatus(booking))}`}>
                        {getBookingStatus(booking)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{new Date(booking.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Customer Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</h4>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">{booking.user?.name || 'N/A'}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {booking.user?.phone || 'N/A'}
                        </p>
                        {booking.user?.email && (
                          <p className="text-xs text-gray-500">{booking.user.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Route Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Route</h4>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Pickup</p>
                          <p className="text-sm text-gray-900 line-clamp-1" title={booking.pickupLocation?.address}>
                            {booking.pickupLocation?.address || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Drop</p>
                          <p className="text-sm text-gray-900 line-clamp-1" title={booking.dropLocation?.address}>
                            {booking.dropLocation?.address || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Ambulance Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Ambulance</h4>
                      </div>
                      {booking.ambulance ? (
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{booking.ambulance.vehicleNumber}</p>
                            <p className="text-xs text-gray-600">
                              {booking.ambulance.type} {booking.ambulance.model && `• ${booking.ambulance.model}`}
                            </p>
                          </div>
                          {booking.ambulance.driver && (
                            <div className="pt-1">
                              <p className="text-xs text-gray-500">Driver</p>
                              <p className="text-sm text-gray-900">{booking.ambulance.driver.name}</p>
                              {booking.ambulance.driver.phone && (
                                <p className="text-xs text-gray-600">{booking.ambulance.driver.phone}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">Not assigned</p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Section - Emergency Type and Feedback */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {booking.emergencyType && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Emergency:</span>
                          <span className="text-sm font-medium text-red-600">{booking.emergencyType}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      {booking.feedbackId ? (
                        <button
                          onClick={() => setFeedbackModal({ isOpen: true, bookingId: booking.id, feedbackId: booking.feedbackId })}
                          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <MessageSquare className="h-4 w-4" />
                          View Feedback
                        </button>
                      ) : (
                        <span className="text-sm text-gray-400">No feedback</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Feedback Modal */}
      <FeedbackViewModal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ isOpen: false, bookingId: null, feedbackId: null })}
        bookingId={feedbackModal.bookingId}
        feedbackId={feedbackModal.feedbackId}
      />
    </div>
  );
}