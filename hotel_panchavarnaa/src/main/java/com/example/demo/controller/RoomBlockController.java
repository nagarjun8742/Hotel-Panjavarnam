package com.example.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.RoomBlock;
import com.example.demo.repository.RoomBlockRepository;

import java.util.List;

@RestController
@RequestMapping("/api/blocks")
@CrossOrigin("*")
public class RoomBlockController {

    @Autowired
    private RoomBlockRepository repo;

    @PostMapping
    public RoomBlock block(@RequestBody RoomBlock block) {
        return repo.save(block);
    }

    @GetMapping
    public List<RoomBlock> getAll() {
        return repo.findAll();
    }
}
