package com.cdac.dto;

import com.cdac.entities.BookingStatus;
import com.cdac.entities.EmergencyType;

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
    private LocationReqDTO pickupLocation;

    @NotNull(message = "Drop location is required")
    private LocationReqDTO dropLocation;

    @NotNull(message = "Emergency type is required")
    private EmergencyType emergencyType;
    
    // Optional fields for update operations
    private Long userId;
    
    private Long ambulanceId;
    
    private Long pickupLocationId;
    
    private Long dropLocationId;
    
    private BookingStatus bookingStatus;

}