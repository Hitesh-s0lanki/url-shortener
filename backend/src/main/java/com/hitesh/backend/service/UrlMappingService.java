package com.hitesh.backend.service;

import com.hitesh.backend.dto.UrlMappingDto;
import com.hitesh.backend.model.ClickEvent;
import com.hitesh.backend.model.UrlMapping;
import com.hitesh.backend.model.User;
import com.hitesh.backend.repository.ClickEventRepo;
import com.hitesh.backend.repository.UrlMappingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class UrlMappingService {

    @Autowired
    private UserService userService;

    @Autowired
    private UrlMappingRepo repo;

    @Autowired
    private ClickEventRepo clickEventRepo;

    public ResponseEntity<?> generateShortUrl(UrlMappingDto urlMappingDto, String name) {
        try{
            User user = userService.findByUsername(name);

            String shortUrl = generateCode();

            UrlMapping urlMapping = new UrlMapping();
            urlMapping.setOriginalUrl(urlMappingDto.getOriginalUrl());
            urlMapping.setShortUrl(shortUrl);
            urlMapping.setUser(user);
            urlMapping.setCreatedDate(LocalDateTime.now());

            return new ResponseEntity<>(repo.save(urlMapping), HttpStatus.OK);

        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String generateCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    public ResponseEntity<?> getUserUrls(String name) {
        try{
            User user = userService.findByUsername(name);

            List<UrlMapping> urlMappings = repo.findByUser(user);

            return new ResponseEntity<>(urlMappings, HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public UrlMapping findByShortUrl(String shortUrl) {
        return repo.findByShortUrl(shortUrl);
    }

    public List<UrlMapping> findAllUserUrl(String username) throws Exception {
            User user = userService.findByUsername(username);
            return repo.findByUser(user);
    }

    public UrlMapping getOriginalUrl(String shortUrl) {
        UrlMapping urlMapping = repo.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            urlMapping.setClickCount(urlMapping.getClickCount() + 1);
            repo.save(urlMapping);

            // Record Click Event
            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepo.save(clickEvent);
        }

        return urlMapping;
    }
}
