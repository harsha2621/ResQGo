package com.cdac.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.BillReqDTO;
import com.cdac.dto.BillRespDTO;
import com.cdac.service.BillService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/bills")
@AllArgsConstructor
@Validated
public class BillController {

    private final BillService billService;

    @PostMapping
    @Operation(summary = "Add new bill")
    public ResponseEntity<?> addBill(@RequestBody @Valid BillReqDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(billService.addBill(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing bill")
    public ResponseEntity<?> updateBill(@PathVariable Long id, @RequestBody @Valid BillReqDTO dto) {
        return ResponseEntity.ok(billService.updateBill(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete bill by ID")
    public ResponseEntity<?> deleteBill(@PathVariable Long id) {
        return ResponseEntity.ok(billService.deleteBill(id));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get bill by ID")
    public ResponseEntity<?> getBill(@PathVariable Long id) {
        return ResponseEntity.ok(billService.getBillById(id));
    }

    @GetMapping
    @Operation(summary = "Get all bills")
    public List<BillRespDTO> getAllBills() {
        return billService.getAllBills();
    }
}
