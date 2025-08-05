package com.cdac.service;

import java.util.List;

import com.cdac.dto.ApiResponse;
import com.cdac.dto.LocationReqDTO;
import com.cdac.dto.LocationRespDTO;

public interface LocationService {

    LocationRespDTO addLocation(LocationReqDTO dto);

    LocationRespDTO updateLocation(Long id, LocationReqDTO dto);

    ApiResponse deleteLocation(Long id);

    LocationRespDTO getLocationById(Long id);

    List<LocationRespDTO> getAllLocations();
}
