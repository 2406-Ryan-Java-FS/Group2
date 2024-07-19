package com.revature.auctionator.repositories;

import com.revature.auctionator.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    List<User> findByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
}
