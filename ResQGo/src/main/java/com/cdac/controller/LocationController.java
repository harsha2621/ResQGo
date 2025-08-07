package com.cdac.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.LocationReqDTO;
import com.cdac.dto.LocationRespDTO;
import com.cdac.service.LocationService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/locations")
@AllArgsConstructor
@Validated
public class LocationController {

    private final LocationService locationService;

    @PostMapping
    @Operation(summary = "Add new location")
    public ResponseEntity<?> addLocation(@RequestBody @Valid LocationReqDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(locationService.addLocation(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing location")
    public ResponseEntity<?> updateLocation(@PathVariable Long id, @RequestBody @Valid LocationReqDTO dto) {
        return ResponseEntity.ok(locationService.updateLocation(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete location by ID")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.deleteLocation(id));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get location by ID")
    public ResponseEntity<?> getLocation(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.getLocationById(id));
    }

    @GetMapping
    @Operation(summary = "Get all locations")
    public List<LocationRespDTO> getAllLocations() {
        return locationService.getAllLocations();
    }
}
