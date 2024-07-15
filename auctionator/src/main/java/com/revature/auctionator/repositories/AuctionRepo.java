package com.revature.auctionator.repositories;

import com.revature.auctionator.models.Auction;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepo extends JpaRepository<Auction, Integer> {
    @Modifying
    @Transactional
    @Query("update Auction a set a.bid = :bid, a.bidder_id = :bidder_id where a.id = :id")
    int updateAuctionBidById(@Param("id") int id, @Param("bid") double bid, @Param("bidder_id") int bidder_id);

    @Modifying
    @Transactional
    @Query("update Auction a set a.a_time = :status where a.id = :id")
    int updateAuctionStatusById(@Param("id") int id, @Param("status") String status);

    @Modifying
    @Transactional
    @Query("update Auction a set a.a_time = :time where a.id = :id")
    int updateAuctionTimeById(@Param("id") int id, @Param("time") int time);
}
