package com.revature.auctionator.services;

import com.revature.auctionator.repositories.AuctionRepo;
import com.revature.auctionator.repositories.ItemRepository;
import org.springframework.stereotype.Service;

@Service
public class AuctionServiceImpl implements AuctionService {
    private AuctionRepo auctionRepo;

    public AuctionServiceImpl(AuctionRepo auctionRepo) {
        this.auctionRepo = auctionRepo;
    }
}
