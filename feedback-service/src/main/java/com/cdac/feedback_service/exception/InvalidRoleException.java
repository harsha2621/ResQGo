package com.cdac.feedback_service.exception;

@SuppressWarnings("serial")
public class InvalidRoleException extends RuntimeException {
	
    public InvalidRoleException(String message) {
        super(message);
    }

}
