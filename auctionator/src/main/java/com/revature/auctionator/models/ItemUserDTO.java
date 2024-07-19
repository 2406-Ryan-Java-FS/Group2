package com.revature.auctionator.models;

public class ItemUserDTO {
    private Integer itemId;
    private String itemName;
    private Boolean sold;
    private String firstName;
    private String lastName;
    private String username;
    private Integer ownerId;

    public ItemUserDTO() {
    }

    public ItemUserDTO(Integer itemId, String itemName, Boolean sold, String firstName, String lastName,
            String username, Integer ownerId) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.sold = sold;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.ownerId = ownerId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Boolean getSold() {
        return sold;
    }

    public void setSold(Boolean sold) {
        this.sold = sold;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    @Override
    public String toString() {
        return "ItemUserDTO [itemId=" + itemId + ", itemName=" + itemName + ", sold=" + sold + ", firstName="
                + firstName + ", lastName=" + lastName + ", username=" + username + ", ownerId=" + ownerId + "]";
    }
}