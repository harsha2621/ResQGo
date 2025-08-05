package com.cdac.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Booking;
import com.cdac.entities.Feedback;

@Repository
public interface FeedbackDao extends JpaRepository<Feedback, Long>{

	

	Optional<Feedback> findByBooking(Booking booking);

	boolean existsByBooking(Booking booking);

}