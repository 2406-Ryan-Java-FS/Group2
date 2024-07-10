package com.revature.auctionator.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.auctionator.models.Item;

public interface ItemRepository  extends JpaRepository <Item, Integer> {

}
