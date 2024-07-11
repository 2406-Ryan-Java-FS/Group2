package com.revature.auctionator.services;

import java.util.List;

import com.revature.auctionator.models.Item;

public interface ItemService {
    List<Item> findAllItems();
}
