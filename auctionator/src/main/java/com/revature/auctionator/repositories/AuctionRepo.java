package com.revature.auctionator.repositories;

import com.revature.auctionator.models.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepo extends JpaRepository<Auction, Integer> {
}
