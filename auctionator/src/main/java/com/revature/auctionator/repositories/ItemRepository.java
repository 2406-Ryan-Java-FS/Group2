package com.revature.auctionator.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.revature.auctionator.models.Item;
import com.revature.auctionator.models.ItemUserDTO;

// entity type: Item
// primary key: Integer
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>{

    @Query("SELECT new com.revature.auctionator.models.ItemUserDTO(i.id, i.itemName, i.sold, u.firstName, u.lastName, u.username, i.ownerId) " +
           "FROM Item i INNER JOIN User u ON i.ownerId = u.id")
    List<ItemUserDTO> findAllItemsAndUserInfo();

    @Query("SELECT new com.revature.auctionator.models.ItemUserDTO(i.id, i.itemName, i.sold, u.firstName, u.lastName, u.username, i.ownerId) " +
           "FROM Item i INNER JOIN User u ON i.ownerId = u.id WHERE u.username = :username")
    List<ItemUserDTO> findAllItemsByUsername(String username);
}