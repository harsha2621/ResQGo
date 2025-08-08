package com.cdac.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.AmbulanceReqDTO;
import com.cdac.dto.AmbulanceRespDTO;
import com.cdac.dto.ApiResponse;
import com.cdac.service.AmbulanceService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ambulances")
@RequiredArgsConstructor
@Validated
public class AmbulanceController {

    private final AmbulanceService ambulanceService;

    @PostMapping
    public ResponseEntity<AmbulanceRespDTO> addAmbulance(@RequestBody @Valid AmbulanceReqDTO dto) {
        return ResponseEntity.ok(ambulanceService.addAmbulance(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AmbulanceRespDTO> updateAmbulance(@PathVariable Long id,
                                                            @RequestBody @Valid AmbulanceReqDTO dto) {
        return ResponseEntity.ok(ambulanceService.updateAmbulance(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteAmbulance(@PathVariable Long id) {
        return ResponseEntity.ok(ambulanceService.deleteAmbulance(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AmbulanceRespDTO> getAmbulance(@PathVariable Long id) {
        return ResponseEntity.ok(ambulanceService.getAmbulance(id));
    }

    @GetMapping
    public ResponseEntity<List<AmbulanceRespDTO>> getAllAmbulances() {
        return ResponseEntity.ok(ambulanceService.getAllAmbulances());
    }
}
