package com.cdac.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationReqDTO {

    @NotBlank(message = "Organization name is required")
    @Size(max = 50, message = "Organization name max length is 50")
    private String orgName;

    @NotBlank(message = "Address is required")
    @Size(max = 100, message = "Address max length is 100")
    private String address;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "\\d{10}", message = "Contact number must be 10 digits")
    private String contactNo;

    @NotNull(message = "Registered date/time is required")
    @PastOrPresent(message = "Registered time cannot be in the future")
    private LocalDateTime registeredAt;

}