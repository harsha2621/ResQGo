package com.cdac.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.BookingReqDTO;
import com.cdac.dto.BookingRespDTO;
import com.cdac.service.BookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;
    private final com.cdac.security.JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<BookingRespDTO> createBooking(@Valid @RequestBody BookingReqDTO dto,
                                                       Authentication authentication) 
    {
        // authentication.getName() returns the email as it's used as username in JWT
        String userEmail = authentication.getName();
        BookingRespDTO resp = bookingService.createBooking(dto, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingRespDTO> updateBooking(
            @PathVariable Long id,
            @Valid @RequestBody BookingReqDTO dto) {
        BookingRespDTO resp = bookingService.updateBooking(id, dto);
        return ResponseEntity.ok(resp);
    }

    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<BookingRespDTO> cancelBooking(@PathVariable Long id) {
        BookingRespDTO resp = bookingService.cancelBooking(id);
        return ResponseEntity.ok(resp);
    }

    @GetMapping
    public ResponseEntity<List<BookingRespDTO>> getBookings(
            @RequestHeader("Authorization") String authHeader,
            Authentication authentication) {
        
        // Extract token and get user info
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        
        // Check user role from authentication
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        boolean isDriver = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_DRIVER"));
        
        List<BookingRespDTO> list;
        if (isAdmin) {
            // Admin sees all bookings
            list = bookingService.getAllBookingsForAdmin(userId);
        } else if (isDriver) {
            // Driver sees bookings assigned to their ambulance
            list = bookingService.getBookingsByDriverId(userId);
        } else {
            // Regular user sees only their bookings
            list = bookingService.getBookingsByUserId(userId);
        }
        
        return ResponseEntity.ok(list);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<BookingRespDTO> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        BookingRespDTO resp = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(resp);
    }
    
    @PostMapping("/{id}/feedback")
    public ResponseEntity<BookingRespDTO> submitFeedback(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, Object> feedbackData) {
        
        Integer rating = (Integer) feedbackData.get("rating");
        String comments = (String) feedbackData.get("comments");
        
        BookingRespDTO resp = bookingService.submitFeedback(id, rating, comments);
        return ResponseEntity.ok(resp);
    }
    
    @GetMapping("/feedback/{feedbackId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<com.cdac.dto.FeedbackRespDTO> getFeedbackById(@PathVariable Long feedbackId) {
        com.cdac.dto.FeedbackRespDTO feedback = bookingService.getFeedbackById(feedbackId);
        return ResponseEntity.ok(feedback);
    }

}
