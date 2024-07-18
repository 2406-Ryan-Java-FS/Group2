package com.revature.auctionator.repositories;

import com.revature.auctionator.models.Auction;
import com.revature.auctionator.models.AuctionUserItemDTO;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepo extends JpaRepository<Auction, Integer> {

    @Query("SELECT new com.revature.auctionator.models.AuctionUserItemDTO(a.id, i.itemName, a.bid, u.firstName, u.lastName, a.status, a.time) " +
            "FROM Auction a INNER JOIN User u ON a.bidder_id = u.id INNER JOIN Item i ON a.item_id = i.id")
    List<AuctionUserItemDTO> findAllAuctionsAndUserInfoAndItemInfo();

    @Modifying
    @Transactional
    @Query("update Auction a set a.bid = :bid, a.bidder_id = :bidder_id where a.id = :id")
    int updateAuctionBidById(@Param("id") int id, @Param("bid") double bid, @Param("bidder_id") int bidder_id);

    @Modifying
    @Transactional
    @Query("update Auction a set a.status = :status where a.id = :id")
    int updateAuctionStatusById(@Param("id") int id, @Param("status") String status);

    @Modifying
    @Transactional
    @Query("update Auction a set a.time = :time where a.id = :id")
    int updateAuctionTimeById(@Param("id") int id, @Param("time") int time);
}
