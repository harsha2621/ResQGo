//package com.cdac.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.cdac.dao.OrganizationDao;
//import com.cdac.dao.UserDao;
//import com.cdac.dto.ApiResponse;
//import com.cdac.dto.UserReqDTO;
//import com.cdac.dto.UserRespDTO;
//import com.cdac.entities.Organization;
//import com.cdac.entities.User;
//import com.cdac.exception.ResourceNotFoundException;
//
//import lombok.AllArgsConstructor;
//
//@Service
//@Transactional
//@AllArgsConstructor
//public class UserServiceImpl implements UserService {
//
//    private final UserDao userDao;
//    private final ModelMapper modelMapper;
//    private final OrganizationDao organizationDao;
//
//    @Override
//    public UserRespDTO addUser(UserReqDTO dto) {
//        // Map UserReqDTO to User entity
//        User user = modelMapper.map(dto, User.class);
//        
//        // Save the user entity to the database
//        User savedUser = userDao.save(user);
//        
//        // Map saved User entity to UserRespDTO
//        UserRespDTO response = modelMapper.map(savedUser, UserRespDTO.class);
//        
//        // Set the role as a string explicitly since UserRespDTO uses String for role
//        response.setRole(savedUser.getRole().name());
//        
//        return response;
//    }
//
//
//    @Override
//    public UserRespDTO updateUser(Long id, UserReqDTO dto) {
//        User user = userDao.findById(id)
//            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
//        
//        modelMapper.map(dto, user);
//        return modelMapper.map(userDao.save(user), UserRespDTO.class);
//    }
//
//    @Override
//    public ApiResponse deleteUser(Long id) {
//        User user = userDao.findById(id)
//            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
//        userDao.delete(user);
//        return new ApiResponse("User deleted successfully!") ;
//    }
//
//    @Override
//    public UserRespDTO getUser(Long id) {
//        User user = userDao.findById(id)
//            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
//        return modelMapper.map(user, UserRespDTO.class);
//    }
//
//	@Override
//	public List<UserRespDTO> getAllUsers() {
//		List<User> users = userDao.findAll();
//        return users.stream().map(user -> modelMapper.map(user, UserRespDTO.class)).collect(Collectors.toList());
//	}
//	
//	@Override
//	public UserRespDTO getUserByEmail(String email) {
//	    User user = userDao.findByEmail(email)
//	        .orElseThrow(() -> new RuntimeException("User not found"));
//	    return modelMapper.map(user, UserRespDTO.class); // assuming you have a mapper
//	}
//
//}


package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.OrganizationDao;
import com.cdac.dao.UserDao;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.UserReqDTO;
import com.cdac.dto.UserRespDTO;
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
        User user = modelMapper.map(dto, User.class);
        User savedUser = userDao.save(user);
        UserRespDTO response = modelMapper.map(savedUser, UserRespDTO.class);
        response.setRole(savedUser.getRole().name());
        return response;
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
        return new ApiResponse("User deleted successfully!");
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

//    @Override
//    public UserRespDTO getUserByEmail(String email) {
//        User user = userDao.findByEmail(email)
//            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
//        return modelMapper.map(user, UserRespDTO.class);
//    }
    
    @Override
    public UserRespDTO getUserByEmail(String email) {
        User user = userDao.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        UserRespDTO response = modelMapper.map(user, UserRespDTO.class);
        // Explicitly set role as a String if ModelMapper doesn't handle it
        response.setRole(user.getRole() != null ? user.getRole().toString() : "USER"); // Adjust based on Role type
        return response;
    }
}