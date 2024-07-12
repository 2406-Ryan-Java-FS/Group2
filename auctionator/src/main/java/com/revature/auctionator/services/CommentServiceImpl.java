package com.revature.auctionator.services;

import com.revature.auctionator.models.Comment;
import com.revature.auctionator.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository cr;


    /**
     * checks if the length of the comment text is blank or > 255
     * returns the created comment entry if valid otherwise returns null
     * @param c
     * @return
     */
    @Override
    public Comment createComment(Comment c) {
        if(c.getComment().isBlank()|| c.getComment().length() > 255) return null;
        return cr.save(c);
    }

    /**
     * gets the entry in table if exists with the given comment id param
     * if exists, returns the comment object
     * else, returns null
     * @param id
     * @return
     */
    @Override
    public Comment getComment(int id) {
        Optional<Comment> optC = cr.findById(id);

        if(optC.isPresent()) return optC.get();
        else return null;
    }

    /**
     * returns a List of all entries of Comment in comment table
     * if no comment entries exist, returns an empty list
     * @return
     */
    @Override
    public List<Comment> getAllComments() {
        return cr.findAll();
    }

    /**
     * returns a list of all comments with the passed auction id param
     * if no entries with auction id exist returns an empty list
     * @param id
     * @return
     */
    @Override
    public List<Comment> getAllCommentsForAuction(int id) {
        return cr.findByAuctionId(id);
    }

    /**
     * returns a list of all comments with the passed commenter id param
     * if no entries with commenter id exist returns an empty list
     * @param id
     * @return
     */
    @Override
    public List<Comment> getAllCommentsFromUser(int id) {
        return cr.findByCommenterId(id);
    }

    /**
     * returns a list of all comments made by a specific user for a specific auction
     * @param commenterId
     * @param auctionId
     * @return
     */
    @Override
    public List<Comment> getAllCommentsFromAUserForAnAuction(int commenterId, int auctionId){
        return cr.findByCommenterIdAndAuctionId(commenterId, auctionId);
    }

    /**
     * updates the comment text with the given comment id
     * returns the number of rows changed in the table (0 or 1)
     * if the text is blank or >255 characters returns 0
     * @param id
     * @param text
     * @return
     */
    @Override
    public int updateCommentText(int id, String text) {
        if(text.isBlank() || text.length() > 255) return 0;
        return cr.updateCommentTextById(id, text);
    }

    /**
     * deletes the comment entry in the table with the associated comment id
     * returns 1 unless exception is encountered
     * @param id
     * @return
     */
    @Override
    public int deleteComment(int id) {
        try{
            cr.deleteById(id);
            return 1;
        }catch (Exception e){
            return 0;
        }

    }
}
