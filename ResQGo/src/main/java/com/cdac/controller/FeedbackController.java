package com.cdac.controller;

import com.cdac.dto.FeedbackReqDTO;
import com.cdac.dto.FeedbackRespDTO;
import com.cdac.service.FeedbackService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    // ✅ 1. Add feedback
    @PostMapping
    public ResponseEntity<FeedbackRespDTO> addFeedback(@Valid @RequestBody FeedbackReqDTO dto) {
        FeedbackRespDTO created = feedbackService.addFeedback(dto);
        return ResponseEntity.ok(created);
    }

    // ✅ 2. Get feedback by booking ID
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<FeedbackRespDTO> getFeedbackByBooking(@PathVariable Long bookingId) {
        FeedbackRespDTO feedback = feedbackService.getFeedbackByBooking(bookingId);
        return ResponseEntity.ok(feedback);
    }
}
