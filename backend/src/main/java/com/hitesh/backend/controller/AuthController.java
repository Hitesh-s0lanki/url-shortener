package com.hitesh.backend.controller;

import com.hitesh.backend.dto.LoginDto;
import com.hitesh.backend.model.User;
import com.hitesh.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService service;

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return service.saveUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        return service.loginUser(loginDto);
    }

}
