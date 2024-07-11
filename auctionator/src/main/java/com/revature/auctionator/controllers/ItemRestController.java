package com.revature.auctionator.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.revature.auctionator.models.Item;
import com.revature.auctionator.services.ItemService;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class ItemRestController {

    private ItemService itemService;

    // implicit autowired - sole constructor
    public ItemRestController(ItemService itemService) {
        this.itemService = itemService;
    }

    /**
     * handler to get all items.
     * @return a list of item objects wrapped in a ResponseEntity as the response body to the HTTP caller.
     */
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> allItems = itemService.findAllItems();
        return ResponseEntity.ok(allItems);
    }
}