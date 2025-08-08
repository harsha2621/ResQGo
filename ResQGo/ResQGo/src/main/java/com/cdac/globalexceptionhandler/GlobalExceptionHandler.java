package com.cdac.globalexceptionhandler;

import java.nio.file.AccessDeniedException;
import com.cdac.exception.*;
import java.time.LocalDateTime;

import org.apache.tomcat.websocket.AuthenticationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cdac.exception.ApiException;
import com.cdac.exception.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

//marks a class as a global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private ResponseEntity<ApiException> buildResponse(HttpStatus status, String message, HttpServletRequest request) 
    {
        ApiException error = new ApiException(message,status.value(),LocalDateTime.now(),request.getRequestURI());
        return new ResponseEntity<>(error, status);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiException> handleResourceNotFound(ResourceNotFoundException ex, HttpServletRequest request) 
    {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiException> handleEntityNotFound(EntityNotFoundException ex, HttpServletRequest request)
    {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }
    
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ApiException> handleInvalidInput(InvalidInputException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    @ExceptionHandler(BookingConflictException.class)
    public ResponseEntity<ApiException> handleBookingConflictException(BookingConflictException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.CONFLICT, "Booking conflict occurred. Please choose a different time or ambulance.", request);
    }

    @ExceptionHandler(UnauthorizedActionException.class)
    public ResponseEntity<ApiException> handleUnauthorizedActionException(UnauthorizedActionException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "You are not allowed to perform this action.", request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiException> handleDataIntegrity(DataIntegrityViolationException ex, HttpServletRequest request) 
    {
        return buildResponse(HttpStatus.CONFLICT, "Duplicate entry or constraint violation", request);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiException> handleIllegalArgument(IllegalArgumentException ex, HttpServletRequest request) 
    {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiException> handleAccessDenied(AccessDeniedException ex, HttpServletRequest request) 
    {
        return buildResponse(HttpStatus.FORBIDDEN, "Access Denied", request);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiException> handleAuthentication(AuthenticationException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, "Authentication Failed", request);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiException> handleHttpMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage(), request);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiException> handleRuntime(RuntimeException ex, HttpServletRequest request) {
        logger.error("Unhandled RuntimeException", ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error occurred", request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiException> handleGenericException(Exception ex, HttpServletRequest request) {
        logger.error("Unhandled Exception", ex);
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An internal error occurred", request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiException> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) 
    {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream().map(err -> err.getField() + ": " + err.getDefaultMessage()).findFirst().orElse("Validation failed");
        return buildResponse(HttpStatus.BAD_REQUEST, errorMessage, request);
    }

  
}
