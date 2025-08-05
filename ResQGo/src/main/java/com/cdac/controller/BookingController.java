package com.cdac.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.BookingReqDTO;
import com.cdac.dto.BookingRespDTO;
import com.cdac.service.BookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingRespDTO> createBooking(@Valid @RequestBody BookingReqDTO dto) 
    {
        BookingRespDTO resp = bookingService.createBooking(dto);
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
    public ResponseEntity<List<BookingRespDTO>> getAllBookingsForAdmin(
            @RequestParam Long adminUserId) {
        List<BookingRespDTO> list = bookingService.getAllBookingsForAdmin(adminUserId);
        return ResponseEntity.ok(list);
    }

}
