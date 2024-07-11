package com.revature.auctionator.services;

import com.revature.auctionator.models.Comment;
import com.revature.auctionator.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository cr;

    @Override
    public Comment createComment(Comment c) {
        if(c.getComment().length() < 1 || c.getComment().length() > 255) return null;
        return cr.save(c);
    }

    @Override
    public Comment getComment(int id) {
        Optional<Comment> optC = cr.findById(id);

        if(optC.isPresent()) return optC.get();
        else return null;
    }

    @Override
    public List<Comment> getAllComments() {
        return cr.findAll();
    }

    @Override
    public List<Comment> getAllCommentsForAuction(int id) {
        return cr.findByAuctionId(id);
    }

    @Override
    public List<Comment> getAllCommentsFromUser(int id) {
        return cr.findByCommenterId(id);
    }

    @Override
    public int updateCommentText(int id, String text) {
        return cr.updateCommentTextById(id, text);
    }

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
