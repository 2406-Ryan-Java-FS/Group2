package com.revature.auctionator.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.auctionator.models.Comment;
import com.revature.auctionator.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    CommentService cs;


    /**
     * Handler method to create new comment
     * @param c
     * @return
     */
    @PostMapping("/comments")
    public ResponseEntity<Comment> createNewComment(@RequestBody Comment c){
        Comment comment = cs.createComment(c);

        if(comment != null) return ResponseEntity.ok(comment);
        else return ResponseEntity.badRequest().body(null);
    }

    /**
     * Handler method to get comment by id
     * @param id
     * @return
     */
    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable("id") int id){
        Comment c = cs.getComment(id);

        if(c != null) return ResponseEntity.ok(c);
        else return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getAllComments(){
        return ResponseEntity.ok(cs.getAllComments());
    }

    @GetMapping("/comments/auctions/{id}")
    public ResponseEntity<List<Comment>> getAllCommentsForAuctionId(@PathVariable("id") int id){
        return ResponseEntity.ok(cs.getAllCommentsForAuction(id));
    }

    @GetMapping("/comments/users/{id}")
    public ResponseEntity<List<Comment>> getAllCommentsFromUser(@PathVariable("id") int id){
        return ResponseEntity.ok(cs.getAllCommentsFromUser(id));
    }

    @PatchMapping("/comments/{id}")
    public ResponseEntity<Integer> updateCommentTextById(@PathVariable("id") int id, @RequestBody String comment){

        try{
            ObjectMapper om = new ObjectMapper();
            JsonNode jsonNode = om.readTree(comment);
            String updatedText = jsonNode.get("comment").asText();

            if(updatedText.isBlank()) return ResponseEntity.badRequest().body(0);
            int rowsUpdated = cs.updateCommentText(id, updatedText);
            if(rowsUpdated == 1) return ResponseEntity.ok(rowsUpdated);
            else return ResponseEntity.badRequest().body(0);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(0);
        }


    }


    @DeleteMapping("/comments/{id}")
    public ResponseEntity<String> deleteCommentById(@PathVariable("id") int id){
        int rowsUpdated = cs.deleteComment(id);

        if(rowsUpdated == 1) return ResponseEntity.ok("Comment successfully deleted");
        else return ResponseEntity.badRequest().body("Failed to delete Comment");
    }
}
