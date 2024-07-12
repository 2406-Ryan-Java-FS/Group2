package com.revature.auctionator.exceptions;

public class InvalidItemException extends RuntimeException{
    public InvalidItemException(String message)
    {
        super(message);
    }
}