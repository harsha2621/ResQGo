package com.cdac.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entities.Organization;

//The @Repository annotation is used to indicate that a class or interface is a Data Access Object (DAO).
//It allows Spring to automatically detect it during component scanning and manage it as a bean.
@Repository
public interface OrganizationDao extends JpaRepository<Organization, Long>{

}
