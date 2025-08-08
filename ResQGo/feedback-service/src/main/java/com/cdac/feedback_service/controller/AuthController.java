package com.cdac.feedback_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.cdac.feedback_service.dto.AuthRequestDto;
import com.cdac.feedback_service.dto.AuthResponseDto;
import com.cdac.feedback_service.dto.LoginRequest;
import com.cdac.feedback_service.security.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RestTemplate restTemplate;


    @Value("${user.service.url}")
    private  String USER_SERVICE_URL;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest request) throws JsonProcessingException {
        String email = request.getUsername();  
        String password = request.getPassword();

        String url = USER_SERVICE_URL + "/" + email;

        ResponseEntity<AuthRequestDto> response = restTemplate.getForEntity(url, AuthRequestDto.class);
        AuthRequestDto user = response.getBody();

        System.out.println("User fetched from backend: " + new ObjectMapper().writeValueAsString(user));

        if (user != null && password.equals(user.getPassword())) {
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok(new AuthResponseDto(token));	
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }


}
