package com.cdac.service;

import com.cdac.dto.*;


public interface OrganizationService {
	
    OrganizationRespDTO addOrganization(OrganizationReqDTO dto);
 
    OrganizationRespDTO updateOrganization(Long id, OrganizationReqDTO dto);
    
    ApiResponse deleteOrganization(Long id);
    
    OrganizationRespDTO getOrganization(Long id);
    
    
    public void assignAdmin(Long orgId, Long userId);
    
}
