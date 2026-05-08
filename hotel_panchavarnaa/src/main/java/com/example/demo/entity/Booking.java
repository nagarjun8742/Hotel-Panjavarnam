package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Room room;

    private LocalDate checkIn;
    private LocalDate checkOut;

    private Double totalPrice;
    private String status; // PENDING, CONFIRMED, CHECKED_OUT
}
