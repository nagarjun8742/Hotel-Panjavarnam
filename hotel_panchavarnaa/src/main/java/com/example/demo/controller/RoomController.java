package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Room;
import com.example.demo.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService service;

    // ✅ ADD ROOM
    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return service.addRoom(room);
    }

    // ✅ GET ALL ROOMS
    @GetMapping
    public List<Room> getAll() {
        return service.getAllRooms();
    }

    // ✅ GET ROOM BY ID
    @GetMapping("/{id}")
    public Room getById(@PathVariable Long id) {
        return service.getRoomById(id);
    }

    // ✅ UPDATE ROOM
    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return service.updateRoom(id, room);
    }

    // ✅ DELETE ROOM
    @DeleteMapping("/{id}")
    public String deleteRoom(@PathVariable Long id) {
        service.deleteRoom(id);
        return "Room deleted successfully";
    }
}