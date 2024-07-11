package com.revature.auctionator.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.revature.auctionator.models.Item;
import com.revature.auctionator.repositories.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService{

    private ItemRepository itemRepository;
    
    // implicit autowired - sole constructor
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    /**
     * retrieves all item entities from the repository.
     * @return a list of all item entities.
     */
    public List<Item> findAllItems(){
        List<Item> items = itemRepository.findAll();
        return items;
    }
}
