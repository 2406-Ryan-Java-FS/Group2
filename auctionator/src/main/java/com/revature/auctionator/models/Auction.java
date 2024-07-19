package com.revature.auctionator.models;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "auctions")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "a_id", updatable = false)
    private int id;

    @Column(name = "auction_item_id")
    private int item_id;

    @Column(name = "bid", nullable = false, columnDefinition = "NUMERIC(10,2)")
    private double bid;

    @Column(name = "bidder_id")
    private int bidder_id;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "a_time")
    private int time;

    public Auction() {
    }

    public Auction(int a_id, int item_id, double bid, int bidder_id, String status, int a_time) {
        this.id = a_id;
        this.item_id = item_id;
        this.bid = bid;
        this.bidder_id = bidder_id;
        this.status = status;
        this.time = a_time;
    }

    public Auction(double bid, int bidder_id) {
        this.bid = bid;
        this.bidder_id = bidder_id;
    }

    public int getId() { return id; }

    public int getItem_id() { return item_id; }

    public double getBid() { return bid; }

    public int getBidder_id() { return bidder_id; }

    public String getStatus() { return status; }

    public int getA_time() { return time; }

    public void setA_id(int a_id) { this.id = a_id; }

    public void setItem_id(int item_id) { this.item_id = item_id; }

    public void setBid(double bid) { this.bid = bid; }

    public void setBidder_id(int bidder_id) { this.bidder_id = bidder_id; }

    public void setStatus(String status) { this.status = status; }

    public void setA_time(int a_time) { this.time = a_time; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Auction auction = (Auction) o;
        return getId() == auction.getId() && getItem_id() == auction.getItem_id() && Double.compare(getBid(), auction.getBid()) == 0 && getBidder_id() == auction.getBidder_id() && getA_time() == auction.getA_time() && Objects.equals(getStatus(), auction.getStatus());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getItem_id(), getBid(), getBidder_id(), getStatus(), getA_time());
    }

    @Override
    public String toString() {
        return "Auction{" +
                "a_id=" + id +
                ", auction_item_id=" + item_id +
                ", bid=" + bid +
                ", bidder_id=" + bidder_id +
                ", status='" + status + '\'' +
                ", a_time=" + time +
                '}';
    }
}
