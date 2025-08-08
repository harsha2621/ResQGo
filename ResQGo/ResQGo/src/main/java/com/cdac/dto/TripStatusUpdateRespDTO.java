package com.cdac.dto;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TripStatusUpdateRespDTO {

    private Long id;
    private Long bookingId;
    private String status;
    private LocalDateTime updatedTime;
}