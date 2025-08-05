package com.cdac.security;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "secretkeymustbeatleast256bitlongforsafety123456"; // Min 256-bit

    private final long EXPIRATION = 1000 * 60 * 60 * 10; // 10 hours

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        
    }
    public String generateToken(UserDetails userDetails) {
        List<String> roles = userDetails.getAuthorities().stream()
                               .map(GrantedAuthority::getAuthority)
                               .collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", roles)  // list of roles
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


  
    

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    	 token = token.trim(); 
    	 System.out.println("Token being parsed: [" + token + "]");
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

  

    public void authenticateUserFromToken(String token) {
        // JWT token se claims nikaalo
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        // Username nikaalo
        String username = claims.getSubject();

        // Roles nikaalo claim "roles" se
        List<String> roles = claims.get("roles", List.class);

        // Roles ko GrantedAuthority me convert karo
        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        // Authentication token banao
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(username, null, authorities);

        // Security context me set karo
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

   
    public boolean isTokenValid(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}

