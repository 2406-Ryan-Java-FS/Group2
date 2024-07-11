package com.revature.auctionator.services;

import com.revature.auctionator.models.Auction;

import java.util.List;

public interface AuctionService {
    List<Auction> findAllAuctions();
}
