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
        return ur.save(u);
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
}
