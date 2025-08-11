package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRespDTO {

    private Long id;

    private LocationRespDTO pickupLocation;

    private LocationRespDTO dropLocation;

    private String emergencyType;



    private UserRespDTO user;

    private AmbulanceRespDTO ambulance;

    private String bookingStatus;
    
    private java.time.LocalDateTime createdAt;
    
    private java.time.LocalDateTime updatedAt;
    
    private Long feedbackId;
}