package com.revature.auctionator.services;

import com.revature.auctionator.models.Auction;
import com.revature.auctionator.models.AuctionUserItemDTO;
import com.revature.auctionator.repositories.AuctionRepo;
import com.revature.auctionator.repositories.ItemRepository;
import com.revature.auctionator.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

@Service
public class AuctionServiceImpl implements AuctionService {


    private AuctionRepo ar;

    @Autowired
    public AuctionServiceImpl(AuctionRepo ar) {
        this.ar = ar;
    }

    @Override
    public Auction createAuction(Auction a) {
        try {
            return ar.save(a);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Auction getAuction(int id) {
        return ar.findById(id).orElseGet(Auction::new);
    }

    @Override
    public List<AuctionUserItemDTO> getAllAuctions() { return ar.findAllAuctionsAndUserInfoAndItemInfo(); }

    @Override
    public List<AuctionUserItemDTO> getActiveAuctions() {
        List<AuctionUserItemDTO> activeAuctions = new LinkedList<>();
        List<AuctionUserItemDTO> allAuctions = ar.findAllAuctionsAndUserInfoAndItemInfo();
        for(AuctionUserItemDTO a : allAuctions){
            if (Objects.equals(a.getStatus(), "Active")){
                activeAuctions.add(a);
            }
        }
        return activeAuctions;
    }

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
            return new Auction();
    }

    @Override
    public Auction updateAuctionTime(int id, int a_time) {
        int rowsUpdated = ar.updateAuctionTimeById(id, a_time);
        if (rowsUpdated > 0){
            return this.getAuction(id);
        }
        else
            return new Auction();
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
