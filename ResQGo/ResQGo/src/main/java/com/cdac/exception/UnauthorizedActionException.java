package com.cdac.exception;

@SuppressWarnings("serial")
public class UnauthorizedActionException extends RuntimeException {
    public UnauthorizedActionException(String message) {
        super(message);
    }
}
