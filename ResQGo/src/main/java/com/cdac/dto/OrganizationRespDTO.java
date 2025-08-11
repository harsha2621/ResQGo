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
public class OrganizationRespDTO {

    private Long id;

    private String orgName;

    private String address;

    private String contactNo;

    private LocalDateTime registeredAt;

    private UserRespDTO admin;
}