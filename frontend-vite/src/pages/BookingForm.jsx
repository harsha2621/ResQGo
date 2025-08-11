import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Phone, Calendar, AlertCircle } from 'lucide-react';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

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

export default function BookingForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    emergencyType: '',
    pickupAddress: '',
    pickupLatitude: null,
    pickupLongitude: null,
    dropAddress: '',
    dropLatitude: null,
    dropLongitude: null,
  });


  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handlePickupPlaceSelected = (locationData) => {
    setBookingData(prevData => {
      const updatedData = {
        ...prevData,
        pickupAddress: locationData.address,
        pickupLatitude: locationData.latitude,
        pickupLongitude: locationData.longitude
      };
      return updatedData;
    });
  };

  const handleDropPlaceSelected = (locationData) => {
    setBookingData(prevData => {
      const updatedData = {
        ...prevData,
        dropAddress: locationData.address,
        dropLatitude: locationData.latitude,
        dropLongitude: locationData.longitude
      };
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    // Validate required fields
    if (!bookingData.emergencyType || !bookingData.pickupAddress || 
        !bookingData.pickupLatitude || !bookingData.pickupLongitude ||
        !bookingData.dropAddress || !bookingData.dropLatitude || !bookingData.dropLongitude) {
      alert('Please fill all required fields including drop location');
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        emergencyType: bookingData.emergencyType.toUpperCase(),
        pickupLocation: {
          address: bookingData.pickupAddress,
          latitude: parseFloat(bookingData.pickupLatitude),
          longitude: parseFloat(bookingData.pickupLongitude)
        },
        dropLocation: {
          address: bookingData.dropAddress,
          latitude: parseFloat(bookingData.dropLatitude),
          longitude: parseFloat(bookingData.dropLongitude)
        }
      };


      const response = await api.post('/bookings', payload);
      
      if (response.data) {
        alert('Booking created successfully! An ambulance will be assigned soon.');
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create booking';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <AlertCircle className="text-red-600 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Emergency Booking</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Emergency Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Type *
              </label>
              <select
                name="emergencyType"
                value={bookingData.emergencyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Emergency Type</option>
                <option value="ACCIDENT">Accident</option>
                <option value="CARDIAC">Cardiac Emergency</option>
              </select>
            </div>

            {/* Pickup Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <MapPin className="text-red-600 mr-2" size={20} />
                Pickup Location *
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <PlacesAutocomplete
                  placeholder="Enter pickup address"
                  value={bookingData.pickupAddress}
                  onChange={(e) => {
                    setBookingData(prev => ({ ...prev, pickupAddress: e.target.value }));
                  }}
                  onPlaceSelected={handlePickupPlaceSelected}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required={true}
                />
                {bookingData.pickupLatitude && bookingData.pickupLongitude && (
                  <p className="text-sm text-gray-600 mt-1">
                    Location: {bookingData.pickupLatitude.toFixed(6)}, {bookingData.pickupLongitude.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            {/* Drop Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                <MapPin className="text-green-600 mr-2" size={20} />
                Drop Location *
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <PlacesAutocomplete
                  placeholder="Enter drop address"
                  value={bookingData.dropAddress}
                  onChange={(e) => {
                    setBookingData(prev => ({ ...prev, dropAddress: e.target.value }));
                  }}
                  onPlaceSelected={handleDropPlaceSelected}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required={true}
                />
                {bookingData.dropLatitude && bookingData.dropLongitude && (
                  <p className="text-sm text-gray-600 mt-1">
                    Location: {bookingData.dropLatitude.toFixed(6)}, {bookingData.dropLongitude.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-lg text-white transition ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {loading ? 'Creating Booking...' : 'Request Ambulance'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}