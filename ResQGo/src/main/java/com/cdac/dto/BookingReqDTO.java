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

    @NotNull(message = "Pickup location ID is required")
    private Long pickupLocationId;

    @NotNull(message = "Dropoff location ID is required")
    private Long dropoffLocationId;

    @NotNull(message = "Emergency type is required")
    private EmergencyType emergencyType; 

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Ambulance ID is required")
    private Long ambulanceId;  

    @NotNull(message = "Booking status is required")
    private BookingStatus bookingStatus;

	

}