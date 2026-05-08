package com.example.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @GetMapping
    public Map<String, Object> getStats() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalBookings", bookingRepo.count());
        data.put("totalCustomers", customerRepo.count());

        return data;
    }
}
