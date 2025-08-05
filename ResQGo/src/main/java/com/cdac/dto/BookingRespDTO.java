package com.cdac.dto;

import java.time.LocalDateTime;

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

    private LocationRespDTO dropoffLocation;

    private String emergencyType;

    private LocalDateTime pickupTime;

    private UserRespDTO user;

    private AmbulanceRespDTO ambulance;

    private String status;
}