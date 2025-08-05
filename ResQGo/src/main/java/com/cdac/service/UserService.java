package com.cdac.service;

import java.util.List;

import com.cdac.dto.ApiResponse;
import com.cdac.dto.UserReqDTO;
import com.cdac.dto.UserRespDTO;

public interface UserService {

	
	    UserRespDTO addUser(UserReqDTO dto);
	    
	    UserRespDTO updateUser(Long id, UserReqDTO dto);
	    
	    ApiResponse deleteUser(Long id);
	    
	    UserRespDTO getUser(Long id);
	    
	    List<UserRespDTO> getAllUsers();
	

}
