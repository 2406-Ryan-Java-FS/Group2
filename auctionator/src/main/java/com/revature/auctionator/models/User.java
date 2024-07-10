package com.revature.auctionator.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_id", updatable = false)
    private int id;


}
