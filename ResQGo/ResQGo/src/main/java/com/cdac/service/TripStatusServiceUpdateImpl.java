package com.cdac.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.BookingDao;
import com.cdac.dao.TripStatusUpdateDao;
import com.cdac.dto.TripStatusUpdateReqDTO;
import com.cdac.dto.TripStatusUpdateRespDTO;
import com.cdac.entities.Booking;
import com.cdac.entities.TripStatusUpdate;
import com.cdac.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TripStatusServiceUpdateImpl implements TripStatusUpdateService {

    private final TripStatusUpdateDao tripStatusUpdateDao;
    private final BookingDao bookingDao;
    private final ModelMapper modelMapper;

    @Override
    public TripStatusUpdateRespDTO addTripStatusUpdate(TripStatusUpdateReqDTO dto) {
        Booking booking = bookingDao.findById(dto.getBookingId())
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + dto.getBookingId()));

        TripStatusUpdate statusUpdate = new TripStatusUpdate();
        statusUpdate.setBooking(booking);
        statusUpdate.setStatus(dto.getStatus());
        statusUpdate.setUpdatedTime(LocalDateTime.now());

        TripStatusUpdate saved = tripStatusUpdateDao.save(statusUpdate);
        return modelMapper.map(saved, TripStatusUpdateRespDTO.class);
    }

    @Override
    public List<TripStatusUpdateRespDTO> getStatusUpdatesByBooking(Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        List<TripStatusUpdate> updates = tripStatusUpdateDao.findByBooking(booking);
        return updates.stream()
                .map(update -> modelMapper.map(update, TripStatusUpdateRespDTO.class))
                .collect(Collectors.toList());
    }
    
    @Override
    public TripStatusUpdateRespDTO updateTripStatus(Long tripStatusId, TripStatusUpdateReqDTO dto) {
        TripStatusUpdate existing = tripStatusUpdateDao.findById(tripStatusId)
            .orElseThrow(() -> new ResourceNotFoundException("TripStatus not found"));

        existing.setStatus(dto.getStatus());
        existing.setUpdatedAt(LocalDateTime.now()); // if applicable

        TripStatusUpdate updated = tripStatusUpdateDao.save(existing);

        return  modelMapper.map(updated, TripStatusUpdateRespDTO.class);
    }

}
