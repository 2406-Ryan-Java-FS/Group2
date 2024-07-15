package com.revature.auctionator.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.auctionator.models.User;
import com.revature.auctionator.services.UserService;
import com.revature.auctionator.models.Auction;
import com.revature.auctionator.services.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
public class Controller {

    UserService us;
    AuctionService as;
    // Other services will be added once implemented.

    @Autowired
    public Controller(UserService us, AuctionService as) {
        this.us = us;
        this.as = as;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return us.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User u = us.getUser(id);
        if(u.getId() == id) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(path = "/users", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> addUser(@RequestBody User u) {
        u = us.addUser(u);
        if (u != null) {
            return new ResponseEntity<>(u, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User u) {
        u.setId(id);
        User u2 = us.getUser(id);
        if(u2.getId() == id) {
            u = us.updateUser(u);
            return new ResponseEntity<>(u, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable int id) {
        boolean wasDeleted = us.deleteUser(id);
        return new ResponseEntity<>(wasDeleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }

    @GetMapping("/auctions")
    public List<Auction> getAllAuctions() { return as.getAllAuctions(); }

    @GetMapping("/auctions/{id}")
    public Auction getAuction(@PathVariable int id) { return as.getAuction(id); }

    @PostMapping("/auctions")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction a) {
        a = as.createAuction(a);
        return new ResponseEntity<>(a, HttpStatus.OK);
    }

    @PatchMapping("/auctions/{id}/bid")
    public ResponseEntity<Auction> updateAuctionBid(@PathVariable("id") int id, @RequestBody Auction a){
        if(as.getAuction(id) != null) {
            a = as.updateAuctionBid(id, a.getBid(), a.getBidder_id());
            return new ResponseEntity<>(a, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/auctions/{id}/status")
    public ResponseEntity<Auction> updateAuctionStatus(@PathVariable("id") int id, @RequestBody String status){
        try{
            ObjectMapper om = new ObjectMapper();
            JsonNode jsonNode = om.readTree(status);
            String updatedStatus = jsonNode.get("status").asText();
            Set<String> validStatuses = new HashSet<>();
            validStatuses.add("Inactive");
            validStatuses.add("Active");
            validStatuses.add("Completed");

            if(!(validStatuses.contains(updatedStatus))) {
                return ResponseEntity.badRequest().body(null);
            }
            else {
                Auction updatedAuction = as.updateAuctionStatus(id, updatedStatus);
                return ResponseEntity.ok(updatedAuction);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PatchMapping("/auctions/{id}/time")
    public ResponseEntity<Auction> updateAuctionTime(@PathVariable("id") int id, @RequestBody String time){
        try{
            ObjectMapper om = new ObjectMapper();
            JsonNode jsonNode = om.readTree(time);
            int updatedTime = Integer.parseInt(jsonNode.get("a_time").asText());

            if(updatedTime < 0) {
                return ResponseEntity.badRequest().body(null);
            }
            else {
                Auction updatedAuction = as.updateAuctionTime(id, updatedTime);
                return ResponseEntity.ok(updatedAuction);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/auctions/{id}")
    public ResponseEntity<Boolean> deleteAuction(@PathVariable int id) {
        boolean wasDeleted = as.deleteAuction(id);
        return new ResponseEntity<>(wasDeleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }

}
