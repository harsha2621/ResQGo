package com.cdac.service;

import java.util.List;

import com.cdac.dto.BookingReqDTO;
import com.cdac.dto.BookingRespDTO;

public interface BookingService

{
    BookingRespDTO createBooking(BookingReqDTO request);
    BookingRespDTO updateBooking(Long bookingId, BookingReqDTO request);
    BookingRespDTO cancelBooking(Long bookingId);
    List<BookingRespDTO> getAllBookingsForAdmin(Long adminUserId);
 
}
