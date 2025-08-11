import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

export default function FeedbackModal({ booking, isOpen, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      // Call main service feedback endpoint
      await axios.post(
        `http://localhost:8080/bookings/${booking.id}/feedback`,
        {
          rating: rating,
          comments: comments || '' // Send empty string if no comments
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      alert('Thank you for your feedback!');
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      if (error.response?.data?.message?.includes('already been submitted')) {
        alert('You have already submitted feedback for this booking');
      } else if (error.response?.data?.message?.includes('completed bookings')) {
        alert('Feedback can only be submitted for completed bookings');
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(0);
    setComments('');
    setHoveredRating(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Share Your Experience</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your experience?
              </label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className={`text-4xl transition-all transform hover:scale-110 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                {rating === 1 && '😞 Poor'}
                {rating === 2 && '😐 Fair'}
                {rating === 3 && '🙂 Good'}
                {rating === 4 && '😊 Very Good'}
                {rating === 5 && '🤩 Excellent'}
              </p>
            </div>

            {/* Comments */}
            <div>
              <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments (Optional)
              </label>
              <textarea
                id="comments"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value.slice(0, 1000))}
                placeholder="Tell us about your experience..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {comments.length}/1000 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting || rating === 0}
                className={`flex-1 py-2.5 rounded-lg text-white font-medium transition ${
                  submitting || rating === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={submitting}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}