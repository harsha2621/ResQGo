import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Phone, Calendar, Clock, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// Configure axios defaults
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [ambulance, setAmbulance] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: '',
    longitude: ''
  });
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchDriverData();
  }, [navigate]);

  const fetchDriverData = async () => {
    try {
      // Fetch driver's ambulance
      const ambulanceRes = await api.get('/ambulances');
      const driverAmbulance = ambulanceRes.data.find(amb => 
        amb.driver?.id === JSON.parse(localStorage.getItem('user')).userId
      );
      setAmbulance(driverAmbulance);

      // Fetch bookings for this ambulance
      if (driverAmbulance) {
        const bookingsRes = await api.get('/bookings');
        const driverBookings = bookingsRes.data.filter(booking => 
          booking.ambulance?.id === driverAmbulance.id
        );
        setBookings(driverBookings);
        
        // Set current location from ambulance
        if (driverAmbulance.currentLocation) {
          setCurrentLocation({
            latitude: driverAmbulance.currentLocation.latitude,
            longitude: driverAmbulance.currentLocation.longitude
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch driver data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
        },
        (error) => {
          alert('Unable to get your location. Please enter manually.');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const updateLocation = async () => {
    if (!ambulance || !currentLocation.latitude || !currentLocation.longitude) {
      alert('Please ensure location coordinates are filled');
      return;
    }

    setUpdatingLocation(true);
    try {
      await api.put(`/ambulances/${ambulance.id}`, {
        ambulanceNumber: ambulance.ambulanceNumber,
        type: ambulance.type,
        status: ambulance.status,
        latitude: parseFloat(currentLocation.latitude),
        longitude: parseFloat(currentLocation.longitude),
        driverId: user.userId
      });
      
      alert('Location updated successfully!');
      fetchDriverData(); // Refresh data
    } catch (err) {
      console.error('Failed to update location:', err);
      alert('Failed to update location. Please try again.');
    } finally {
      setUpdatingLocation(false);
    }
  };

  const handleActivateAmbulance = async () => {
    // If activating, ensure location is set
    if (ambulance.status !== 'AVAILABLE' && (!currentLocation.latitude || !currentLocation.longitude)) {
      // Try to get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            setCurrentLocation({ latitude: lat, longitude: lng });
            
            // Activate with location
            await activateAmbulance(lat, lng);
          },
          (error) => {
            alert('Please set your location before activating the ambulance');
            console.error('Geolocation error:', error);
          }
        );
      } else {
        alert('Please set your location before activating the ambulance');
      }
    } else {
      // Deactivating
      await activateAmbulance(currentLocation.latitude, currentLocation.longitude);
    }
  };

  const activateAmbulance = async (lat, lng) => {
    const newStatus = ambulance.status === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE';
    
    try {
      await api.put(`/ambulances/${ambulance.id}`, {
        ambulanceNumber: ambulance.ambulanceNumber,
        type: ambulance.type,
        status: newStatus,
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        driverId: user.userId
      });
      
      alert(`Ambulance ${newStatus === 'AVAILABLE' ? 'activated' : 'deactivated'} successfully!`);
      fetchDriverData(); // Refresh data
    } catch (err) {
      console.error('Failed to update ambulance status:', err);
      alert('Failed to update ambulance status. Please try again.');
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Booking status updated to ${newStatus}`);
      fetchDriverData(); // Refresh bookings
    } catch (err) {
      console.error('Failed to update booking status:', err);
      alert('Failed to update booking status');
    }
  };

  const openGoogleMapsNavigation = (booking) => {
    const origin = `${booking.pickupLocation.latitude},${booking.pickupLocation.longitude}`;
    const destination = `${booking.dropLocation.latitude},${booking.dropLocation.longitude}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    window.open(googleMapsUrl, '_blank');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED': return 'bg-blue-100 text-blue-800';
      case 'ENROUTE': return 'bg-purple-100 text-purple-800';
      case 'REACHED_PICKUP': return 'bg-indigo-100 text-indigo-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-white">
              <h1 className="text-2xl font-bold">Driver Dashboard</h1>
              <p className="text-red-100">Welcome, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ambulance & Location Info */}
          <div className="lg:col-span-1">
            {/* Ambulance Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">My Ambulance</h2>
              {ambulance ? (
                <div className="space-y-2">
                  <p><strong>Number:</strong> {ambulance.ambulanceNumber}</p>
                  <p><strong>Type:</strong> {ambulance.type}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 rounded text-sm ${
                      ambulance.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 
                      ambulance.status === 'BUSY' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ambulance.status}
                    </span>
                  </p>
                  
                  {/* Activate/Deactivate Button */}
                  {ambulance.status !== 'BUSY' && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleActivateAmbulance()}
                        className={`w-full py-2 rounded-lg text-white transition ${
                          ambulance.status === 'AVAILABLE' 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {ambulance.status === 'AVAILABLE' ? 'Deactivate Ambulance' : 'Activate Ambulance'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No ambulance assigned</p>
              )}
            </div>

            {/* Location Update - Only show when ambulance is activated */}
            {ambulance && ambulance.status === 'AVAILABLE' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2 text-red-600" size={24} />
                  Update Location
                </h2>
                
                <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={currentLocation.latitude}
                    onChange={(e) => setCurrentLocation({...currentLocation, latitude: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="18.9688"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    value={currentLocation.longitude}
                    onChange={(e) => setCurrentLocation({...currentLocation, longitude: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="72.8195"
                  />
                </div>

                <button
                  onClick={getCurrentLocation}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                >
                  Get Current Location
                </button>

                <button
                  onClick={updateLocation}
                  disabled={updatingLocation}
                  className={`w-full py-2 rounded-lg text-white transition ${
                    updatingLocation 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {updatingLocation ? 'Updating...' : 'Update Location'}
                </button>
              </div>
            </div>
            )}
          </div>

          {/* Bookings List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
              
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Booking #{booking.id}</p>
                          <span className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(booking.bookingStatus)}`}>
                            {booking.bookingStatus}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <Calendar className="inline mr-1" size={16} />
                          {booking.bookingStatus === 'COMPLETED' ? (
                            booking.updatedAt ? new Date(booking.updatedAt).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            }) : 'Recent'
                          ) : (
                            booking.createdAt ? getTimeAgo(booking.createdAt) : 'Recent'
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <p><strong>Booked by:</strong> {booking.user?.name || 'N/A'}</p>
                          <p><strong>Contact:</strong> 
                            <a href={`tel:${booking.user?.contactNumber}`} className="ml-1 text-blue-600 hover:underline">
                              <Phone className="inline mr-1" size={14} />
                              {booking.user?.contactNumber || 'No contact'}
                            </a>
                          </p>
                        </div>
                        <div>
                          <p><strong>Emergency:</strong> {booking.emergencyType}</p>
                          <p><strong>From:</strong> {booking.pickupLocation?.address}</p>
                          <p><strong>To:</strong> {booking.dropLocation?.address}</p>
                        </div>
                      </div>

                      {booking.bookingStatus === 'ASSIGNED' && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'ENROUTE')}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition"
                          >
                            Start Trip
                          </button>
                        </div>
                      )}
                      
                      {booking.bookingStatus === 'ENROUTE' && (
                        <div className="mt-3 space-y-2">
                          <button
                            onClick={() => openGoogleMapsNavigation(booking)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition flex items-center justify-center"
                          >
                            <MapPin className="mr-2" size={16} />
                            Navigate to Pickup Location
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'REACHED_PICKUP')}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded text-sm transition"
                          >
                            Reached Pickup Location
                          </button>
                        </div>
                      )}
                      
                      {booking.bookingStatus === 'REACHED_PICKUP' && (
                        <div className="mt-3 space-y-2">
                          <button
                            onClick={() => openGoogleMapsNavigation(booking)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition flex items-center justify-center"
                          >
                            <MapPin className="mr-2" size={16} />
                            Navigate to Drop Location
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'COMPLETED')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition"
                          >
                            Complete Trip
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No bookings assigned yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}