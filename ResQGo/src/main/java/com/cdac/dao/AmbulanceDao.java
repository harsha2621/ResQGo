package com.cdac.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Ambulance;

@Repository
public interface AmbulanceDao extends JpaRepository<Ambulance, Long>{
	
	boolean existsByAmbulanceNumber(String ambulanceNumber);


}