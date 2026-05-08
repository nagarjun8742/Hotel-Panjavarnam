package com.example.demo.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Room;
import com.example.demo.repository.RoomRepository;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository repo;

    public Room addRoom(Room room) {
        return repo.save(room);
    }

    public List<Room> getAllRooms() {
        return repo.findAll();
    }
    
    public Room getRoomById(Long id) {
        return repo.findById(id).orElseThrow(()
       -> new RuntimeException("Room not found"));
    }

    public Room updateRoom(Long id, Room room) {
        Room existing = repo.findById(id).orElseThrow();

        existing.setName(room.getName());
        existing.setPrice(room.getPrice());
        existing.setCapacity(room.getCapacity());

        return repo.save(existing);
    }

    public void deleteRoom(Long id) {
        repo.deleteById(id);
    }
}
