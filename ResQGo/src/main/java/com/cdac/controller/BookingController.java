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
        System.out.println("=== CREATE BOOKING REQUEST ===");
        System.out.println("Emergency Type: " + dto.getEmergencyType());
        System.out.println("Pickup Location: " + dto.getPickupLocation());
        System.out.println("Drop Location: " + dto.getDropLocation());
        
        // authentication.getName() returns the email as it's used as username in JWT
        String userEmail = authentication.getName();
        System.out.println("User Email: " + userEmail);
        
        BookingRespDTO resp = bookingService.createBooking(dto, userEmail);
        System.out.println("Booking created with ID: " + resp.getId());
        
        return ResponseEntity.status(HttpStatus.CREATED).body(resp);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingRespDTO> updateBooking(
            @PathVariable Long id,
            @Valid @RequestBody BookingReqDTO dto) {
        System.out.println("=== UPDATE BOOKING REQUEST ===");
        System.out.println("Booking ID: " + id);
        System.out.println("Update Data: " + dto);
        
        BookingRespDTO resp = bookingService.updateBooking(id, dto);
        return ResponseEntity.ok(resp);
    }

    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<BookingRespDTO> cancelBooking(@PathVariable Long id) {
        System.out.println("=== CANCEL BOOKING REQUEST ===");
        System.out.println("Booking ID to cancel: " + id);
        
        BookingRespDTO resp = bookingService.cancelBooking(id);
        return ResponseEntity.ok(resp);
    }

    @GetMapping
    public ResponseEntity<List<BookingRespDTO>> getBookings(
            @RequestHeader("Authorization") String authHeader,
            Authentication authentication) {
        System.out.println("=== GET BOOKINGS REQUEST ===");
        
        // Extract token and get user info
        String token = authHeader.substring(7);
        Long userId = jwtUtil.extractUserId(token);
        System.out.println("User ID: " + userId);
        
        // Check user role from authentication
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));
        boolean isDriver = authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_DRIVER"));
        
        System.out.println("Is Admin: " + isAdmin + ", Is Driver: " + isDriver);
        
        List<BookingRespDTO> list;
        if (isAdmin) {
            // Admin sees all bookings
            System.out.println("Fetching all bookings for admin");
            list = bookingService.getAllBookingsForAdmin(userId);
        } else if (isDriver) {
            // Driver sees bookings assigned to their ambulance
            System.out.println("Fetching bookings for driver");
            list = bookingService.getBookingsByDriverId(userId);
        } else {
            // Regular user sees only their bookings
            System.out.println("Fetching bookings for user");
            list = bookingService.getBookingsByUserId(userId);
        }
        
        System.out.println("Returning " + list.size() + " bookings");
        return ResponseEntity.ok(list);
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<BookingRespDTO> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, String> statusUpdate) {
        System.out.println("=== UPDATE BOOKING STATUS REQUEST ===");
        System.out.println("Booking ID: " + id);
        
        String status = statusUpdate.get("status");
        System.out.println("New Status: " + status);
        
        BookingRespDTO resp = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(resp);
    }
    
    @PostMapping("/{id}/feedback")
    public ResponseEntity<BookingRespDTO> submitFeedback(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, Object> feedbackData) {
        System.out.println("=== SUBMIT FEEDBACK REQUEST ===");
        System.out.println("Booking ID: " + id);
        
        Integer rating = (Integer) feedbackData.get("rating");
        String comments = (String) feedbackData.get("comments");
        System.out.println("Rating: " + rating + ", Comments: " + comments);
        
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
