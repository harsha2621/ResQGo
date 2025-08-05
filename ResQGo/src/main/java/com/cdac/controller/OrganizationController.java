package com.cdac.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cdac.dto.OrganizationReqDTO;
import com.cdac.service.OrganizationService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/organization")
@AllArgsConstructor
@Validated
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping
    @Operation(description = "Add a new organization")
    public ResponseEntity<?> addOrganization(@RequestBody @Valid OrganizationReqDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(organizationService.addOrganization(dto));
    }
    
    @PutMapping("/{orgId}/assign-admin/{userId}")
    @Operation(description = "Assign an admin user to an organization")
    public ResponseEntity<?> assignAdminToOrganization(@PathVariable Long orgId, @PathVariable Long userId) {
        organizationService.assignAdmin(orgId, userId);
        return ResponseEntity.ok("Admin assigned successfully to organization with id " + orgId);
    }


    @PutMapping("/{id}")
    @Operation(description = "Update an existing organization by ID")
    public ResponseEntity<?> updateOrganization(@PathVariable Long id,
                                                @RequestBody @Valid OrganizationReqDTO dto) {
        return ResponseEntity.ok(organizationService.updateOrganization(id, dto));
    }

    @DeleteMapping("/{id}")
    
    @Operation(description = "Delete an organization by ID")
    public ResponseEntity<?> deleteOrganization(@PathVariable Long id) {
        return ResponseEntity.ok(organizationService.deleteOrganization(id));
    }

    @GetMapping("/{id}")
    @Operation(description = "Get organization details by ID")
    public ResponseEntity<?> getOrganization(@PathVariable Long id) {
        return ResponseEntity.ok(organizationService.getOrganization(id));
    }
}
