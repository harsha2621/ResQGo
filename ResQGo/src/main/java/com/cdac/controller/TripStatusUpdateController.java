package com.cdac.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.TripStatusUpdateReqDTO;
import com.cdac.dto.TripStatusUpdateRespDTO;
import com.cdac.service.TripStatusUpdateService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/trip-status")
@AllArgsConstructor
public class TripStatusUpdateController {

    private final TripStatusUpdateService tripStatusUpdateService;

    @PostMapping
    public ResponseEntity<TripStatusUpdateRespDTO> addTripStatus(@Validated @RequestBody TripStatusUpdateReqDTO dto) {
        TripStatusUpdateRespDTO response = tripStatusUpdateService.addTripStatusUpdate(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<TripStatusUpdateRespDTO>> getStatuses(@PathVariable Long bookingId) {
        return ResponseEntity.ok(tripStatusUpdateService.getStatusUpdatesByBooking(bookingId));
    }

    @PutMapping("/{tripStatusId}")
    public ResponseEntity<TripStatusUpdateRespDTO> updateTripStatus(
            @PathVariable Long tripStatusId,
            @Validated @RequestBody TripStatusUpdateReqDTO dto) {
        
        TripStatusUpdateRespDTO updatedStatus = tripStatusUpdateService.updateTripStatus(tripStatusId, dto);
        return ResponseEntity.ok(updatedStatus);
    }
}
