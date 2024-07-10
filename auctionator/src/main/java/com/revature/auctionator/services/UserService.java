package com.revature.auctionator.services;

import com.revature.auctionator.models.User;

import java.util.List;

public interface UserService {

    public User addUser(User u);
    public User getUser(int id);
    public List<User> getAllUsers();
    public User updateUser(User change);
    public boolean deleteUser(int id);
}
