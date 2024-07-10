package com.revature.auctionator.controllers;

import com.revature.auctionator.models.User;
import com.revature.auctionator.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {

    UserService us;
    // Other services will be added once implemented.

    @Autowired
    public Controller(UserService us) {
        this.us = us;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return us.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable int id) {
        return us.getUser(id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> addUser(@RequestBody User u) {
        u = us.addUser(u);
        return new ResponseEntity<>(u, HttpStatus.OK);
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
}
