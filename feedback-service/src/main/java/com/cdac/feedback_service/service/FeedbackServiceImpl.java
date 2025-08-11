package com.cdac.feedback_service.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.cdac.feedback_service.dao.FeedbackDao;
import com.cdac.feedback_service.dto.BookingDto;
import com.cdac.feedback_service.dto.FeedbackRequestDTO;
import com.cdac.feedback_service.dto.FeedbackResponseDTO;
import com.cdac.feedback_service.entity.Feedback;
import com.cdac.feedback_service.exception.ResourceNotFoundException;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackDao feedbackDao;
    private final RestTemplate restTemplate;
    private final ModelMapper modelMapper;

    @Value("${user.service.url}")
    private String userServiceUrl;

    public FeedbackServiceImpl(
        FeedbackDao feedbackDao,
        RestTemplate restTemplate,
        ModelMapper modelMapper
    ) {
        this.feedbackDao = feedbackDao;
        this.restTemplate = restTemplate;
        this.modelMapper = modelMapper;
    }

    // ✅ New method to call backend with JWT token
    private BookingDto getBookingByIdWithToken(Long bookingId, String jwtToken) {
        String bookingUrl = "http://localhost:8080/bookings/" + bookingId;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwtToken); // ✅ Authorization header
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<BookingDto> response = restTemplate.exchange(
            bookingUrl,
            HttpMethod.GET,
            request,
            BookingDto.class
        );

        return response.getBody();
    }
  

    // ✅ Modified to accept JWT token
    public FeedbackResponseDTO addFeedback(Long bookingId, FeedbackRequestDTO feedbackDto, String jwtToken) {

        BookingDto booking = getBookingByIdWithToken(bookingId, jwtToken);

        if (booking == null) {
            throw new RuntimeException("Booking not found for ID: " + bookingId);
        }

        System.out.println("Booking fetched: " + booking);
        System.out.println("UserId from booking: " + booking.getUserId());

        Feedback feedback = modelMapper.map(feedbackDto, Feedback.class);
//        feedback.setBookingId(bookingId);
//        feedback.setUserId(booking.getUserId());

        Feedback savedFeedback = feedbackDao.save(feedback);

        return modelMapper.map(savedFeedback, FeedbackResponseDTO.class);
    }

    @Override
    public FeedbackResponseDTO getFeedbackById(Long id) {
        Feedback feedback = feedbackDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + id));

        return modelMapper.map(feedback, FeedbackResponseDTO.class);
    }
    
    @Override
    public FeedbackResponseDTO createFeedback(FeedbackRequestDTO feedbackDto) {
        Feedback feedback = new Feedback();
        feedback.setComments(feedbackDto.getComments());
        feedback.setRating(feedbackDto.getRating());
        
        Feedback savedFeedback = feedbackDao.save(feedback);
        
        return modelMapper.map(savedFeedback, FeedbackResponseDTO.class);
    }

	
}
