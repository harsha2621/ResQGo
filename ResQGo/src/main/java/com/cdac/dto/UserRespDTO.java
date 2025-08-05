package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRespDTO {

    private Long id;

    private String name;

    private String email;

    private String aadhaarNumber;

    private String licenseNumber;

    private String contactNumber;

    private String role;
}