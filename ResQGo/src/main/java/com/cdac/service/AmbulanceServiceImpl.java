package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.AmbulanceDao;
import com.cdac.dao.LocationDao;
import com.cdac.dao.OrganizationDao;
import com.cdac.dao.UserDao;
import com.cdac.dto.AmbulanceReqDTO;
import com.cdac.dto.AmbulanceRespDTO;
import com.cdac.dto.ApiResponse;
import com.cdac.entities.Ambulance;
import com.cdac.entities.Location;
import com.cdac.entities.Organization;
import com.cdac.entities.User;
import com.cdac.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AmbulanceServiceImpl implements AmbulanceService {

    private final AmbulanceDao ambulanceDao;
    private final ModelMapper modelMapper;
    private final LocationDao locationDao;
    private final UserDao userDao;
    private final OrganizationDao organizationDao;

    @Override
  
    
    public AmbulanceRespDTO addAmbulance(AmbulanceReqDTO dto) {
        // Validate ambulance number uniqueness
        if (ambulanceDao.existsByAmbulanceNumber(dto.getAmbulanceNumber())) {
            throw new IllegalArgumentException("Ambulance number '" + dto.getAmbulanceNumber() + "' already exists.");
        }

        // Check if driver is already assigned to another ambulance
        if (ambulanceDao.existsByDriverId(dto.getDriverId())) {
            Ambulance existingAmbulance = ambulanceDao.findByDriverId(dto.getDriverId()).get(0);
            throw new IllegalArgumentException("Driver with ID " + dto.getDriverId() + 
                " is already assigned to ambulance " + existingAmbulance.getAmbulanceNumber());
        }

        // Validate driver exists and has DRIVER role
        User driver = userDao.findById(dto.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with ID: " + dto.getDriverId()));

        Ambulance ambulance = new Ambulance();
        ambulance.setAmbulanceNumber(dto.getAmbulanceNumber());
        ambulance.setType(dto.getType());
        ambulance.setStatus(dto.getStatus());
        ambulance.setDriver(driver);

        // Create location only if coordinates are provided
        if (dto.getLatitude() != null && dto.getLongitude() != null) {
            Location location = new Location();
            location.setLatitude(dto.getLatitude());
            location.setLongitude(dto.getLongitude());
            location.setAddress("Ambulance " + dto.getAmbulanceNumber() + " Location");
            Location savedLocation = locationDao.save(location);
            ambulance.setCurrentLocation(savedLocation);
        }

       
        Organization org = organizationDao.findAll().stream().findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Organization not found"));
        ambulance.setOrganization(org);

        return modelMapper.map(ambulanceDao.save(ambulance), AmbulanceRespDTO.class);
    }


    @Override
    public AmbulanceRespDTO updateAmbulance(Long id, AmbulanceReqDTO dto) {
        Ambulance ambulance = ambulanceDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ambulance not found with ID " + id));

        // Check if ambulance number is being changed and if new number already exists
        if (!ambulance.getAmbulanceNumber().equals(dto.getAmbulanceNumber()) && 
            ambulanceDao.existsByAmbulanceNumber(dto.getAmbulanceNumber())) {
            throw new IllegalArgumentException("Ambulance number '" + dto.getAmbulanceNumber() + "' already exists.");
        }

        // Update basic fields
        ambulance.setAmbulanceNumber(dto.getAmbulanceNumber());
        ambulance.setType(dto.getType());
        ambulance.setStatus(dto.getStatus());
        
        // Update location only if coordinates are provided
        if (dto.getLatitude() != null && dto.getLongitude() != null) {
            Location location = ambulance.getCurrentLocation();
            if (location != null) {
                location.setLatitude(dto.getLatitude());
                location.setLongitude(dto.getLongitude());
                locationDao.save(location);
            } else {
                // Create new location if it doesn't exist
                Location newLocation = new Location();
                newLocation.setLatitude(dto.getLatitude());
                newLocation.setLongitude(dto.getLongitude());
                newLocation.setAddress("Ambulance " + dto.getAmbulanceNumber() + " Location");
                Location savedLocation = locationDao.save(newLocation);
                ambulance.setCurrentLocation(savedLocation);
            }
        }
        
        // Update driver
        User driver = userDao.findById(dto.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found"));
        ambulance.setDriver(driver);
        
        return modelMapper.map(ambulanceDao.save(ambulance), AmbulanceRespDTO.class);
    }

    @Override
    public ApiResponse deleteAmbulance(Long id) {
        Ambulance ambulance = ambulanceDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ambulance not found with ID " + id));

        ambulanceDao.delete(ambulance);
        return new ApiResponse("Ambulance deleted successfully!");
    }

    @Override
    public AmbulanceRespDTO getAmbulance(Long id) {
        Ambulance ambulance = ambulanceDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Ambulance not found with ID " + id));

        return modelMapper.map(ambulance, AmbulanceRespDTO.class);
    }

    @Override
    public List<AmbulanceRespDTO> getAllAmbulances() {
        return ambulanceDao.findAll().stream()
            .map(amb -> modelMapper.map(amb, AmbulanceRespDTO.class))
            .collect(Collectors.toList());
    }
}
