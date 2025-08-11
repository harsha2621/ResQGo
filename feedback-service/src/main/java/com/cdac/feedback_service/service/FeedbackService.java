package com.cdac.feedback_service.service;

import com.cdac.feedback_service.dto.FeedbackRequestDTO;
import com.cdac.feedback_service.dto.FeedbackResponseDTO;


public interface FeedbackService {
	FeedbackResponseDTO addFeedback(Long bookingId, FeedbackRequestDTO feedback, String jwtToken);
    FeedbackResponseDTO getFeedbackById(Long id);
    FeedbackResponseDTO createFeedback(FeedbackRequestDTO feedbackDto);
}
