package com.revature.auctionator.services;

import com.revature.auctionator.models.Auction;

import java.util.List;

public interface AuctionService {

    public Auction createAuction(Auction a);
    public Auction getAuction(int id);
    public List<Auction> getAllAuctions();
    public Auction updateAuctionBid(int id, double bid, int bidder_id);
    public Auction updateAuctionStatus(int id, String status);
    public Auction updateAuctionTime(int id, int a_time);
    public boolean deleteAuction(int id);
}
