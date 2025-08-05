package com.cdac.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.BookingDao;
import com.cdac.dao.FeedbackDao;
import com.cdac.dao.UserDao;
import com.cdac.dto.FeedbackReqDTO;
import com.cdac.dto.FeedbackRespDTO;
import com.cdac.entities.Booking;
import com.cdac.entities.Feedback;
import com.cdac.entities.User;
import com.cdac.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackDao feedbackDao;
    private final BookingDao bookingDao;
    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public FeedbackRespDTO addFeedback(FeedbackReqDTO dto) {
        Booking booking = bookingDao.findById(dto.getBookingId())
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + dto.getBookingId()));

        User user = userDao.findById(dto.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + dto.getUserId()));

        // Optional: Check if feedback already exists for booking (unique constraint)
        if(feedbackDao.existsByBooking(booking)) {
            throw new IllegalArgumentException("Feedback already exists for booking id: " + dto.getBookingId());
        }

        Feedback feedback = new Feedback();
        feedback.setBooking(booking);
        feedback.setUser(user);
        feedback.setComments(dto.getComments());
        feedback.setRating(dto.getRating());

        Feedback saved = feedbackDao.save(feedback);
        return modelMapper.map(saved, FeedbackRespDTO.class);
    }


    @Override
    public FeedbackRespDTO getFeedbackByBooking(Long bookingId) {
        Booking booking = bookingDao.findById(bookingId)
            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        Feedback feedback = feedbackDao.findByBooking(booking)
            .orElseThrow(() -> new ResourceNotFoundException("Feedback not found for booking id: " + bookingId));

        return modelMapper.map(feedback, FeedbackRespDTO.class);
    }

   
}


