package com.cdac.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Booking;
import com.cdac.entities.TripStatusUpdate;

@Repository
public interface TripStatusUpdateDao extends JpaRepository<TripStatusUpdate, Long>{

	List<TripStatusUpdate> findByBooking(Booking booking);

}