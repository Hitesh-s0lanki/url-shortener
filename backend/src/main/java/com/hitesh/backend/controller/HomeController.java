package com.hitesh.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class HomeController {

    @GetMapping("home")
    public String home() {
        return "version of this app is v1.0";
    }
}
