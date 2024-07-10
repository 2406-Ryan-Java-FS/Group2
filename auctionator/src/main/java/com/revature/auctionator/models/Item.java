package com.revature.auctionator.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "i_id")
    private Integer id;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "sold")
    private Boolean sold;

    @Column(name = "owner_id")
    private Integer ownerId;

    public Item() {
    }

    public Item(Integer id, String itemName, Boolean sold, Integer ownerId) {
        this.id = id;
        this.itemName = itemName;
        this.sold = sold;
        this.ownerId = ownerId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    @Override
    public String toString() {
        return "Item [id=" + id + ", itemName=" + itemName + ", sold=" + sold + ", ownerId=" + ownerId + "]";
    }
}