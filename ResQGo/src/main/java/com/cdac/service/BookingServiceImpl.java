package com.cdac.service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.cdac.dao.AmbulanceDao;
import com.cdac.dao.BookingDao;
import com.cdac.dao.LocationDao;
import com.cdac.dao.UserDao;
import com.cdac.dto.BookingReqDTO;
import com.cdac.dto.BookingRespDTO;
import com.cdac.dto.FeedbackRespDTO;
import com.cdac.entities.Ambulance;
import com.cdac.entities.AmbulanceStatus;
import com.cdac.entities.Booking;
import com.cdac.entities.BookingStatus;
import com.cdac.entities.Location;
import com.cdac.entities.User;
import com.cdac.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingDao bookingDao;
    private final UserDao userDao;
    private final AmbulanceDao ambulanceDao;
    private final LocationDao locationDao;
    private final ModelMapper modelMapper;
    private final RestTemplate restTemplate;

    @Override
    public BookingRespDTO createBooking(BookingReqDTO request, String userEmail) {
        System.out.println("Creating booking for user email: " + userEmail);
        
        // Get user by email
        User user = userDao.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        System.out.println("Found user: " + user.getName() + " with ID: " + user.getId());

        // Validate location data
        if (request.getPickupLocation() == null || request.getDropLocation() == null) {
            throw new IllegalArgumentException("Pickup and drop locations are required");
        }

        // Create pickup location
        Location pickupLocation = new Location();
        pickupLocation.setAddress(request.getPickupLocation().getAddress());
        pickupLocation.setLatitude(request.getPickupLocation().getLatitude());
        pickupLocation.setLongitude(request.getPickupLocation().getLongitude());
        pickupLocation = locationDao.save(pickupLocation);
        System.out.println("Created pickup location with ID: " + pickupLocation.getId());

        // Create drop location
        Location dropLocation = new Location();
        dropLocation.setAddress(request.getDropLocation().getAddress());
        dropLocation.setLatitude(request.getDropLocation().getLatitude());
        dropLocation.setLongitude(request.getDropLocation().getLongitude());
        dropLocation = locationDao.save(dropLocation);
        System.out.println("Created drop location with ID: " + dropLocation.getId());

        // Find nearest available ambulance (for now, just get first available)
        // TODO: Implement proper ambulance assignment logic based on location
        List<Ambulance> availableAmbulances = ambulanceDao.findByStatus(AmbulanceStatus.AVAILABLE);
        System.out.println("Found " + availableAmbulances.size() + " available ambulances");
        
        if (availableAmbulances.isEmpty()) {
            throw new ResourceNotFoundException("No ambulances available at the moment. Please try again later.");
        }
        Ambulance ambulance = availableAmbulances.get(0);
        System.out.println("Assigning ambulance: " + ambulance.getAmbulanceNumber());

        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setAmbulance(ambulance);
        booking.setPickupLocation(pickupLocation);
        booking.setDropLocation(dropLocation);
        booking.setBookingStatus(BookingStatus.ASSIGNED); // Changed from PENDING to ASSIGNED
        booking.setEmergencyType(request.getEmergencyType());

        Booking savedBooking = bookingDao.save(booking);

        // Update ambulance status
        ambulance.setStatus(AmbulanceStatus.BUSY);
        ambulanceDao.save(ambulance);

     // 👇 ADDED THIS LINE to force lazy loading
     savedBooking.getDropLocation().getId(); 
        return modelMapper.map(savedBooking, BookingRespDTO.class);
    }

    @Override
    public BookingRespDTO updateBooking(Long bookingId, BookingReqDTO request) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID " + bookingId));

        User user = userDao.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Ambulance ambulance = ambulanceDao.findById(request.getAmbulanceId())
                .orElseThrow(() -> new ResourceNotFoundException("Ambulance not found"));

        Location pickupLocation = locationDao.findById(request.getPickupLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Pickup location not found"));

        Location dropLocation = locationDao.findById(request.getDropLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Dropoff location not found"));

        booking.setUser(user);
        booking.setAmbulance(ambulance);
        booking.setPickupLocation(pickupLocation);
        booking.setDropLocation(dropLocation);
        booking.setBookingStatus(request.getBookingStatus());
        booking.setEmergencyType(request.getEmergencyType());

        Booking updatedBooking = bookingDao.save(booking);

        return modelMapper.map(updatedBooking, BookingRespDTO.class);
    }

    @Override
    public BookingRespDTO cancelBooking(Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID " + bookingId));

        booking.setBookingStatus(BookingStatus.CANCELLED);

        Booking cancelledBooking = bookingDao.save(booking);

        return modelMapper.map(cancelledBooking, BookingRespDTO.class);
    }

    @Override
    public List<BookingRespDTO> getAllBookingsForAdmin(Long adminUserId) {
        

        List<Booking> bookings = bookingDao.findAll(); // Or filter based on adminUserId if needed

        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingRespDTO.class))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BookingRespDTO> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingDao.findByUserId(userId);
        
        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingRespDTO.class))
                .collect(Collectors.toList());
    }
    
    @Override
    public List<BookingRespDTO> getBookingsByDriverId(Long driverId) {
        // Find ambulances assigned to this driver
        List<Ambulance> driverAmbulances = ambulanceDao.findByDriverId(driverId);
        
        if (driverAmbulances.isEmpty()) {
            return new ArrayList<>();
        }
        
        // Get bookings for all driver's ambulances
        List<Booking> bookings = new ArrayList<>();
        for (Ambulance ambulance : driverAmbulances) {
            bookings.addAll(bookingDao.findByAmbulanceId(ambulance.getId()));
        }
        
        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingRespDTO.class))
                .collect(Collectors.toList());
    }
    
    @Override
    public BookingRespDTO updateBookingStatus(Long bookingId, String status) {
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID " + bookingId));
        
        // Convert string status to enum
        BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
        booking.setBookingStatus(bookingStatus);
        
        // If booking is completed or cancelled, free up the ambulance
        if (bookingStatus == BookingStatus.COMPLETED || bookingStatus == BookingStatus.CANCELLED) {
            Ambulance ambulance = booking.getAmbulance();
            if (ambulance != null) {
                ambulance.setStatus(AmbulanceStatus.AVAILABLE);
                ambulanceDao.save(ambulance);
            }
        }
        
        Booking updatedBooking = bookingDao.save(booking);
        return modelMapper.map(updatedBooking, BookingRespDTO.class);
    }
    
    @Override
    public BookingRespDTO submitFeedback(Long bookingId, Integer rating, String comments) {
        // Get the booking
        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID " + bookingId));
        
        // Check if booking is completed
        if (booking.getBookingStatus() != BookingStatus.COMPLETED) {
            throw new IllegalStateException("Feedback can only be submitted for completed bookings");
        }
        
        // Check if feedback already exists
        if (booking.getFeedbackId() != null) {
            throw new IllegalStateException("Feedback has already been submitted for this booking");
        }
        
        // Prepare feedback request without userId and bookingId
        java.util.Map<String, Object> feedbackRequest = new java.util.HashMap<>();
        feedbackRequest.put("rating", rating);
        feedbackRequest.put("comments", comments);
        
        try {
            // Call feedback service
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<java.util.Map<String, Object>> request = new HttpEntity<>(feedbackRequest, headers);
            
            // Call feedback service which returns FeedbackResponseDTO
            java.util.Map<String, Object> response = restTemplate.postForObject(
                "http://localhost:9090/feedback", 
                request, 
                java.util.Map.class
            );
            
            Long feedbackId = ((Number) response.get("id")).longValue();
            
            // Update booking with feedback ID
            booking.setFeedbackId(feedbackId);
            Booking updatedBooking = bookingDao.save(booking);
            
            return modelMapper.map(updatedBooking, BookingRespDTO.class);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to submit feedback: " + e.getMessage());
        }
    }
    
    @Override
    public FeedbackRespDTO getFeedbackById(Long feedbackId) {
        try {
            // Call feedback service to get feedback details
            @SuppressWarnings("unchecked")
            java.util.Map<String, Object> response = restTemplate.getForObject(
                "http://localhost:9090/feedback/" + feedbackId, 
                java.util.Map.class
            );
            
            // Convert to FeedbackRespDTO
            FeedbackRespDTO feedbackDTO = new FeedbackRespDTO();
            feedbackDTO.setId(((Number) response.get("id")).longValue());
            feedbackDTO.setRating((Integer) response.get("rating"));
            feedbackDTO.setComments((String) response.get("comments"));
            
            return feedbackDTO;
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch feedback: " + e.getMessage());
        }
    }
}
