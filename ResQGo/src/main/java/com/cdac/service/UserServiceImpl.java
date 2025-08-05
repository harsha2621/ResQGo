package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.OrganizationDao;
import com.cdac.dao.UserDao;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.UserReqDTO;
import com.cdac.dto.UserRespDTO;
import com.cdac.entities.Organization;
import com.cdac.entities.User;
import com.cdac.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDao userDao;
    private final ModelMapper modelMapper;
    private final OrganizationDao organizationDao;

    @Override
    public UserRespDTO addUser(UserReqDTO dto) {
        // Step 1: Validate that the organization exists
        Organization org = organizationDao.findById(dto.getOraganizationId())
            .orElseThrow(() -> new ResourceNotFoundException("Organization not found"));

        // Step 2: Map DTO to User
        User user = modelMapper.map(dto, User.class);

        // Step 3: Manually set the organization
        user.setOrganization(org);

        // Step 4: Save and map to response DTO
        return modelMapper.map(userDao.save(user), UserRespDTO.class);
    }


    @Override
    public UserRespDTO updateUser(Long id, UserReqDTO dto) {
        User user = userDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
        
        modelMapper.map(dto, user);
        return modelMapper.map(userDao.save(user), UserRespDTO.class);
    }

    @Override
    public ApiResponse deleteUser(Long id) {
        User user = userDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
        userDao.delete(user);
        return new ApiResponse("User deleted successfully!") ;
    }

    @Override
    public UserRespDTO getUser(Long id) {
        User user = userDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
        return modelMapper.map(user, UserRespDTO.class);
    }

	@Override
	public List<UserRespDTO> getAllUsers() {
		List<User> users = userDao.findAll();
        return users.stream().map(user -> modelMapper.map(user, UserRespDTO.class)).collect(Collectors.toList());
	}
}
