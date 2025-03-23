package com.madislennud.lennupiletid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080") // Change this if needed
public class SeatBookingController {

    private final LennudService lennudService;

    @Autowired
    public SeatBookingController(LennudService lennudService) {
        this.lennudService = lennudService;
    }

    @PostMapping("/book-seats")
    public String bookSeats(@RequestBody SeatBookingRequest request) {
        List<Integer> seatNumbers = request.getSeats();
        int planeId = request.getPlaneId(); // Make sure this matches the request JSON

        //saadud info
        System.out.println("Received seat booking: " + seatNumbers);
        System.out.println("PlaneId: " + planeId);



        return "{\"success\": true, \"message\": \"Seats booked successfully!\"}";
    }
}