package com.revature.auctionator.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.revature.auctionator.exceptions.InvalidItemException;
import com.revature.auctionator.models.Item;
import com.revature.auctionator.services.ItemService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
    public ResponseEntity<?> getAllItems() {
        List<Item> allItems = itemService.findAllItems();
        return ResponseEntity.ok(allItems);
    }

     /**
     * handler to get a item by id
     * @param itemId the id of the item to retrieve
     * @return a response entity containing the item if found or a 404 error message if not found
     */
    @GetMapping("/items/{theItemId}")
    public ResponseEntity<?> getItemById(@PathVariable Integer theItemId) {
        try {
            Item theItem= itemService.findItemById(theItemId);
            return ResponseEntity.ok(theItem);
        } catch (InvalidItemException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * handler to add a new item to the data base
     * @param theNewItem the item data that we will add to the database
     * @return  a response entity containing the added item or a 400 error message
     */
    @PostMapping("/items")
    public ResponseEntity<?> addNewItem(@RequestBody Item theNewItem) {
        try {
            Item theItem = itemService.addNewItem(theNewItem);
            return ResponseEntity.ok(theItem);
        } catch (InvalidItemException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        /**
         * Optional Front End addNewItem Controller option
         * Pass the Username
         */
    }

    /**
     * handler to update any information for an existing user in the database
     * @param theItemId the id of the item that we want to update in the database
     * @param theItem the tiem data that we will update in the database
     * @return a response entity containing the updated item or a 404 error message
     */
    @PatchMapping("/items/{theItemId}")
    public ResponseEntity<?> updateItem(@PathVariable int theItemId, @RequestBody Item theItem) {
        try 
        {
            // in case the user does not put an ID in the request body - we can use the id from the endpoint request
            // in case the user puts in the wrong id as well - we default to the endpoint id
            theItem.setId(theItemId);
            Item updatedItem = itemService.updateItemById(theItem, theItemId);
            return ResponseEntity.ok(updatedItem);
        } catch (InvalidItemException e) 
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * handler to delete item data
     * @param theItemId the id of the item that we want to delete in the database
     * @return a response entity containing 1 if an item is deleted or 0 if the item is not deleted
     */
    @DeleteMapping("/items/{theItemId}")
    public ResponseEntity<?> deleteItem(@PathVariable int theItemId)
    {
        int rowsAffected = itemService.deleteItemById(theItemId);

        if(rowsAffected == 0)
        {
            return ResponseEntity.ok(rowsAffected + " items deleted - no such item exists.");
        }
        else
        {
            return ResponseEntity.ok(rowsAffected + " item deleted.");
        }
    }
}