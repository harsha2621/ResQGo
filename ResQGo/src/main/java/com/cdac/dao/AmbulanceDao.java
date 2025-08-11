package com.cdac.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Ambulance;
import com.cdac.entities.AmbulanceStatus;

@Repository
public interface AmbulanceDao extends JpaRepository<Ambulance, Long>{
	
	boolean existsByAmbulanceNumber(String ambulanceNumber);
	
	boolean existsByDriverId(Long driverId);
	
	List<Ambulance> findByStatus(AmbulanceStatus status);
	
	List<Ambulance> findByDriverId(Long driverId);

}