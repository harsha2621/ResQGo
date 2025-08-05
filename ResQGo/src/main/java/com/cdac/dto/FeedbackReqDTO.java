package com.cdac.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackReqDTO {

    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Booking ID is required")
    private Long bookingId;
    

    @NotBlank(message = "Comments are required")
    @Size(max = 1000, message = "Comments can't exceed 1000 characters")
    private String comments;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;
}