import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DriverRegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    aadhaarNo: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password length
    if (formData.password.length < 10) {
      setError('Password must be at least 10 characters');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate Aadhaar number (12 digits)
    if (!/^\d{12}$/.test(formData.aadhaarNo)) {
      setError('Aadhaar number must be 12 digits');
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(formData.contactNo)) {
      setError('Contact number must be 10 digits');
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        name: formData.fullName,  // Backend expects 'name' not 'fullName'
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNo,  // Backend expects 'contactNumber' not 'contactNo'
        aadhaarNumber: formData.aadhaarNo,  // Backend expects 'aadhaarNumber' not 'aadhaarNo'
        oraganizationId: 1,  // Hardcoded to 1 as we're using single org. Note: backend has typo 'oraganizationId'
        role: 'DRIVER'
      };

      console.log('Sending registration payload:', payload);
      const response = await axios.post('http://localhost:8080/api/user', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.data) {
        alert('Registration successful! Please login with your credentials.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      
      // Show more detailed error
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Registration failed. Please check console for details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Driver Registration</h2>
          <p className="text-gray-600 mt-2">Join ResQGo as an ambulance driver</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="driver@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="Min 10 characters"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              maxLength="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="10 digit mobile number"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              required
              maxLength="12"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              placeholder="12 digit Aadhaar number"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
            }`}
          >
            {loading ? 'Registering...' : 'Register as Driver'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              Login here
            </Link>
          </p>
          <p className="text-gray-600 mt-2">
            Not a driver?{' '}
            <Link to="/register" className="text-red-600 hover:text-red-700 font-medium">
              User Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}