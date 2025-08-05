package com.cdac.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.OrganizationDao;
import com.cdac.dao.UserDao;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.OrganizationReqDTO;
import com.cdac.dto.OrganizationRespDTO;
import com.cdac.entities.Organization;
import com.cdac.entities.User;
import com.cdac.entities.UserRole;
import com.cdac.exception.InvalidRoleException;
import com.cdac.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationDao organizationDao;
    private final ModelMapper modelMapper;
    private final UserDao userDao;

    

    
     @Override
    public void assignAdmin(Long orgId, Long userId) {
    // Find organization by id
    Organization org = organizationDao.findById(orgId)
            .orElseThrow(() -> new ResourceNotFoundException("Organization not found with id: " + orgId));

    // Find user by id
    User user = userDao.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

    // Check if user has admin role
    if (user.getRole() != UserRole.ADMIN) {
        throw new InvalidRoleException("User is not an admin, cannot assign as organization admin");
    }

    // Set admin to organization
    org.setAdmin(user);

    // Save updated organization
    organizationDao.save(org);
}
    

    @Override
    public OrganizationRespDTO addOrganization(OrganizationReqDTO dto) {
        // Map DTO to entity
        Organization org = modelMapper.map(dto, Organization.class);
        // Save entity
        Organization savedOrg = organizationDao.save(org);
        // Map entity to response DTO and return
        return modelMapper.map(savedOrg, OrganizationRespDTO.class);
    }

    @Override
    public OrganizationRespDTO updateOrganization(Long id, OrganizationReqDTO dto) {
        Organization org = organizationDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization not found with id: " + id));

        // Update fields from DTO to entity (you can also map selectively)
        modelMapper.map(dto, org);

        // Save updated entity
        Organization updatedOrg = organizationDao.save(org);
        return modelMapper.map(updatedOrg, OrganizationRespDTO.class);
    }

    @Override
    public ApiResponse deleteOrganization(Long id) {
        Organization org = organizationDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization not found with id: " + id));

        organizationDao.delete(org);
        return new ApiResponse("Organization deleted successfully");
    }

    @Override
    public OrganizationRespDTO getOrganization(Long id) {
        Organization org = organizationDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Organization not found with id: " + id));

        return modelMapper.map(org, OrganizationRespDTO.class);
    }
}






	

