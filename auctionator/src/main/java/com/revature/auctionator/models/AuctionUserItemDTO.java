package com.revature.auctionator.models;

import java.util.Objects;

public class AuctionUserItemDTO {
    private int id;
    private String itemName;
    private double bid;
    private String firstName;
    private String lastName;
    private String status;
    private int time;

    public AuctionUserItemDTO() {
    }

    public AuctionUserItemDTO(int id, String itemName, double bid, String firstname, String lastname, String status, int time) {
        this.id = id;
        this.itemName = itemName;
        this.bid = bid;
        this.firstName = firstname;
        this.lastName = lastname;
        this.status = status;
        this.time = time;
    }

    public int getAuctionId() {
        return id;
    }

    public void setAuctionId(int auctionId) {
        this.id = auctionId;
    }

    public double getBid() {
        return bid;
    }

    public void setBid(double bid) {
        this.bid = bid;
    }

    public String getFirstname() {
        return firstName;
    }

    public void setFirstname(String firstname) {
        this.firstName = firstname;
    }

    public String getLastname() {
        return lastName;
    }

    public void setLastname(String lastname) {
        this.lastName = lastname;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AuctionUserItemDTO that = (AuctionUserItemDTO) o;
        return getAuctionId() == that.getAuctionId() && Double.compare(getBid(), that.getBid()) == 0 && Objects.equals(getFirstname(), that.getFirstname()) && Objects.equals(getLastname(), that.getLastname()) && Objects.equals(getItemName(), that.getItemName()) && Objects.equals(getStatus(), that.getStatus()) && Objects.equals(getTime(), that.getTime());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAuctionId(), getBid(), getFirstname(), getLastname(), getItemName(), getStatus(), getTime());
    }

    @Override
    public String toString() {
        return "AuctionUserItemDTO{" +
                "id=" + id +
                ", bid=" + bid +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", itemName='" + itemName + '\'' +
                ", status='" + status + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
