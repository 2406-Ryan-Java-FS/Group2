package com.revature.auctionator.services;

import com.revature.auctionator.models.Comment;

import java.util.List;

public interface CommentService {

    public Comment createComment(Comment c);
    public Comment getComment(int id);
    public List<Comment> getAllComments();
    public List<Comment> getAllCommentsForAuction(int id);
    public List<Comment> getAllCommentsFromUser(int id);
    public List<Comment> getAllCommentsFromAUserForAnAuction(int commenterId, int auctionId);
    public int updateCommentText(int id, String text);
    public int deleteComment(int id);

}
