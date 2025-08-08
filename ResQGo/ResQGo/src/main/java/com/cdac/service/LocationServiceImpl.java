package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.LocationDao;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.LocationReqDTO;
import com.cdac.dto.LocationRespDTO;
import com.cdac.entities.Location;
import com.cdac.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationDao locationDao;
    private final ModelMapper modelMapper;

    @Override
    public LocationRespDTO addLocation(LocationReqDTO dto) {
        Location location = modelMapper.map(dto, Location.class);
        return modelMapper.map(locationDao.save(location), LocationRespDTO.class);
    }

    @Override
    public LocationRespDTO updateLocation(Long id, LocationReqDTO dto) {
        Location location = locationDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Location not found with ID " + id));
        
        modelMapper.map(dto, location);
        return modelMapper.map(locationDao.save(location), LocationRespDTO.class);
    }

    @Override
    public ApiResponse deleteLocation(Long id) {
        Location location = locationDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Location not found with ID " + id));
        locationDao.delete(location);
        return new ApiResponse("Location deleted successfully!");
    }

    @Override
    public LocationRespDTO getLocationById(Long id) {
        Location location = locationDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Location not found with ID " + id));
        return modelMapper.map(location, LocationRespDTO.class);
    }

    @Override
    public List<LocationRespDTO> getAllLocations() {
        List<Location> locations = locationDao.findAll();
        return locations.stream()
                .map(loc -> modelMapper.map(loc, LocationRespDTO.class))
                .collect(Collectors.toList());
    }
}
