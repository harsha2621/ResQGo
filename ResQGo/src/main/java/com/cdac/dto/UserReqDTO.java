package com.cdac.dto;

import com.cdac.entities.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserReqDTO {

    @NotBlank(message = "Full name is required")
    @Size(max = 50, message = "Name must be at most 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Size(max = 50)
    private String email;


    @NotNull(message = "oraganizationId ID is required")
    private Long oraganizationId;
    
    @NotBlank(message = "Password is required")
    @Size(min = 10, max = 60, message = "Password must be 6-20 characters")
    private String password;

    @Size(min = 12, max = 12, message = "Aadhaar number must be exactly 12 digits")
    @Pattern(regexp = "\\d{12}", message = "Aadhaar number must be numeric")
    private String aadhaarNumber;

    

    @Size(max = 10, message = "Contact number max length is 10")
    @Pattern(regexp = "\\d{10}", message = "Contact number must be 10 digits")
    private String contactNumber;

    @NotNull(message = "User Role is required")
    private UserRole role;
}