package com.revature.auctionator.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;

/**
 * Comment Entity Class
 */

@Entity
@Table(name = "comments")
@JsonPropertyOrder({"cId", "commenterId", "auctionId", "comment"})
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "c_id", updatable = false)
    @JsonProperty(value = "cId")
    private int cId;

    @Column(name = "commenter_id")
    @JsonProperty(value = "commenterId")
    private int commenterId;

    @Column(name = "auction_id")
    @JsonProperty(value = "auctionId")
    private int auctionId;

    @Column(name = "comment")
    @JsonProperty(value = "comment")
    private String comment;

    public Comment() {
    }

    public Comment(int commenterId, int auctionId, String comment) {
        this.commenterId = commenterId;
        this.auctionId = auctionId;
        this.comment = comment;
    }


    public int getCId() {
        return cId;
    }

    public int getCommenterId() {
        return commenterId;
    }

    public int getAuctionId() {
        return auctionId;
    }

    public String getComment() {
        return comment;
    }


    public void setCId(int cId) {
        this.cId = cId;
    }

    public void setCommenterId(int commenterId) {
        this.commenterId = commenterId;
    }

    public void setAuctionId(int auctionId) {
        this.auctionId = auctionId;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
