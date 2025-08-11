package com.cdac.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationRespDTO {

    private Long id;
    private String address;
    private Double latitude;
    private Double longitude;
}