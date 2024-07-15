package com.revature.auctionator.services;

import com.revature.auctionator.models.User;
import com.revature.auctionator.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo ur;

    @Override
    public User addUser(User u) {
        try {
            return ur.save(u);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public User getUser(int id) {
        return ur.findById(id).orElseGet(User::new);
    }

    @Override
    public List<User> getAllUsers() {
        return ur.findAll();
    }

    @Override
    public User updateUser(User change) {
        return ur.save(change);
    }

    @Override
    public boolean deleteUser(int id) {
        try {
            User u = getUser(id);
            if(u.getId() != 0) {
                ur.deleteById(id);
                return true;
            }
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public User logIn(String username, String password) {
        List<User> foundUser = ur.findByUsernameAndPassword(username, password);
        if (!foundUser.isEmpty()) {
            return foundUser.get(0);
        } else {
            return new User();
        }
    }
}
