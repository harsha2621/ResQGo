package com.cdac.service;

import java.util.List;

import com.cdac.dto.BookingReqDTO;
import com.cdac.dto.BookingRespDTO;
import com.cdac.dto.FeedbackRespDTO;

public interface BookingService

{
    BookingRespDTO createBooking(BookingReqDTO request, String userEmail);
    BookingRespDTO updateBooking(Long bookingId, BookingReqDTO request);
    BookingRespDTO cancelBooking(Long bookingId);
    List<BookingRespDTO> getAllBookingsForAdmin(Long adminUserId);
    List<BookingRespDTO> getBookingsByUserId(Long userId);
    List<BookingRespDTO> getBookingsByDriverId(Long driverId);
    BookingRespDTO updateBookingStatus(Long bookingId, String status);
    BookingRespDTO submitFeedback(Long bookingId, Integer rating, String comments);
    FeedbackRespDTO getFeedbackById(Long feedbackId);
 
}
