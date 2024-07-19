package com.revature.auctionator.services;

import java.util.List;

import com.revature.auctionator.models.Item;
import com.revature.auctionator.models.ItemUserDTO;

public interface ItemService {
    List<Item> findAllItems();
    List<ItemUserDTO> findAllItemsAndUserInfo();
    List<ItemUserDTO> findAllItemsByUsername(String username);
    Item findItemById(int theItemId);
    Item addNewItem(Item theNewItem);
    Item addNewItemByUsername(Item theNewItem, String username);
    Item updateItemById(Item theitem, int theItemId);
    int deleteItemById (int theItemId);
}