package com.example.demo.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.*;
import com.example.demo.DTO.BookingRequest;
import com.example.demo.entity.Booking;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Room;
import com.example.demo.entity.RoomBlock;
import com.example.demo.repository.*;

import java.time.temporal.ChronoUnit;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private RoomBlockRepository blockRepo;
    
    // ✅ DASHBOARD STATS
    public Map<String, Object> getDashboardStats() {

        Map<String, Object> map = new HashMap<>();

        List<Booking> bookings = bookingRepo.findAll();
        List<Room> rooms = roomRepo.findAll();

        int totalBookings = bookings.size();

        double revenue = bookings.stream()
                .mapToDouble(b -> b.getRoom().getPrice())
                .sum();

        int totalRooms = rooms.size();
        int occupiedRooms = bookings.size();

        int occupancy = totalRooms == 0 ? 0 :
                (occupiedRooms * 100) / totalRooms;

        int totalGuests = bookings.size();

        map.put("totalBookings", totalBookings);
        map.put("revenue", revenue);
        map.put("occupancy", occupancy);
        map.put("totalGuests", totalGuests);

        return map;
    }
    
    public Booking createBooking(BookingRequest req) {

        Room room = roomRepo.findById(req.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Booking booking = new Booking();
        Customer customer=new Customer();
        customer.setName(req.getName());
        customer.setEmail(req.getEmail());
        customer.setPhone(req.getPhone());
        booking.setRoom(room);
        booking.setCheckIn(LocalDate.parse(req.getCheckIn()));
        booking.setCheckOut(LocalDate.parse(req.getCheckOut()));

        return bookingRepo.save(booking);
    }
    
    
    public Map<String, Object> getAvailableRooms(String roomName, String checkInStr, String checkOutStr) {

        LocalDate checkIn = LocalDate.parse(checkInStr);
        LocalDate checkOut = LocalDate.parse(checkOutStr);

        // ✅ get all rooms of same type
        List<Room> rooms = roomRepo.findByName(roomName);

        List<Booking> bookings = bookingRepo.findAll();

        List<Long> availableRoomIds = new ArrayList<>();

        for (Room room : rooms) {
            boolean isBooked = false;

            for (Booking b : bookings) {
                if (b.getRoom().getId().equals(room.getId())) {

                    // overlap check
                    if (!(checkOut.isBefore(b.getCheckIn()) || checkIn.isAfter(b.getCheckOut()))) {
                        isBooked = true;
                        break;
                    }
                }
            }

            if (!isBooked) {
                availableRoomIds.add(room.getId());
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("available", availableRoomIds.size());
        response.put("roomIds", availableRoomIds);

        return response;
    }

    // ✅ SAVE BOOKING
    public Booking saveBooking(Booking booking) {

        Long roomId = booking.getRoom().getId();
        LocalDate checkIn = booking.getCheckIn();
        LocalDate checkOut = booking.getCheckOut();

        if (!isRoomAvailable(roomId, checkIn, checkOut)) {
            throw new RuntimeException("Room not available");
        }

        // Save customer
        Customer customer = customerRepo.save(booking.getCustomer());
        booking.setCustomer(customer);

        // Calculate price
        Room room = roomRepo.findById(roomId).orElseThrow();
        long days = ChronoUnit.DAYS.between(checkIn, checkOut);
        double total = room.getPrice() * days;

        booking.setTotalPrice(total);
        booking.setStatus("CONFIRMED");

        return bookingRepo.save(booking);
    }

    // ✅ GET ALL BOOKINGS
    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    // 🔥 AVAILABILITY CHECK
    public boolean isRoomAvailable(Long roomId, LocalDate checkIn, LocalDate checkOut) {

        List<Booking> bookings = bookingRepo.findAll();
        List<RoomBlock> blocks = blockRepo.findAll();

        for (Booking b : bookings) {
            if (b.getRoom().getId().equals(roomId)) {
                if (!(checkOut.isBefore(b.getCheckIn()) || checkIn.isAfter(b.getCheckOut()))) {
                    return false;
                }
            }
        }

        for (RoomBlock rb : blocks) {
            if (rb.getRoom().getId().equals(roomId)) {
                if (!(checkOut.isBefore(rb.getBlockedFrom()) || checkIn.isAfter(rb.getBlockedTo()))) {
                    return false;
                }
            }
        }

        return true;
    }

    // ✅ UPDATE STATUS
    public Booking updateStatus(Long id, String status) {
        Booking booking = bookingRepo.findById(id).orElseThrow();
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }
}
