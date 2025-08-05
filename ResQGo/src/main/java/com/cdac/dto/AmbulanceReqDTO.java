package com.cdac.dto;

import com.cdac.entities.AmbulanceStatus;
import com.cdac.entities.AmbulanceType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AmbulanceReqDTO {

    @NotBlank(message = "Ambulance number is required")
    @Size(max = 20, message = "Ambulance number max length is 20")
    private String ambulanceNumber;

    @NotNull(message = "Ambulance type is required")
    private AmbulanceType type;  

    @NotNull(message = "Ambulance status is required")
    private AmbulanceStatus status; 

    @NotNull(message = "Current location ID is required")
    private Long locationId;

    @NotNull(message = "Driver user ID is required")
    private Long driverId;  
}