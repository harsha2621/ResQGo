package com.cdac.exception;


import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ApiException {
    private String message;
    private int status;
    private LocalDateTime timestamp;
    private String path;

   
}
