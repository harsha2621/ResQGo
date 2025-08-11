package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AmbulanceRespDTO {

    private Long id;

    private String ambulanceNumber;

    private String type; 

    private String status;  

    private LocationRespDTO currentLocation;

    private UserRespDTO driver;
}