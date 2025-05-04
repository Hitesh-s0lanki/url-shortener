package com.hitesh.backend.controller;

import com.hitesh.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService service;

    @GetMapping("url/{shortUrl}")
    public ResponseEntity<?> getUrlAnalytics(
            @PathVariable String shortUrl,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ){
        return service.getUrlAnalytics(shortUrl, startDate, endDate);
    }

    @GetMapping("urls/clicks")
    public ResponseEntity<?> getTotalClicksByDate(
            Principal principal,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ){

        return service.getTotalClicksByDate(principal.getName(), startDate, endDate);
    }
}
