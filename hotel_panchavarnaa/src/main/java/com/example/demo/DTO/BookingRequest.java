package com.example.demo.DTO;

import lombok.Data;

@Data
public class BookingRequest {

    private String name;
    private String email;
    private String phone;
    private Long roomId;
    private String checkIn;
    private String checkOut;

    // getters & setters
}
