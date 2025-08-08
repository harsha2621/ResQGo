package com.cdac.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Bill;

@Repository
public interface BillDao extends JpaRepository<Bill, Long>{

}