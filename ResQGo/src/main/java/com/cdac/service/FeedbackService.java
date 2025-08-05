package com.cdac.service;

import com.cdac.dto.FeedbackReqDTO;
import com.cdac.dto.FeedbackRespDTO;


public interface FeedbackService {
    FeedbackRespDTO addFeedback(FeedbackReqDTO dto);
    
    FeedbackRespDTO getFeedbackByBooking(Long bookingId);
    
}