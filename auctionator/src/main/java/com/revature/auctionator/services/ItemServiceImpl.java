package com.revature.auctionator.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.revature.auctionator.exceptions.InvalidItemException;
import com.revature.auctionator.models.Item;
import com.revature.auctionator.models.ItemUserDTO;
import com.revature.auctionator.models.User;
import com.revature.auctionator.repositories.ItemRepository;
import com.revature.auctionator.repositories.UserRepo;

@Service
public class ItemServiceImpl implements ItemService{

    private ItemRepository itemRepository;
    private UserRepo userRepository;

    
    // implicit autowired - sole constructor
    public ItemServiceImpl(ItemRepository itemRepository, UserRepo userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    /**
     * retrieves all item entities from the repository.
     * @return a list of all item entities.
     */
    public List<Item> findAllItems(){
        List<Item> items = itemRepository.findAll();
        return items;
    }

    /**
     * retrieves all item entities from the repository with the username attached.
     * @return a list of all item entities.
     */
    public List<ItemUserDTO> findAllItemsAndUserInfo(){
        List<ItemUserDTO> items = itemRepository.findAllItemsAndUserInfo();
        return items;
    }

    /**
     * retrieves all item entities from the repository with the username attached.
     * @return a list of all item entities.
     */
    public List<ItemUserDTO> findAllItemsByUsername(String username){
        List<ItemUserDTO> items = itemRepository.findAllItemsByUsername(username);
        return items;
    }

    /**
     * retrieves an item entitiy from the repository
     * @param theItemId the id of the item we want to find
     * @return an item object if it exists in the database
     * @throws InvalidItemException if the item does not exist
     */
    @Override
    public Item findItemById(int theItemId) {
        Optional<Item> dBItem = itemRepository.findById(theItemId);
        if(dBItem.isPresent())
        {
            return dBItem.get();
        }
        else
        {
            throw new InvalidItemException("Item not found with id: " + theItemId);
        }
    }

    /**
     * adds a new item to the repository
     * @param theNewItem the item data we want to add
     * @return the saved item object if the addition is successful
     * @throws InvalidItemException if the item addition does not succeed
     */
    @Override
    public Item addNewItem(Item theNewItem) {
        // reject if the following is null
        if(theNewItem.getItemName().trim().isEmpty())
        {
            throw new InvalidItemException("Please fill out the required field: Item Name");
        }

        // reject if the following is null
        if(theNewItem.getOwnerId() == null)
        {
            throw new InvalidItemException("Please fill out the required field: Owner Id");
        }

        // reject the save if the owner does not exist in the database
        if(theNewItem.getOwnerId() == null || !userRepository.findById(theNewItem.getOwnerId()).isPresent())
        {
            throw new InvalidItemException("Please assign a valid Owner to the item.");
        }
        
        // remove the item id if it is provided
        if(theNewItem.getId() != null)
        {
            theNewItem.setId(null);
        }

        // set the sold value to false if it is provided
        if(theNewItem.getSold() == null)
        {
            // set the sold value to false
            theNewItem.setSold(false);
        }

        Item dBItem = itemRepository.save(theNewItem);
        return dBItem;
    }

    /**
     * Adds a new item to the repository via username
     * 
     * @param theNewItem the item data we want to add
     * @param username the username of the account to which the item will be added
     * @return the saved item object if the addition is successful
     * @throws InvalidItemException if the item addition does not succeed
     */
    @Override
    public Item addNewItemByUsername(Item theNewItem, String username) {
        // Reject if the item name is null or empty
        if (theNewItem.getItemName() == null || theNewItem.getItemName().trim().isEmpty()) {
            throw new InvalidItemException("Please fill out the required field: Item Name");
        }

        // Remove the item ID if it is provided
        theNewItem.setId(null);

        // Set the sold value to false if it is not provided
        if (theNewItem.getSold() == null) {
            theNewItem.setSold(false);
        }

        // Find the user by username
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new InvalidItemException("User not found: " + username);
        }

        // Set the owner ID
        theNewItem.setOwnerId(user.getId());

        // Save the new item to the repository
        Item dBItem = itemRepository.save(theNewItem);
        return dBItem;
    }

    /**
     * updates an existing item
     * @param theNewItem the item data we want to update
     * @param theItemId the id of the item we want to update
     * @return the updated item object if the update is successful
     * @throws InvalidItemException if the item update does not succeed
     * // Note - Clients won't be able to update sold status - only the admin
     */
    @Override
    public Item updateItemById(Item theItem, int theItemId)
    {
        // check if the item already exists in the database
        Optional<Item> dBItemOptional = itemRepository.findById(theItemId);
        if(!dBItemOptional.isPresent())
        {
            throw new InvalidItemException("Cannot update. There is no item by the id: " + theItemId);
        }

        Item dBItem = dBItemOptional.get();

        // if an item name is provided check to see that it is not empty
        if(theItem.getItemName() != null && !theItem.getItemName().trim().isEmpty())
        {
            dBItem.setItemName(theItem.getItemName());
        }

        // if an owner id is provided check to see if that id exists in the repository
        if(theItem.getOwnerId() != null)
        {
            if(!userRepository.findById(theItem.getOwnerId()).isPresent())
            {
                throw new InvalidItemException("Client does not exist in the database.");
            }
            dBItem.setOwnerId(theItem.getOwnerId());
        }
        // else - save since it exists
        Item updatedItem = itemRepository.save(dBItem);
        return updatedItem;
    }

     /**
     * deletes an item from the repository
     * @param theItemId the id of the item data that we want to delete
     * @return the number of affected table rows
     */
    @Override
    public int deleteItemById(int theItemId) {
        // if the account doesn't exist
        if(itemRepository.findById(theItemId).isPresent())
        {
            itemRepository.deleteById(theItemId);
            return 1;
        }
        else
        {
            return 0;
        }
    }
}