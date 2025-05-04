package com.hitesh.backend.controller;

import com.hitesh.backend.dto.UrlMappingDto;
import com.hitesh.backend.service.UrlMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/urls")
public class UrlMappingController {

    @Autowired
    private UrlMappingService service;

    @PostMapping()
    public ResponseEntity<?> generateShortUrl(@RequestBody UrlMappingDto urlMappingDto, Principal principal) {
        return service.generateShortUrl(urlMappingDto, principal.getName());
    }

    @GetMapping()
    public ResponseEntity<?> getUserUrls(Principal principal){
        return service.getUserUrls(principal.getName());
    }
}
