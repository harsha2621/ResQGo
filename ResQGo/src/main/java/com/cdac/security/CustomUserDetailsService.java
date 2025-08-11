package com.cdac.security;
import com.cdac.dao.*;
import com.cdac.entities.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Getter
@Setter
@AllArgsConstructor

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserDao userDao;

  
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByEmail(username)
                      .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new CustomUserDetails(user);
    }
    
    public User getUserByEmail(String email) {
        return userDao.findByEmail(email)
                      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
