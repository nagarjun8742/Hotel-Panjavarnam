package com.example.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.DTO.BookingRequest;
import com.example.demo.entity.Booking;
import com.example.demo.service.BookingService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService service;
    
    @GetMapping("/availability")
    public Map<String,Object> checkAvailability(
        @RequestParam String roomName,
        @RequestParam String checkIn,
        @RequestParam String checkOut
    ) {
        return service.getAvailableRooms(roomName, checkIn, checkOut);
    }
    
    
    // ✅ DASHBOARD STATS
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardStats() {
        return service.getDashboardStats();
    }
    
    
    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest request) {
        return service.createBooking(request);
    }

    @GetMapping
    public List<Booking> getAll() {
        return service.getAllBookings();
    }

    @PutMapping("/{id}/status")
    public Booking updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}
