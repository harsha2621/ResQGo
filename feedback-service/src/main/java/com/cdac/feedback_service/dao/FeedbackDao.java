package com.cdac.feedback_service.dao;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.feedback_service.entity.Feedback;

@Repository
public interface FeedbackDao extends JpaRepository<Feedback, Long> {
    // Methods related to bookingId removed since entity no longer has bookingId
}
