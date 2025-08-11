package com.cdac.feedback_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.feedback_service.dto.FeedbackRequestDTO;
import com.cdac.feedback_service.dto.FeedbackResponseDTO;
import com.cdac.feedback_service.service.FeedbackService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestHeader;
import jakarta.validation.Valid;

@RestController
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    

    @PostMapping("/feedbacks/{bookingId}")
    public ResponseEntity<FeedbackResponseDTO> addFeedback(
        @PathVariable Long bookingId,
        @RequestBody FeedbackRequestDTO feedbackDto,
        @RequestHeader("Authorization") String authHeader
    ) {
        // Remove "Bearer " prefix from token
        String jwtToken = authHeader.substring(7);
        FeedbackResponseDTO response = feedbackService.addFeedback(bookingId, feedbackDto, jwtToken);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/feedback/{id}")
    public ResponseEntity<FeedbackResponseDTO> getFeedbackById(@PathVariable Long id) {
        FeedbackResponseDTO feedback = feedbackService.getFeedbackById(id);
        return ResponseEntity.ok(feedback);
    }
    
    @PostMapping("/feedback")
    public ResponseEntity<FeedbackResponseDTO> createFeedback(
        @Valid @RequestBody FeedbackRequestDTO feedbackRequestDTO
    ) {
        FeedbackResponseDTO response = feedbackService.createFeedback(feedbackRequestDTO);
        return ResponseEntity.ok(response);
    }
}
