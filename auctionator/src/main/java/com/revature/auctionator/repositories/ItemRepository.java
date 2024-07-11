package com.revature.auctionator.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.auctionator.models.Item;

// entity type: Item
// primary key: Integer
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>{

}
