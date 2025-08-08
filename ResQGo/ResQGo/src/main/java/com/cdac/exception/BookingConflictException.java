package com.cdac.exception;

@SuppressWarnings("serial")

public class BookingConflictException extends RuntimeException {
    public BookingConflictException(String message) {
        super(message);
    }
}
