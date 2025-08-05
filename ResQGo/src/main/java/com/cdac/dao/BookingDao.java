package com.cdac.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Ambulance;
import com.cdac.entities.Booking;
import com.cdac.entities.Location;
import com.cdac.entities.User;

@Repository
public interface BookingDao extends JpaRepository<Booking, Long>{

	boolean existsByUserAndAmbulanceAndPickupLocationAndDropLocation(User user, Ambulance ambulance,
			Location pickupLocation, Location dropLocation);

	
}