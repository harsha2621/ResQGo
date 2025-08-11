package com.cdac.dto;

import com.cdac.entities.EmergencyType;
import com.cdac.entities.Location;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingReqDTO {

    @NotNull(message = "Pickup location is required")
    private Location pickupLocation;

    @NotNull(message = "Drop location is required")
    private Location dropLocation;
    
    @NotNull(message = "Emergency type is required")
    private EmergencyType emergencyType;

}