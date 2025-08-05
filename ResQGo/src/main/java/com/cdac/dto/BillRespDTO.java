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
public class BillRespDTO {

    private Long id;
    private Long bookingId;
  
    private LocalDateTime paymentDate;
    
}