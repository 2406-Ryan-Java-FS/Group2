package com.revature.auctionator.services;

import com.revature.auctionator.models.Auction;
import com.revature.auctionator.models.Comment;
import com.revature.auctionator.repositories.AuctionRepo;
import com.revature.auctionator.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    AuctionRepo ar;

    public AuctionServiceImpl(AuctionRepo auctionRepo) {
        this.ar = auctionRepo;
    }

    @Override
    public Auction createAuction(Auction a) {
        return ar.save(a);
    }

    @Override
    public Auction getAuction(int id) {
        Optional<Auction> optA = ar.findById(id);

        return optA.orElse(null);
    }

    @Override
    public List<Auction> getAllAuctions() { return ar.findAll(); }

    @Override
    public Auction updateAuctionBid(int id, double bid, int bidder_id) {
        int rowsUpdated = ar.updateAuctionBidById(id, bid, bidder_id);
        if (rowsUpdated > 0 ){
            return this.getAuction(id);
        }
        else
            return null;
    }

    @Override
    public Auction updateAuctionStatus(int id, String status) {
        int rowsUpdated = ar.updateAuctionStatusById(id, status);
        if (rowsUpdated > 0 ){
            return this.getAuction(id);
        }
        else
            return null;
    }

    @Override
    public Auction updateAuctionTime(int id, int a_time) {
        int rowsUpdated = ar.updateAuctionTimeById(id, a_time);
        if (rowsUpdated > 0 ){
            return this.getAuction(id);
        }
        else
            return null;
    }

    @Override
    public boolean deleteAuction(int id) {
        try{
            ar.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
