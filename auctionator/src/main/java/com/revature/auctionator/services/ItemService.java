package com.revature.auctionator.services;

import java.util.List;

import com.revature.auctionator.models.Item;

public interface ItemService {
    List<Item> findAllItems();
    Item findItemById(int theItemId);
    Item addNewItem(Item theNewItem);
    Item updateItemById(Item theitem, int theItemId);
    int deleteItemById (int theItemId);
}
