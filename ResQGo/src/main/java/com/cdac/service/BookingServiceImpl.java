package com.cdac.service;


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
import com.cdac.entities.Ambulance;
import com.cdac.entities.Booking;
import com.cdac.entities.BookingStatus;
import com.cdac.entities.Location;
import com.cdac.entities.User;
import com.cdac.exception.ResourceNotFoundException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingDao bookingDao;
    private final UserDao userDao;
    private final AmbulanceDao ambulanceDao;
    private final LocationDao locationDao;
    private final ModelMapper modelMapper;

    @Override
    public BookingRespDTO createBooking(BookingReqDTO request) {
        User user = userDao.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Ambulance ambulance = ambulanceDao.findById(request.getAmbulanceId())
                .orElseThrow(() -> new ResourceNotFoundException("Ambulance not found"));

        Location pickupLocation = locationDao.findById(request.getPickupLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Pickup location not found"));

        Location dropLocation = locationDao.findById(request.getDropoffLocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Dropoff location not found"));

        boolean exists = bookingDao.existsByUserAndAmbulanceAndPickupLocationAndDropLocation(
        	    user, ambulance, pickupLocation, dropLocation);
        	if (exists) {
        	    throw new IllegalStateException("Booking already exists with these details");
        	}


        Booking booking = new Booking();
        booking.setUser(user);
        booking.setAmbulance(ambulance);
        booking.setPickupLocation(pickupLocation);
        booking.setDropLocation(dropLocation);
        booking.setBookingStatus(request.getBookingStatus());
        booking.setEmergencyType(request.getEmergencyType());

        Booking savedBooking = bookingDao.save(booking);

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

        Location dropLocation = locationDao.findById(request.getDropoffLocationId())
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
        // Assuming adminUserId is used to filter bookings by organization or role, 
        // if not, just return all bookings.

        List<Booking> bookings = bookingDao.findAll(); // Or filter based on adminUserId if needed

        return bookings.stream()
                .map(booking -> modelMapper.map(booking, BookingRespDTO.class))
                .collect(Collectors.toList());
    }
}
