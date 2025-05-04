package com.hitesh.backend.service;

import com.hitesh.backend.dto.JwtResponse;
import com.hitesh.backend.dto.LoginDto;
import com.hitesh.backend.model.User;
import com.hitesh.backend.model.UserPrincipal;
import com.hitesh.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public ResponseEntity<?> saveUser(User user) {
        try{
            // check User already present or not
            User existingUserEmail = repo.findUserByEmail(user.getUsername());
            if (existingUserEmail != null) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this email already exists");
            }

            User existingUserUsername = repo.findUserByUsername(user.getUsername());
            if (existingUserUsername != null) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this username already exists");
            }

            user.setPassword(encoder.encode(user.getPassword()));
            return new ResponseEntity<>(repo.save(user), HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> loginUser(LoginDto loginDto) {
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
            );

            if (authentication.isAuthenticated()) {
                return new ResponseEntity<>(new JwtResponse(jwtService.generateJwtToken((UserPrincipal) authentication.getPrincipal())), HttpStatus.OK);
            }

            return new ResponseEntity<>("User not found!", HttpStatus.UNAUTHORIZED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public User findByUsername(String name) {
        try{
            User user = repo.findUserByUsername(name);

            if (user == null) {
                throw new UsernameNotFoundException("User not found!");
            }

            return repo.findUserByUsername(name);
        } catch (Exception e){
            throw new UsernameNotFoundException("User not found!");
        }

    }
}
