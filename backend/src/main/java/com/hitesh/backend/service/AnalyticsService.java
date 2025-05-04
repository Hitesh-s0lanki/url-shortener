package com.hitesh.backend.service;

import com.hitesh.backend.dto.ClickEventDto;
import com.hitesh.backend.model.ClickEvent;
import com.hitesh.backend.model.UrlMapping;
import com.hitesh.backend.repository.ClickEventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private UserService userService;

    @Autowired
    private UrlMappingService urlMappingService;

    @Autowired
    private ClickEventRepo clickEventRepo;

    public ResponseEntity<?> getUrlAnalytics(String shortUrl, LocalDate startDate, LocalDate endDate) {
        try{
            LocalDateTime start = startDate.atStartOfDay();;
            LocalDateTime end = endDate.atTime(LocalTime.MAX);

            UrlMapping urlMapping = urlMappingService.findByShortUrl(shortUrl);

            if (urlMapping != null) {
                List<ClickEventDto> clickEvents = clickEventRepo.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                        .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                        .entrySet().stream()
                        .map(entry -> {
                            ClickEventDto clickEventDTO = new ClickEventDto();
                            clickEventDTO.setClickDate(entry.getKey());
                            clickEventDTO.setCount(entry.getValue());
                            return clickEventDTO;
                        })
                        .collect(Collectors.toList());

                return new ResponseEntity<>(clickEvents, HttpStatus.OK);
            }

            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getTotalClicksByDate(String username, LocalDate startDate, LocalDate endDate) {
        try{
            LocalDateTime start = startDate.atStartOfDay();;
            LocalDateTime end = endDate.atTime(LocalTime.MAX);

            List<UrlMapping> urlMappings = urlMappingService.findAllUserUrl(username);
            List<ClickEvent> clickEvents = clickEventRepo.findByUrlMappingInAndClickDateBetween(urlMappings, start, end);
            Map<LocalDate, Long> totalClicks = clickEvents.stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));

            return ResponseEntity.ok(totalClicks);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
