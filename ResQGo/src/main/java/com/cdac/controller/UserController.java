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

import com.cdac.dto.UserReqDTO;
import com.cdac.dto.UserRespDTO;
import com.cdac.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @PostMapping
    @Operation(summary = "Add new user")
    public ResponseEntity<?> addUser(@RequestBody @Valid UserReqDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUser(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing user")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody @Valid UserReqDTO dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user by ID")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }
    
    @GetMapping
    public List<UserRespDTO> getAllUsers() {
        return userService.getAllUsers();
    }
}
