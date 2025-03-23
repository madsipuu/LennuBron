package com.madislennud.lennupiletid;

import java.util.List;

public class SeatBookingRequest {
    private List<Integer> seats;
    private int planeId;

    // Getters and Setters
    public List<Integer> getSeats() { return seats; }
    public void setSeats(List<Integer> seats) { this.seats = seats; }

    public int getPlaneId() { return planeId; }
    public void setPlaneId(int PlaneID) { this.planeId = PlaneID; }


}
