import React, { useState, useEffect } from 'react';
import { X, Star, User, Calendar, MessageSquare } from 'lucide-react';
import axios from 'axios';

export default function FeedbackViewModal({ isOpen, onClose, bookingId, feedbackId }) {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && feedbackId) {
      fetchFeedback();
    }
  }, [isOpen, feedbackId]);

  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/bookings/feedback/${feedbackId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedback(response.data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to load feedback details');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity" onClick={onClose}></div>

        {/* Modal */}
        <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Feedback Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-5">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : feedback ? (
              <div className="space-y-4">
                {/* Booking ID */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                  <p className="text-gray-900 font-medium">#{bookingId}</p>
                </div>

                {/* Rating */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Rating</p>
                  <div className="flex items-center gap-3">
                    {renderStars(feedback.rating)}
                    <span className="text-lg font-semibold text-gray-700">{feedback.rating}/5</span>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <p className="text-sm text-gray-500 mb-2">Comments</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {feedback.comments || 'No comments provided'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No feedback found</div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}