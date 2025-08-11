package com.cdac.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Organization;

@Repository
public interface OrganizationDao extends JpaRepository<Organization, Long>{

}
