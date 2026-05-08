package com.example.demo.entity;



import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class RoomBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Room room;

    private LocalDate blockedFrom;
    private LocalDate blockedTo;

    private String reason;
}
