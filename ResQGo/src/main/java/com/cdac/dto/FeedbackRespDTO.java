package com.cdac.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackRespDTO {

    private Long id;
    private Long userId;
    private Long bookingId; 
    private String comments;
    private Integer rating;
}