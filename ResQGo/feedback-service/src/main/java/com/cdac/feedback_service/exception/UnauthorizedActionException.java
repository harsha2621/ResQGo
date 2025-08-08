package com.cdac.feedback_service.exception;

@SuppressWarnings("serial")
public class UnauthorizedActionException extends RuntimeException {
    public UnauthorizedActionException(String message) {
        super(message);
    }
}
