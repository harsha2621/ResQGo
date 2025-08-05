package com.cdac.service;

import java.util.List;

import com.cdac.dto.AmbulanceReqDTO;
import com.cdac.dto.AmbulanceRespDTO;
import com.cdac.dto.ApiResponse;

public interface AmbulanceService {
    
    AmbulanceRespDTO addAmbulance(AmbulanceReqDTO dto);

    AmbulanceRespDTO updateAmbulance(Long id, AmbulanceReqDTO dto);

    ApiResponse deleteAmbulance(Long id);

    AmbulanceRespDTO getAmbulance(Long id);

    List<AmbulanceRespDTO> getAllAmbulances();
}
